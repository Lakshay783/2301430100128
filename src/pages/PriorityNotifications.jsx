import React, { useState, useEffect } from 'react';
import { Log } from '../utils/logger';
import { 
  Box, Typography, CircularProgress, 
  FormControl, InputLabel, Select, MenuItem, Alert, Container 
} from '@mui/material';
import NotificationCard from '../components/NotificationCard';
import { getTopNotifications } from '../utils/priorityCalculator';
import { useNotifications } from '../hooks/useNotifications';

const PriorityNotifications = () => {
  const { notifications, loading, error } = useNotifications();
  const [topList, setTopList] = useState([]);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Priority page load');
  }, []);

  useEffect(() => {
    if (notifications.length > 0) {
      setTopList(getTopNotifications(notifications, limit));
      Log('frontend', 'info', 'component', `Priority inbox recalculated for top ${limit} notifications`);
    }
  }, [notifications, limit]);

  const handleNotificationClick = (notif) => {
    Log('frontend', 'info', 'component', `Notification clicked/viewed: ${notif.Company || notif.Msg || 'Unknown'}`);
  };

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box sx={{ mt: 5, mx: 2 }}>
      <Alert severity="error" variant="filled" sx={{ borderRadius: 2 }}>{error}</Alert>
    </Box>
  );

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
        <Typography variant="h4" fontWeight="bold">Priority Ranking</Typography>
        <FormControl sx={{ minWidth: 150, width: { xs: '100%', sm: 'auto' } }} size="small">
          <InputLabel>View Count</InputLabel>
          <Select
            value={limit}
            label="View Count"
            onChange={(e) => setLimit(e.target.value)}
            sx={{ borderRadius: 2 }}
          >
            <MenuItem value={10}>Top 10</MenuItem>
            <MenuItem value={15}>Top 15</MenuItem>
            <MenuItem value={20}>Top 20</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ minHeight: '50vh' }}>
        {topList.map((notif, index) => (
          <Box key={notif.ID || index} onClick={() => handleNotificationClick(notif)}>
            <NotificationCard notification={notif} showPriority={true} />
          </Box>
        ))}

        {topList.length === 0 && (
          <Box sx={{ textAlign: 'center', py: 10 }}>
            <Typography variant="h6" color="text.secondary">
              No ranked notifications available.
            </Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default PriorityNotifications;
