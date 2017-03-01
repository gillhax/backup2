package quiz.service.util;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import quiz.domain.Category;
import quiz.domain.Question;
import quiz.domain.Subcategory;
import quiz.repository.CategoryRepository;
import quiz.repository.QuestionRepository;
import quiz.repository.SubcategoryRepository;

import javax.inject.Inject;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;


@Service
@Transactional
public class ParseQuestionsFile {

    private static final String FILE_NAME = "/home/gill/Projects/quiz/docs/Вопросы.xlsx";

    @Inject
    private CategoryRepository categoryRepository;

    @Inject
    private SubcategoryRepository subcategoryRepository;

    @Inject
    private QuestionRepository questionRepository;


    public  void main() {
        Workbook workbook = null;
        try {

            FileInputStream excelFile = new FileInputStream(new File(FILE_NAME));
            workbook = new XSSFWorkbook(excelFile);

        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }

        List<Category> categories = new ArrayList<>();
        //family sheet
        Sheet categorySheet = workbook.getSheetAt(1);
        Iterator<Row> categoryIterator = categorySheet.iterator();

        Map<String, Integer> categoriesDictonary = new HashMap<>();

        Row firstRow = categoryIterator.next();

        //extract first row - category name
        Iterator<Cell> firstRowCellIterator = firstRow.iterator();
        firstRowCellIterator.next();
        firstRowCellIterator.next();
        while (firstRowCellIterator.hasNext()) {
            Cell idCell = firstRowCellIterator.next();
            double idDouble = idCell.getNumericCellValue();
            long id = (long) idDouble;
            Cell nameCell = firstRowCellIterator.next();
            String name = nameCell.getStringCellValue();
            Category category = new Category();
            category.setId(id);
            category.setName(nameCell.getStringCellValue());
            categories.add(category);
            categoriesDictonary.put(name, (int) id);
        }

        Map<String, Long> subcategoriesDictionary = new HashMap<>();

        List<Subcategory> subcategoriesRep = subcategoryRepository.findAll();
        Map<Long, Subcategory> subcategoriesMap =
            subcategoriesRep.stream().collect(Collectors.toMap(Subcategory::getId, p -> p));


        //two row - first subcategory
        Row twoRow = categoryIterator.next();

        Iterator<Cell> twoRowCellIterator = twoRow.iterator();
        twoRowCellIterator.next();
        twoRowCellIterator.next();
        int categoryId = 0;

        while (twoRowCellIterator.hasNext()) {
            Cell idCell = twoRowCellIterator.next();
            double idDouble = idCell.getNumericCellValue();
            long id = (long) idDouble;
            Cell nameCell = twoRowCellIterator.next();
            String name = nameCell.getStringCellValue();
            Subcategory subcategory = new Subcategory();
            subcategory.setId(id);
            subcategory.setName(name);
            List<Subcategory> subcategories = new ArrayList<>();
            subcategories.add(subcategory);
            categories.get(categoryId).setSubcategories(subcategories);
            categoryId++;
            subcategoriesDictionary.put(name, id);
        }


        //other subcategories
        while (categoryIterator.hasNext()) {
            Row row = categoryIterator.next();
            Iterator<Cell> rowCellIterator = row.iterator();
            rowCellIterator.next();
            rowCellIterator.next();

            categoryId = 0;
            while (rowCellIterator.hasNext()) {
                Cell idCell = rowCellIterator.next();
                if(idCell.getCellTypeEnum() == CellType.STRING && idCell.getStringCellValue().equals("-")) {
                    rowCellIterator.next();
                    categoryId++;
                    continue;
                }
                double idDouble = idCell.getNumericCellValue();
                long id = (long) idDouble;
                Cell nameCell = rowCellIterator.next();
                String name = nameCell.getStringCellValue();
                Subcategory subcategory = new Subcategory();
                subcategory.setId(id);
                subcategory.setName(name);
                categories.get(categoryId).getSubcategories().add(subcategory);
                categoryId++;
                subcategoriesDictionary.put(name, id);
            }
        }



        //questions
        Sheet questionsSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = questionsSheet.iterator();
        iterator.next();
        List<Question> questions = new ArrayList<>();
        while (iterator.hasNext()) {
            Row currentRow = iterator.next();
            Iterator<Cell> cellIterator = currentRow.iterator();

            Question question = new Question();
            //title
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setTitle(currentCell.getStringCellValue());
            }
            else {
                continue;
            }

            //right answer 1
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer1(currentCell.getStringCellValue());
                question.setRightAnswer(1);
            }
            else {
                continue;
            }

            //answer 2
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer2(currentCell.getStringCellValue());
            }
            else {
                continue;
            }

            //answer 3
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer3(currentCell.getStringCellValue());
            }
            else {
                continue;
            }

            //answer 4
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer4(currentCell.getStringCellValue());
            }
            else {
                continue;
            }


            //Set Subcategory
            if(cellIterator.hasNext()) {
                //Category
                String categoryName = cellIterator.next().getStringCellValue();
                //Subcategory
                String subcategoryName = cellIterator.next().getStringCellValue();
                question.setSubcategory(subcategoriesMap.get(subcategoriesDictionary.get(subcategoryName)));
            }
            else {
                continue;
            }

            //Image
            if(cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setMedia(currentCell.getStringCellValue() );

            }

            questions.add(question);
        }
        System.out.println(questions);


        for (Question question:
             questions) {
            questionRepository.save(question);
        }
//        for (Category category:
//             categories) {
//            Category existCategory = categoryRepository.findOne(category.getId());
//            if(existCategory == null) {
//                categoryRepository.saveAndFlush(category);
//            }
//            for (Subcategory subcategory:
//                category.getSubcategories()) {
//                Subcategory existSubcategory = subcategoryRepository.findOne(subcategory.getId());
//                if(existSubcategory == null) {
//                    subcategoryRepository.saveAndFlush(subcategory);
//                }
//            }
//        }

    }

}
