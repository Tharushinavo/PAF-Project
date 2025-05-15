// NotificationPanel.jsx
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { fetchNotifications } from '../services/api';
import './NotificationPanel.css';

const NotificationPanel = ({ currentUser, reloadKey }) => {
  const [notifications, setNotifications] = useState([]);
  const displayedIds = useRef(new Set());

  useEffect(() => {
    const interval = setInterval(() => {
      loadNotifications();
    }, 5000); // Check for new notifications every 5 seconds
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    loadNotifications(); // Also run on reloadKey change
  }, [reloadKey]);

  const loadNotifications = async () => {
    try {
      const response = await fetchNotifications(currentUser, false);
      const newNotifications = response.data;

      newNotifications.forEach((notif) => {
        if (!displayedIds.current.has(notif.id)) {
          toast.info(notif.message, {
            position: 'top-right',
            autoClose: 5000,
            onClose: () => handleDeleteNotification(notif.id),
          });
          displayedIds.current.add(notif.id);
        }
      });

      setNotifications((prev) => [...prev, ...newNotifications]);
    } catch (err) {
      console.error("Failed to load notifications", err);
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      await axios.delete(`http://localhost:8020/api/posts/notifications/${notificationId}`, {
        withCredentials: true,
      });
      setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  };

  return <ToastContainer newestOnTop closeOnClick pauseOnHover />;
};

export default NotificationPanel;
