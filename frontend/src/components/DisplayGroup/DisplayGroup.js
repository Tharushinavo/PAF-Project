import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import './DisplayGroup.css';

function DisplayGroup() {
  const [community, setCommunity] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { id } = useParams(); // (optional - no harm even if not used)

  useEffect(() => {
    loadCommunity();
  }, []);

  const loadCommunity = async () => {
    try {
      const result = await axios.get("http://localhost:8080/community");
      setCommunity(result.data);
    } catch (error) {
      console.error("Error loading community groups:", error);
    }
  };

  const UpdateNavigate = (id) => {
    navigate(`/updategroup/${id}`);
  };

  const deleteGroup = async (id) => {
    const confirmationMessage = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmationMessage) {
      try {
        await axios.delete(`http://localhost:8080/community/${id}`);
        loadCommunity();
        alert("Group deleted successfully");
      } catch (error) {
        console.error("Error deleting group:", error);
        alert("Error Deleting Group");
      }
    }
  };

  const generatePdf = (community) => {
    const doc = new jsPDF("portrait");

    doc.text("Community Group List", 14, 10);

    const tableData = community.map((group) => [
      group.groupId,
      group.groupName,
      group.groupDescription,
      group.groupAdminName,
    ]);

    autoTable(doc, {
      head: [['Group ID', 'Group Name', 'Group Description', 'Group Admin Name']],
      body: tableData,
      startY: 20,
    });

    doc.save("community_group_list.pdf");
  };

  // Filter community based on search query
  const filteredData = community.filter(
    (group) =>
      group.groupId?.toString().toLowerCase().includes(searchQuery.toLowerCase()) ||
      group.groupName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container">
      <h1>COMMUNITY GROUPS</h1>

      <button className="pdf-btn" onClick={() => generatePdf(community)} style={{ marginBottom: '20px' }}>
        Generate PDF
      </button>

      <input
        type="text"
        placeholder="Search by ID or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '60px', padding: '30px', width: '800px' }}
      />

      <div className="card-container">
        {filteredData.map((group, index) => (
          <div className="card" key={index}>
            <div className="card-header">
              <img
                src={`http://localhost:8080/uploads/${group.groupImage}`}
                alt={group.groupName}
                className="card-image"
              />
            </div>
            <div className="card-body">
              <h3 className="card-title">{group.groupName}</h3>
              <p className="card-description">{group.groupDescription}</p>
              <p className="card-admin">Admin: {group.groupAdminName}</p>
            </div>
            <div className="card-footer">
              <button className="update-btn" onClick={() => UpdateNavigate(group.id)}>Update</button>
              <button className="delete-btn" onClick={() => deleteGroup(group.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DisplayGroup;
