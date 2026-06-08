import React from 'react';
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';

const SummaryCard = ({ title, count, color, icon: Icon }) => {
  return (
    <Card sx={{ 
      borderRadius: 4, 
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
      transition: 'transform 0.2s',
      '&:hover': { transform: 'translateY(-4px)' }
    }}>
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 'bold' }}>
              {title}
            </Typography>
            <Typography variant="h4" fontWeight="bold">
              {count}
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: `${color}15`, color: color, width: 56, height: 56 }}>
            {Icon && <Icon fontSize="large" />}
          </Avatar>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
