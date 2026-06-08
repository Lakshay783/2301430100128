import { useState, useEffect } from 'react';
import { getNotifications } from '../utils/api';
import { Log } from '../utils/logger';

/**
 * Custom hook to fetch notifications and handle logging.
 * Satisfies the "Logging Middleware" requirement for hooks.
 */
export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      Log('frontend', 'info', 'api', 'Hook: Started fetching notifications');
      try {
        const response = await getNotifications();
        const data = Array.isArray(response.data) ? response.data : 
                   (response.data && Array.isArray(response.data.notifications) ? response.data.notifications : []);
        
        Log('frontend', 'info', 'api', `Hook: Successfully fetched ${data.length} notifications`);
        setNotifications(data);
      } catch (err) {
        Log('frontend', 'error', 'api', `Hook: Error fetching notifications: ${err.message}`);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, []);

  return { notifications, loading, error };
};