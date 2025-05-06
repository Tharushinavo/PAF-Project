
package backend.exception;

public class CommunityNotFoundException extends RuntimeException {
    public CommunityNotFoundException(Long id) {
        super("could not find id" + id);
    }

    public CommunityNotFoundException(String message) {
        super(message);
    }
}

