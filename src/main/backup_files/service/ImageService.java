package quiz.service;

import lombok.AllArgsConstructor;
import org.apache.commons.codec.binary.Base64;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import quiz.service.util.RandomUtil;
import quiz.system.error.ApiAssert;

import javax.imageio.IIOException;
import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardOpenOption;
import java.util.Arrays;

@Service
@Transactional(propagation = Propagation.MANDATORY)
public class ImageService {

    @Value("${project.image-folder}")
    private String IMAGE_FOLDER;

    private final Log LOGGER = LogFactory.getLog(this.getClass());

    public enum ImageType {
        ORIGINAL(null),
        JPEG("jpg"),
        PNG("png");

        String extension;

        ImageType(String extension) {
            this.extension = extension;
        }
    }

    @AllArgsConstructor
    public static class Size {
        final int width;
        final int height;
        final boolean cropToSquare;
    }

    public abstract static class ImageBridge {
        abstract void saveNew(String imageName);

        abstract String getOld();

    }

    /**
     * @param image        - {@link MultipartFile} from user
     * @param folder       - appended before generated name
     * @param imageBridges for set new path, get old path and transfer resize/crop parameters
     */
    public void save(MultipartFile image, String folder, ImageBridge... imageBridges) {
        ImageType realImageType = getRealImageType(image);

        String[] oldFiles = getOldFiles(imageBridges);

        try {
            for (ImageBridge imageBridge : imageBridges) {
                String imageName;
                //save original file
                imageName = saveFile(image, folder, realImageType.extension);
                imageBridge.saveNew(imageName);
            }
        } catch (SecurityException | IOException e) {
            //TODO: throw valid error to user
            //throw new InternalServerErrorException("Image not saved");
        }

        deleteOldFiles(oldFiles);
    }

    public void delete(String path) {
        deleteOldFiles(path);
    }

    //for offer tradition
    public String saveBase64Image(String base64Image, String folder) {
        try {
            byte[] bytes = Base64.decodeBase64(base64Image);
            String extension = checkImage(bytes);
            String fileName = generateUniqueFileName(folder, extension);
            Path destinationFile = Paths.get(getFullPath(fileName));
            Files.write(destinationFile, bytes, StandardOpenOption.CREATE);
            return fileName;

        } catch (SecurityException | IOException e) {
            //TODO: throw valid error to user
            //throw new InternalServerErrorException("Image not saved");
            return null;
        }
    }

    private String checkImage(byte[] bytes) throws IOException {
        int maxSize = 2048;
        byte[] jpegMagicNumber = new byte[]{(byte) 0xff, (byte) 0xd8, (byte) 0xff, (byte) 0xe0};
        byte[] pngMagicNumber = new byte[]{(byte) 0x89, (byte) 0x50, (byte) 0x4e, (byte) 0x47};

        byte[] magicNumber = Arrays.copyOf(bytes, 4);

        String extension = "";
        if (Arrays.equals(jpegMagicNumber, magicNumber)) {
            extension = "jpg";
        } else if (Arrays.equals(pngMagicNumber, magicNumber)) {
            extension = "png";
        } else {
            //noinspection ConstantConditions
            ApiAssert.badRequest(true, "bad-image");
        }

        ByteArrayInputStream bis = new ByteArrayInputStream(bytes);
        BufferedImage bufferedImage = null;
        try {
            bufferedImage = ImageIO.read(bis);
        } catch (IIOException e) {
            //noinspection ConstantConditions
            ApiAssert.badRequest(true, "bad-image");
        }
        ApiAssert.badRequest(bufferedImage == null, "bad-image");
        ApiAssert.badRequest(bufferedImage.getWidth() > maxSize || bufferedImage.getHeight() > maxSize,
            "big-image");
        return extension;
    }


    private String[] getOldFiles(ImageBridge[] imageBridges) {
        String[] oldFiles = new String[imageBridges.length];
        for (int i = 0; i < imageBridges.length; i++) {
            oldFiles[i] = imageBridges[i].getOld();
        }
        return oldFiles;
    }

    private void deleteOldFiles(String... files) {
        for (String file : files) {
            if (file != null && !file.isEmpty()) {
                try {
                    Files.deleteIfExists(Paths.get(getFullPath(file)));
                } catch (IOException e) {
                    LOGGER.error("Cannot delete old file", e);
                }

            }
        }
    }

    private ImageType getRealImageType(MultipartFile image) {

        String contentType = image.getContentType();
        if (contentType != null) {
            if (contentType.equals(MediaType.IMAGE_JPEG_VALUE)) {
                return ImageType.JPEG;
            } else if (contentType.equals(MediaType.IMAGE_PNG_VALUE)) {
                return ImageType.PNG;
            }
        }
        //TODO: throw valid error to user
        //throw new BadRequestException("File not image");
        throw new RuntimeException();
    }

    private String saveFile(MultipartFile image, String folder, String originExtension) throws IOException {
        String uniqueFileName = generateUniqueFileName(folder, originExtension);

        Files.write(Paths.get(getFullPath(uniqueFileName)), image.getBytes());

        return uniqueFileName;
    }


    private String generateUniqueFileName(String folder, String extension) throws IOException {
        String fileName;
        do {
            fileName = folder + generateRandomFileName(extension);
        }
        while (Files.exists(Paths.get(getFullPath(fileName))));

        createFolders(fileName);

        return fileName;
    }

    private void createFolders(String fileName) throws IOException {
        String onlyFolder = fileName.substring(0, fileName.lastIndexOf('/'));
        Files.createDirectories(Paths.get(getFullPath(onlyFolder)));
    }

    private String generateRandomFileName(String extension) {
        return "/" +
            RandomUtil.generateImageName(32).toLowerCase() +
            "." +
            extension;
    }


    private String getFullPath(String fileName) {
        return IMAGE_FOLDER + "/" + fileName;
    }

}
