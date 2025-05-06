import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './AddGroup.css';

export default function AddGroup() {
  const navigate = useNavigate();

  const [community, setCommunity] = useState({
    groupId: '',
    groupName: '',
    groupDescription: '',
    groupAdminName: '',
  });

  const [groupImage, setGroupImage] = useState(null);
  const { groupId, groupName, groupDescription, groupAdminName } = community;

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setCommunity({ ...community, [name]: value });
  };

  const onImageChange = (e) => {
    setGroupImage(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    let imageName = "";

    // Upload image
    if (groupImage) {
      const formData = new FormData();
      formData.append("file", groupImage);

      try {
        const response = await axios.post(
          "http://localhost:8080/community/groupImage",
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        imageName = response.data;
        console.log("Image uploaded as:", imageName);
      } catch (error) {
        console.error("Image upload error:", error);
        alert("Error uploading image");
        return;
      }
    }

    // Send group data
    const newGroup = {
      ...community,
      groupImage: imageName,
    };

    try {
      await axios.post("http://localhost:8080/community", newGroup);
      alert("Group added successfully");
      navigate("/");
    } catch (error) {
      console.error("Group submission error:", error);
      alert("Error submitting group");
    }
  };

  return (
    <div className="group-container">
      <h2 className="group-title">🌐 Create a New Group</h2>
      <form onSubmit={onSubmit} className="group-form">

        <div className="group-field">
          <label htmlFor="groupId">Group ID:</label>
          <input type="text" name="groupId" value={groupId} onChange={onInputChange} required />
        </div>

        <div className="group-field">
          <label htmlFor="groupImage">Group Image:</label>
          <input type="file" name="groupImage" onChange={onImageChange} accept="image/*" />
        </div>

        <div className="group-field">
          <label htmlFor="groupName">Group Name:</label>
          <input type="text" name="groupName" value={groupName} onChange={onInputChange} required />
        </div>

        <div className="group-field">
          <label htmlFor="groupDescription">Group Description:</label>
          <textarea name="groupDescription" value={groupDescription} onChange={onInputChange} rows="3" required></textarea>
        </div>

        <div className="group-field">
          <label htmlFor="groupAdminName">Group Admin Name:</label>
          <input type="text" name="groupAdminName" value={groupAdminName} onChange={onInputChange} required />
        </div>

        <div className="group-submit">
          <button type="submit">🚀 Add Group</button>
        </div>

      </form>
    </div>
  );
}
