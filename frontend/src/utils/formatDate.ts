// utils/formatDate.ts
import { format, formatDistanceToNow } from 'date-fns';

export const formatCreatedAt = (dateString: string): string => {
  const date = new Date(dateString);
  return format(date, "EEE, MMMM do yyyy");
};

export const formatUpdatedAt = (dateString: string): string => {
  const date = new Date(dateString);
  return formatDistanceToNow(date, { addSuffix: true });
};


export const formatDaysLeft = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
  
    // Check if the date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
  
    const distance = formatDistanceToNow(date, { addSuffix: false });
  
    // Determine if the date is in the future or past
    if (date > now) {
      return `${distance} left`;
    } else {
      return `${distance} ago expired`;
    }
  };