import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './UpdateGroup.css';


function UpdateGroup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    groupId: "",
    groupName: "",
    groupDescription: "",
    groupAdminName: "",
    groupImage: null,
  });

  useEffect(() => {
    loadGroup();
  }, []);

  const loadGroup = async () => {
    try {
      const result = await axios.get(`http://localhost:8080/community/${id}`);
      setFormData({
        groupId: result.data.groupId,
        groupName: result.data.groupName,
        groupDescription: result.data.groupDescription,
        groupAdminName: result.data.groupAdminName,
        groupImage: result.data.groupImage, // Only file name
      });
    } catch (error) {
      console.error("Error loading group:", error);
    }
  };

  const onInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const onImageChange = (e) => {
    setFormData({
      ...formData,
      groupImage: e.target.files[0]
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("groupDetails", JSON.stringify({
      groupId: formData.groupId,
      groupName: formData.groupName,
      groupDescription: formData.groupDescription,
      groupAdminName: formData.groupAdminName,
    }));
    if (formData.groupImage instanceof File) {
      updatedData.append("file", formData.groupImage);
    }

    try {
      await axios.put(`http://localhost:8080/community/${id}`, updatedData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      alert("Group Updated Successfully!");
      navigate("/displaygroup");
    } catch (error) {
      console.error("Error updating group:", error);
      alert("Failed to update group.");
    }
  };

  return (
    <div className="group-container">
      <h2 className="group-title">🌐 Update Group</h2>
      <form onSubmit={onSubmit} className="group-form">

        <div className="group-field">
          <label htmlFor="groupId">Group ID:</label>
          <input type="text" name="groupId" value={formData.groupId} onChange={onInputChange} required />
        </div>

        <div className="group-field">
          <label htmlFor="groupImage">Group Image:</label>

          {formData.groupImage && !(formData.groupImage instanceof File) && (
            <div style={{ marginBottom: '10px' }}>
              <img
                src={`http://localhost:8080/uploads/${formData.groupImage}`}
                alt="Current Group"
                width="100"
                height="100"
              />
            </div>
          )}

          <input type="file" name="groupImage" onChange={onImageChange} accept="image/*" />
        </div>

        <div className="group-field">
          <label htmlFor="groupName">Group Name:</label>
          <input type="text" name="groupName" value={formData.groupName} onChange={onInputChange} required />
        </div>

        <div className="group-field">
          <label htmlFor="groupDescription">Group Description:</label>
          <textarea name="groupDescription" value={formData.groupDescription} onChange={onInputChange} rows="3" required></textarea>
        </div>

        <div className="group-field">
          <label htmlFor="groupAdminName">Group Admin Name:</label>
          <input type="text" name="groupAdminName" value={formData.groupAdminName} onChange={onInputChange} required />
        </div>

        <div className="group-submit">
          <button type="submit">🚀 Update Group</button>
        </div>

      </form>
    </div>
  );
}

export default UpdateGroup;
