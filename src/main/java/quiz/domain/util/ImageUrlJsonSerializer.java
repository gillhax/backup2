package quiz.domain.util;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.beans.factory.annotation.Value;

import java.io.IOException;

public class ImageUrlJsonSerializer extends JsonSerializer<String> {

    private static String baseUri;

    @Value("${project.base-uri}")
    public void setBaseUri(String baseUri) {
        ImageUrlJsonSerializer.baseUri = baseUri;
    }

    @Override
    public void serialize(String value, JsonGenerator gen,
                          SerializerProvider serializers)
        throws IOException {
        if (value != null && !value.isEmpty()) {
            gen.writeObject(baseUri + "/images/" + value);
        } else {
            gen.writeObject(value);
        }
    }
}
