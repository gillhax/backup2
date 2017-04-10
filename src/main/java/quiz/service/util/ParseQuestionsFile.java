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

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
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

    private String convertEncodingFileName(String fileName) {
        try {

            return new String(fileName.getBytes("ISO-8859-1"), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            return fileName;
        }
    }


    public void main(List<MultipartFile> files) {
        XSSFWorkbook workbook = null;
        HashMap<String, MultipartFile> filesDictionary = new HashMap<>();

        MultipartFile excelMultipartFile = null;
        Iterator filesIterator = files.iterator();

        while (filesIterator.hasNext()) {
            MultipartFile file = (MultipartFile) filesIterator.next();
            String categorySheet = convertEncodingFileName(file.getOriginalFilename());
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
            workbook = new XSSFWorkbook(excelMultipartFile.getInputStream());
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
            Question question = new Question();
            //title
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();

                String value = optimizeBreakLine(validateCellValue(currentCell));
                if (value != null && !value.equals("")) {
                    question.setTitle(value);
                } else {
                    Cell nextCurrentCell = cellIterator.next();
                    question.setTitle(optimizeBreakLine(validateCellValue(nextCurrentCell)));
                }
            } else {
                continue;
            }

            //right answer 1
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer1(optimizeBreakLine(validateCellValue(currentCell)));
                question.setRightAnswer(1);
            } else {
                continue;
            }

            //answer 2
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer2(optimizeBreakLine(validateCellValue(currentCell)));
            } else {
                continue;
            }

            //answer 3
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer3(optimizeBreakLine(validateCellValue(currentCell)));
            } else {
                continue;
            }

            //answer 4
            if (cellIterator.hasNext()) {
                Cell currentCell = cellIterator.next();
                question.setAnswer4(optimizeBreakLine(validateCellValue(currentCell)));
            } else {
                continue;
            }


            boolean rightSubcategory = false;
            //Set Subcategory
            if (cellIterator.hasNext()) {
                //Category
                validateCellValue(cellIterator.next());
                //Subcategory
                String subcategoryName = validateCellValue(cellIterator.next());
                if (subcategoriesDictionary.containsKey(subcategoryName)) {
                    question.setSubcategory(subcategoriesMap.get(subcategoriesDictionary.get(subcategoryName)));
                    rightSubcategory = true;
                }
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
            if (!question.getTitle().equals("")
                && !question.getAnswer1().equals("") && !question.getAnswer2().equals("")
                && !question.getAnswer3().equals("") && !question.getAnswer4().equals("")) {
                if (question.getSubcategory() != null) {
                    questions.add(question);
                } else {
                    ApiAssert.unprocessable(true, "Не верно указана ветвь в " + currentRow.getRowNum() + "-ой строке Excel файла");

                }
            }
            if (rightSubcategory) {
                questions.add(question);
            } else {
                ApiAssert.unprocessable(true, "Не верно указана семья в " + currentRow.getRowNum() + "-ой строке Excel файла");
            }
        }

        for (Question question : questions) {
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

    }


    private String validateCellValue(Cell cell) {
        return cell.getCellTypeEnum() == CellType.STRING ? cell.getStringCellValue() : (cell.getCellTypeEnum() == CellType.NUMERIC ? Long.toString((long) cell.getNumericCellValue()) : "");
    }

    private static String optimizeBreakLine(String text) {
        if (text.endsWith("\n")) {
            while (text.endsWith("\n")) {
                text = dellBreakLine(text);
            }
        }
        return text;
    }

    private static String dellBreakLine(String text) {
        if (text.endsWith("\n")) {
            int pos = text.lastIndexOf("\n");
            StringBuilder string = new StringBuilder(text);
            string.setLength(pos);
            return string.toString();
        }
        return text;
    }

}
