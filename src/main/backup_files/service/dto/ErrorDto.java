package quiz.system.error.handler.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ErrorDto {
    long timestamp = System.currentTimeMillis();
    int status;
    String error;
    String exception;
    String message;
    String devMessage;
    String path;

    public ErrorDto(int status, String error, String exception, String message, String devMessage, String path) {
        this.status = status;
        this.error = error;
        this.exception = exception;
        this.message = message;
        this.devMessage = devMessage;
        this.path = path;
    }
}
