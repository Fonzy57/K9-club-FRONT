import { format, parse, parseISO, setDefaultOptions } from "date-fns";
import { fr } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

export class DateUtils {
  static formatDateForBackend(date: Date): string {
    if (!date) return "";

    // Extract UTC components to avoid timezone offsets
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  /* TODO REVOIR TOUT LE SYSTEME DE DATE */

  /* TODO POUR TESTER  */
  /** Parse "yyyy-MM-dd" en Date locale (00:00) */
  static parseLocalDate(s: string): Date {
    return parse(s, "yyyy-MM-dd", new Date());
  }

  /** Format jour-only */
  static formatDay(d: Date): string {
    return format(d, "dd MMM yyyy");
  }

  /** Convertir ISO-UTC en Date locale */
  static toLocalDate(iso: string): Date {
    const utcDate = parseISO(iso);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // ex. "Europe/Paris"
    return toZonedTime(utcDate, tz);
  }

  /** Format timestamp */
  static formatDateTime(d: Date): string {
    return format(d, "dd MMM yyyy, HH:mm");
  }
}
