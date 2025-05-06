// Source code is decompiled from a .class file using FernFlower decompiler.
package backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class CommunityModel {
    @Id
    @GeneratedValue
    private Long id;
    private String groupId;
    private String groupImage;
    private String groupName;
    private String groupDescription;
    private String groupAdminName;

    public CommunityModel() {
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupId() {
        return this.groupId;
    }

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public String getGroupImage() {
        return this.groupImage;
    }

    public void setGroupImage(String groupImage) {
        this.groupImage = groupImage;
    }

    public String getGroupName() {
        return this.groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getGroupDescription() {
        return this.groupDescription;
    }

    public void setGroupDescription(String groupDescription) {
        this.groupDescription = groupDescription;
    }

    public String getGroupAdminName() {
        return this.groupAdminName;
    }

    public void setGroupAdminName(String groupAdminName) {
        this.groupAdminName = groupAdminName;
    }

    public CommunityModel(Long id, String groupId, String groupImage, String groupName, String groupDescription, String groupAdminName) {
        this.id = id;
        this.groupId = groupId;
        this.groupImage = groupImage;
        this.groupName = groupName;
        this.groupDescription = groupDescription;
        this.groupAdminName = groupAdminName;
    }
}
