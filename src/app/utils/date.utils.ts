export class DateUtils {
  /**
   * Convertit une Date JavaScript au format LocalDate Java (YYYY-MM-DD)
   */
  static toLocalDateString(date: Date): string {
    return date.toISOString().split("T")[0];
  }
}
