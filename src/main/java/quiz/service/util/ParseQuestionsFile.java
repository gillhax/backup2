package quiz.service.util;

import org.apache.commons.io.FilenameUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import quiz.domain.Category;
import quiz.domain.MediaContainer;
import quiz.domain.Question;
import quiz.domain.Subcategory;
import quiz.repository.CategoryRepository;
import quiz.repository.QuestionRepository;
import quiz.repository.SubcategoryRepository;
import quiz.service.MediaContainerService;
import quiz.service.VersionService;
import quiz.system.error.ApiAssert;

import java.io.BufferedInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
public class ParseQuestionsFile {

    private final CategoryRepository categoryRepository;

    private final SubcategoryRepository subcategoryRepository;

    private final QuestionRepository questionRepository;

    private final MediaContainerService mediaContainerService;

    private final VersionService versionService;

    public ParseQuestionsFile(CategoryRepository categoryRepository, SubcategoryRepository subcategoryRepository,
                              QuestionRepository questionRepository, MediaContainerService mediaContainerService,
                              VersionService versionService) {
        this.categoryRepository = categoryRepository;
        this.subcategoryRepository = subcategoryRepository;
        this.questionRepository = questionRepository;
        this.mediaContainerService = mediaContainerService;
        this.versionService = versionService;
    }


    public void main(List<MultipartFile> files) {
        XSSFWorkbook workbook = null;

        HashMap<String, MultipartFile> filesDictionary = new HashMap<>();

        MultipartFile excelMultipartFile = null;
        Iterator filesIterator = files.iterator();

        while (filesIterator.hasNext()) {
            MultipartFile file = (MultipartFile) filesIterator.next();
            String categorySheet = file.getOriginalFilename();
            if (FilenameUtils.getExtension(categorySheet).equals("xlsx")) {
                excelMultipartFile = file;
            } else {
                filesDictionary.put(categorySheet, file);
            }
        }

        if (excelMultipartFile == null) {
            ApiAssert.unprocessable(true, "Отсутсвует Excel файл");
        }


        try {
            InputStream inputStream = new BufferedInputStream(excelMultipartFile.getInputStream());
            workbook = new XSSFWorkbook(inputStream);

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
                if (idCell.getCellTypeEnum() == CellType.STRING && idCell.getStringCellValue().equals("-")) {
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


        HashMap<Question, MultipartFile> questionMediaDictionary = new HashMap<>();

        //questions
        Sheet questionsSheet = workbook.getSheetAt(0);
        Iterator<Row> iterator = questionsSheet.iterator();
        iterator.next();
        List<Question> questions = new ArrayList<>();
        while (iterator.hasNext()) {
            Row currentRow = iterator.next();
            Iterator<Cell> cellIterator = currentRow.iterator();
            cellIterator.next();
            Question question = new Question();
            //title
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setTitle(currentCell.getStringCellValue());
            } else {
                continue;
            }

            //right answer 1
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer1(validateCellValue(currentCell));
                question.setRightAnswer(1);
            } else {
                continue;
            }

            //answer 2
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer2(validateCellValue(currentCell));
            } else {
                continue;
            }

            //answer 3
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer3(validateCellValue(currentCell));
            } else {
                continue;
            }

            //answer 4
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer4(validateCellValue(currentCell));
            } else {
                continue;
            }

            //Set Subcategory
            if (cellIterator.hasNext()) {
                //Category
                validateCellValue(cellIterator.next());
                //Subcategory
                String subcategoryName = validateCellValue(cellIterator.next());
                question.setSubcategory(subcategoriesMap.get(subcategoriesDictionary.get(subcategoryName)));
            } else {
                continue;
            }

            //Image
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                String imageName = validateCellValue(currentCell);
                if (!imageName.isEmpty() && !imageName.equals("")) {
                    if (filesDictionary.containsKey(imageName)) {
                        questionMediaDictionary.put(question, filesDictionary.get(imageName));
                    } else {
                        ApiAssert.unprocessable(true, "Нету картинки, указанной в " + currentCell.getRowIndex() + "-ой строке Excel файла");
                    }
                }
            }

            if (question.getSubcategory() != null) {
                questions.add(question);
            } else {
                ApiAssert.unprocessable(true, "Не верно указана ветвь в " + currentRow.getRowNum() + "-ой строке Excel файла");

            }
        }


        for (Question question :
            questions) {
            if (question.getTitle().equals("")) {
                continue;
            }
            if (questionMediaDictionary.containsKey(question)) {
                MediaContainer media = mediaContainerService.create(questionMediaDictionary.get(question));
                question.setMedia(media);
            }
            questionRepository.save(question);

        }

        versionService.refreshQuestions();
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


    private String validateCellValue(Cell cell) {
        return cell.getCellTypeEnum() == CellType.STRING ? cell.getStringCellValue() : (cell.getCellTypeEnum() == CellType.NUMERIC ? Long.toString((long) cell.getNumericCellValue()) : "");
    }

}
