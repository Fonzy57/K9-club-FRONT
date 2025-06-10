/**
 * Utility class for formatting and parsing dates between
 * JavaScript Date objects and backend-friendly string formats.
 */
export class DateUtils {
  /**
   * Formats a JavaScript Date as a backend-compatible string (YYYY-MM-DD).
   * Returns an empty string if the input is falsy.
   *
   * @param date - The Date object to format.
   * @returns A string in the format "YYYY-MM-DD", or "" if date is invalid.
   */
  static formatDateForBackend(date: Date): string {
    if (!date) return "";

    // Extract UTC components to avoid timezone offsets
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /**
   * Parses a date string in "YYYY-MM-DD" format into a local Date object.
   * Returns null if the input string is falsy.
   *
   * @param dateString - The date string to parse.
   * @returns A Date object representing the local date, or null if input is empty.
   */
  static parseDate(dateString: string): Date | null {
    if (!dateString) return null;

    // Split into components and convert to numbers
    const [year, month, day] = dateString.split("-").map(Number);

    // month - 1 because JS Date months are zero-based (0 = January)
    return new Date(year, month - 1, day);
  }
}
