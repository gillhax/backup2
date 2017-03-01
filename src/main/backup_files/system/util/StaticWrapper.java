package quiz.system.util;

import quiz.system.error.handler.dto.ResponseDto;

import java.util.HashMap;

/**
 * Wrap data to {@link ResponseDto}
 */
public class StaticWrapper {
    /**
     * Create new {@link ResponseDto} object with value in data
     */
    public static ResponseDto wrap(Object value) {
        return new ResponseDto(value);
    }

    /**
     * Create new {@link ResponseDto} object with HashMap in data
     */
    public static ResponseDto wrap(String key, Object value) {
        HashMap<String, Object> map = new HashMap<>(1, 1);
        map.put(key, value);
        return new ResponseDto(map);
    }

    /**
     * Return empty wrapper
     */
    public static ResponseDto wrap() {
        return new ResponseDto();
    }
}
