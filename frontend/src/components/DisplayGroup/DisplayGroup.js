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
    <div style={{ padding: '20px' }}>
      <h1>COMMUNITY GROUPS</h1>

      <button className="pdf-btn" onClick={() => generatePdf(community)} style={{ marginBottom: '20px' }}>
        Generate PDF
      </button>

      <input
        type="text"
        placeholder="Search by ID or Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ marginBottom: '20px', padding: '25px', width: '1700px' }}
      />

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f2f2f2' }}>
            <th>Group Id</th>
            <th>Group Image</th>
            <th>Group Name</th>
            <th>Group Description</th>
            <th>Group Admin Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((group, index) => (
            <tr key={index}>
              <td>{group.groupId}</td>
              <td>
                <img
                  src={`http://localhost:8080/uploads/${group.groupImage}`}
                  alt={group.groupName}
                  width="50"
                  height="50"
                />
              </td>
              <td>{group.groupName}</td>
              <td>{group.groupDescription}</td>
              <td>{group.groupAdminName}</td>
              <td>
                <button className="update-btn"
                  onClick={() => UpdateNavigate(group.id)}
                  style={{ marginRight: '10px' }}
                >
                  Update
                </button>
                <button className="delete-btn" onClick={() => deleteGroup(group.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DisplayGroup;
