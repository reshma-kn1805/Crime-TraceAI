/**
 * CrimeTraceAI — Indian Operational Formatting Utilities
 * Standardizes Dates in IST (DD-MM-YYYY), Currency in INR (₹), and Phone numbers (+91)
 */

/**
 * Format date/time strictly in Indian Standard Time (IST, UTC+5:30)
 * Format: DD-MM-YYYY HH:mm or DD-MM-YYYY HH:mm:ss IST
 */
export function formatIST(dateInput, includeSeconds = false) {
  if (!dateInput) return '—';
  
  const date = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;

  if (isNaN(date.getTime())) return '—';

  // Indian Standard Time options
  const options = {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  if (includeSeconds) {
    options.second = '2-digit';
  }

  // Format parts
  const formatter = new Intl.DateTimeFormat('en-IN', options);
  const parts = formatter.formatToParts(date);
  
  const partMap = {};
  parts.forEach(p => { partMap[p.type] = p.value; });

  const day = partMap.day || '01';
  const month = partMap.month || '01';
  const year = partMap.year || '2026';
  const hour = partMap.hour || '12';
  const minute = partMap.minute || '00';
  const dayPeriod = partMap.dayPeriod ? ` ${partMap.dayPeriod.toUpperCase()}` : '';
  const second = includeSeconds && partMap.second ? `:${partMap.second}` : '';

  return `${day}-${month}-${year} ${hour}:${minute}${second}${dayPeriod} IST`;
}

/**
 * Format only the date part in DD-MM-YYYY (IST)
 */
export function formatISTDate(dateInput) {
  if (!dateInput) return '—';
  const date = typeof dateInput === 'string' || typeof dateInput === 'number'
    ? new Date(dateInput)
    : dateInput;

  if (isNaN(date.getTime())) return '—';

  const formatter = new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const parts = formatter.formatToParts(date);
  const partMap = {};
  parts.forEach(p => { partMap[p.type] = p.value; });

  return `${partMap.day}-${partMap.month}-${partMap.year}`;
}

/**
 * Format number into Indian Rupee format (e.g. ₹2,45,000 or ₹1,25,50,000)
 */
export function formatINR(amount) {
  if (amount === null || amount === undefined || isNaN(amount)) return '₹0';
  
  const num = Number(amount);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  }).format(num);

  return `₹${formatted}`;
}

/**
 * Format Indian Mobile number: +91 98765 43210
 */
export function formatPhone(phone) {
  if (!phone) return '—';
  const cleaned = ('' + phone).replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  return phone;
}

/**
 * Format file size in bytes to human readable format
 */
export function formatBytes(bytes, decimals = 1) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
