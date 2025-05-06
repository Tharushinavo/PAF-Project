package backend.controller;

import backend.exception.CommunityNotFoundException;
import backend.model.CommunityModel;
import backend.repository.CommunityRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;

@RestController
@CrossOrigin({"http://localhost:3000"})
public class CommunityController {

    @Autowired
    private CommunityRepository communityRepository;

    private final String UPLOAD_DIR = "src/main/uploads/";

    public CommunityController() {
    }

    // Create a new community
    @PostMapping("/community")
    public CommunityModel newCommunityModel(@RequestBody CommunityModel newCommunityModel) {
        return this.communityRepository.save(newCommunityModel);
    }

    // Upload a group image separately
    @PostMapping("/community/groupImage")
    public String groupImage(@RequestParam("file") MultipartFile file) {
        String groupImage = file.getOriginalFilename();

        try {
            File uploadDir = new File(UPLOAD_DIR);
            if (!uploadDir.exists()) {
                uploadDir.mkdirs();
            }
            file.transferTo(Paths.get(UPLOAD_DIR + groupImage));
            return groupImage;
        } catch (IOException e) {
            e.printStackTrace();
            return "Error uploading file: " + groupImage;
        }
    }

    // Get all community groups
    @GetMapping("/community")
    public List<CommunityModel> getAllGroups() {
        return this.communityRepository.findAll();
    }

    // Get a community group by ID
    @GetMapping("/community/{id}")
    public CommunityModel getGroupId(@PathVariable Long id) {
        return this.communityRepository.findById(id)
                .orElseThrow(() -> new CommunityNotFoundException(id));
    }

    // Get uploaded group image by filename
    @GetMapping("/uploads/{filename}")
    public ResponseEntity<FileSystemResource> getImage(@PathVariable String filename) {
        File file = new File(UPLOAD_DIR + filename);
        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok(new FileSystemResource(file));
        }
    }

    // Update a community group with optional new image
    @PutMapping("/community/{id}")
    public CommunityModel updateCommunityModel(
            @RequestPart(value = "groupDetails") String groupDetails,
            @RequestPart(value = "file", required = false) MultipartFile file,
            @PathVariable Long id
    ) {
        System.out.println("Group Details: " + groupDetails);
        if (file != null) {
            System.out.println("File received: " + file.getOriginalFilename());
        } else {
            System.out.println("No file uploaded");
        }

        ObjectMapper mapper = new ObjectMapper();
        CommunityModel newCommunity;
        try {
            newCommunity = mapper.readValue(groupDetails, CommunityModel.class);
        } catch (Exception e) {
            throw new RuntimeException("Error parsing groupDetails", e);
        }

        return communityRepository.findById(id).map(existingCommunity -> {
            existingCommunity.setGroupId(newCommunity.getGroupId());
            existingCommunity.setGroupName(newCommunity.getGroupName());
            existingCommunity.setGroupDescription(newCommunity.getGroupDescription());
            existingCommunity.setGroupAdminName(newCommunity.getGroupAdminName());

            if (file != null && !file.isEmpty()) {
                String groupImage = file.getOriginalFilename();
                try {
                    file.transferTo(Paths.get(UPLOAD_DIR + groupImage));
                    existingCommunity.setGroupImage(groupImage);
                } catch (IOException e) {
                    throw new RuntimeException("Error saving uploaded file", e);
                }
            }

            return communityRepository.save(existingCommunity);
        }).orElseThrow(() -> new CommunityNotFoundException(id));
    }

    // Delete a community group
    @DeleteMapping("/community/{id}")
    public ResponseEntity<String> deleteGroup(@PathVariable Long id) {

        CommunityModel communityGroup = communityRepository.findById(id)
                .orElseThrow(() -> new CommunityNotFoundException(id));

        String groupImage = communityGroup.getGroupImage();
        if (groupImage != null && !groupImage.isEmpty()) {
            File imageFile = new File(UPLOAD_DIR + groupImage);
            if (imageFile.exists()) {
                if (imageFile.delete()) {
                    System.out.println("Image Deleted");
                } else {
                    System.out.println("Failed to delete image");
                }
            }
        }

        // delete group from the repository
        communityRepository.deleteById(id);

        // return success response
        return ResponseEntity.ok("Data with id " + id + " and its image have been deleted.");
    }
}
