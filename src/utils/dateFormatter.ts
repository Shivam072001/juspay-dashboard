import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with relative time plugin
dayjs.extend(relativeTime);

/**
 * Human-friendly date formatter that shows:
 * - "Just now" for a few seconds ago
 * - "1/5/10 minutes ago" for minutes ago  
 * - "1 hour ago" / "Yesterday" for recent times
 * - Otherwise, fallback to a date format (e.g., Feb 2, 2023)
 */
export function formatDate(date: string | Date): string {
  const now = dayjs();
  const targetDate = dayjs(date);
  const diff = now.diff(targetDate, 'day');

  // If it's today, show relative time
  if (diff === 0) {
    const diffMinutes = now.diff(targetDate, 'minute');
    const diffSeconds = now.diff(targetDate, 'second');
    
    if (diffSeconds < 30) return 'Just now';
    if (diffMinutes < 1) return 'A minute ago';
    
    return targetDate.fromNow(); // e.g. "2 minutes ago", "1 hour ago"
  }
  
  // If it's yesterday
  if (diff === 1) return 'Yesterday';
  
  // For older dates, show formatted date
  return targetDate.format('MMM D, YYYY'); // e.g. "Feb 2, 2023"
}

/**
 * Parse relative date strings from mock data and convert to actual dates
 * This handles the existing mock data format and converts it to proper dates
 */
export function parseRelativeDate(dateStr: string): Date {
  const now = dayjs();
  
  switch (dateStr.toLowerCase()) {
    case 'just now':
      return now.toDate();
    case 'a minute ago':
      return now.subtract(1, 'minute').toDate();
    case '1 hour ago':
      return now.subtract(1, 'hour').toDate();
    case 'yesterday':
      return now.subtract(1, 'day').toDate();
    default:
      // Try to parse as regular date, fallback to current time
      const parsed = dayjs(dateStr);
      return parsed.isValid() ? parsed.toDate() : now.toDate();
  }
}

/**
 * Get numeric sort value for dates (for table sorting)
 */
export function getDateSortValue(dateStr: string): number {
  // First try to parse as ISO date, then fall back to relative date parsing
  const parsed = dayjs(dateStr);
  if (parsed.isValid()) {
    return parsed.valueOf();
  }
  // Fallback for old relative date strings
  const date = parseRelativeDate(dateStr);
  return date.getTime();
}

/**
 * Format date for display in table - handles both ISO dates and relative strings
 */
export function formatTableDate(dateStr: string): string {
  // First try to parse as ISO date
  const parsed = dayjs(dateStr);
  if (parsed.isValid()) {
    return formatDate(parsed.toDate());
  }
  
  // Fallback: if it's a relative string from old mock data, convert to actual date first
  const actualDate = parseRelativeDate(dateStr);
  return formatDate(actualDate);
}
