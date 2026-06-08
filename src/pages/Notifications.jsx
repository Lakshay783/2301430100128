import React, { useState, useEffect } from 'react';
import { Log } from '../utils/logger';
import { 
  Box, Typography, CircularProgress, 
  FormControl, InputLabel, Select, MenuItem, 
  Pagination, Alert, Container 
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { useNotifications } from '../hooks/useNotifications';

const Notifications = () => {
  const { notifications, loading, error: fetchError } = useNotifications();
  const [filteredNotifications, setFilteredNotifications] = useState([]);
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Notifications page load');
  }, []);

  useEffect(() => {
    if (notifications) {
      setFilteredNotifications(notifications);
    }
  }, [notifications]);

  const handleFilterChange = (e) => {
    const selectedCategory = e.target.value;
    Log('frontend', 'info', 'component', `User changed filter to ${selectedCategory.toLowerCase()}`);
    setCategory(selectedCategory);
    setPage(1);
  };

  const handlePageChange = (event, value) => {
    Log('frontend', 'info', 'component', `User changed pagination to page ${value}`);
    setPage(value);
  };

  const handleNotificationClick = (notif) => {
    Log('frontend', 'info', 'component', `Notification clicked/viewed: ${notif.Company || notif.Msg || 'Unknown'}`);
  };

  useEffect(() => {
    let filtered = notifications;
    if (category !== 'All') {
      filtered = notifications.filter(n => (n.Type || n.category) === category);
    }
    setFilteredNotifications(filtered);
    setPage(1); // Reset to first page on filter change
  }, [category, notifications]);

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress />
    </Box>
  );

  if (fetchError) return (
    <Box sx={{ mt: 5 }}>
      <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>{fetchError}</Alert>
    </Box>
  );

  const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
  const displayedNotifications = filteredNotifications.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', sm: 'row' }, 
        justifyContent: 'space-between', 
        alignItems: { xs: 'flex-start', sm: 'center' }, 
        mb: 4, 
        gap: 2 
      }}>
        <Typography variant="h4" fontWeight="bold">All Notifications</Typography>
        <FormControl sx={{ minWidth: 200, width: { xs: '100%', sm: 'auto' } }} size="small">
          <InputLabel>Filter by Category</InputLabel>
          <Select
            value={category}
            label="Filter by Category"
            onChange={handleFilterChange}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value="All">All Categories</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minHeight: '50vh' }}>
        {displayedNotifications.map((notif, index) => (
          <Box key={notif.ID || index} onClick={() => handleNotificationClick(notif)}>
            <NotificationCard notification={notif} />
          </Box>
        ))}

        {filteredNotifications.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              No notifications found in this category.
            </Typography>
          </Box>
        )}
      </Box>

      {totalPages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6, mb: 4 }}>
          <Pagination 
            count={totalPages} 
            page={page} 
            onChange={handlePageChange} 
            color="primary" 
            variant="outlined"
            shape="rounded"
            size={window.innerWidth < 600 ? "small" : "medium"}
          />
        </Box>
      )}
    </Container>
  );
};

export default Notifications;
