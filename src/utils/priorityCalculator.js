export const calculatePriorityScore = (notification) => {
  let categoryScore = 0;
  const category = notification.Type || notification.category;
  
  switch (category) {
    case 'Placement':
      categoryScore = 100;
      break;
    case 'Result':
      categoryScore = 70;
      break;
    case 'Event':
      categoryScore = 40;
      break;
    default:
      categoryScore = 0;
  }

  // Freshness Score calculation
  const now = new Date();
  const timestamp = notification.Timestamp || notification.timestamp || notification.date;
  const createdDate = new Date(timestamp);
  const ageInHours = (now - createdDate) / (1000 * 60 * 60);
  
  // Freshness Score: starts at 100 and decreases over time (e.g., -1 point per hour, min 0)
  const freshnessScore = Math.max(0, 100 - ageInHours);

  return categoryScore + freshnessScore;
};

export const getTopNotifications = (notifications, count = 10) => {
  return [...notifications]
    .map(notif => ({
      ...notif,
      priorityScore: calculatePriorityScore(notif)
    }))
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, count);
};
