import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Divider } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const NotificationCard = ({ notification, showPriority = false }) => {
  const getCategoryColor = (category) => {
    switch (category) {
      case 'Placement': return 'success';
      case 'Result': return 'error';
      case 'Event': return 'warning';
      default: return 'default';
    }
  };

  const timestamp = notification.Timestamp || notification.timestamp || notification.date;
  const formattedDate = timestamp 
    ? new Date(timestamp).toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }) 
    : 'Unknown Date';

  const category = notification.Type || notification.category || 'Information';
  const content = notification.Message || notification.message || notification.description || 'No content provided';

  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 4, 
      boxShadow: '0 2px 12px 0 rgba(0,0,0,0.05)',
      overflow: 'hidden',
      border: '1px solid rgba(0,0,0,0.05)',
      '&:hover': {
        boxShadow: '0 8px 24px 0 rgba(0,0,0,0.1)'
      }
    }}>
      <Box sx={{ p: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 2, gap: 1 }}>
          <Chip 
            label={category} 
            color={getCategoryColor(category)} 
            size="small" 
            sx={{ fontWeight: 'bold', textTransform: 'uppercase', px: 1 }}
          />
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
            <AccessTimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
            <Typography variant="caption" fontWeight="medium">
              {formattedDate}
            </Typography>
          </Box>
        </Box>
        
        <Typography variant="h6" component="div" gutterBottom fontWeight="bold" sx={{ color: 'text.primary', lineHeight: 1.3 }}>
          {content}
        </Typography>

        {showPriority && notification.priorityScore && (
          <>
            <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', bgcolor: 'primary.main', color: 'white', py: 0.75, px: 2, borderRadius: 2, width: 'fit-content' }}>
              <TrendingUpIcon sx={{ fontSize: 18, mr: 1 }} />
              <Typography variant="body2" fontWeight="bold">
                Priority Score: {notification.priorityScore.toFixed(2)}
              </Typography>
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default NotificationCard;
