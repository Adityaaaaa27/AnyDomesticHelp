/**
 * Formatting utilities.
 */

/**
 * Format a phone number for display (e.g., "9820108341" → "98201 08341")
 */
export function formatPhoneNumber(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length === 10) {
    return `${clean.slice(0, 5)} ${clean.slice(5)}`;
  }
  return phone;
}

/**
 * URL-encode a filename that may contain spaces.
 */
export function encodeImageFilename(filename: string): string {
  return encodeURIComponent(filename);
}

/**
 * Build the full image URL for employee profile photos.
 */
export function buildProfileImageUrl(filename: string): string {
  return `https://www.anydomestichelp.com/images/${encodeImageFilename(filename)}`;
}

/**
 * Capitalize the first letter of each word.
 */
export function titleCase(str: string): string {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
