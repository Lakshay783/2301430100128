import React, { useState, useEffect } from 'react';
import { Log } from '../utils/logger';
import { Grid, Box, Typography, CircularProgress, Container, Alert } from '@mui/material';
import SummaryCard from '../components/SummaryCard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import AssignmentIcon from '@mui/icons-material/Assignment';
import EventIcon from '@mui/icons-material/Event';
import { useNotifications } from '../hooks/useNotifications';

const Dashboard = () => {
  const { notifications, loading, error } = useNotifications();
  const [data, setData] = useState({
    total: 0,
    placement: 0,
    result: 0,
    event: 0
  });

  useEffect(() => {
    Log('frontend', 'info', 'page', 'Dashboard page load');

    if (!loading && notifications) {
      setData({
        total: notifications.length,
        placement: notifications.filter(n => (n.Type || n.category) === 'Placement').length,
        result: notifications.filter(n => (n.Type || n.category) === 'Result').length,
        event: notifications.filter(n => (n.Type || n.category) === 'Event').length
      });
    }
  }, [notifications, loading]);

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 4 }}>
        Dashboard Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard title="Total" count={data.total} color="#3f51b5" icon={NotificationsIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard title="Placement" count={data.placement} color="#4caf50" icon={BusinessCenterIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard title="Result" count={data.result} color="#f44336" icon={AssignmentIcon} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <SummaryCard title="Event" count={data.event} color="#ff9800" icon={EventIcon} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
