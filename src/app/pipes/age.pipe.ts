import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe Angular pur pour calculer l’âge à partir d’une date de naissance.
 * - Si l’âge < 1 an, renvoie en mois : "X mois"
 * - Sinon renvoie en années : "Y an" ou "Y ans"
 */
@Pipe({
  name: 'age', // nom du pipe utilisé dans le template : {{ date | age }}
  standalone: true, // pipe standalone disponible sans module
  pure: true, // recalcul uniquement si l’input change
})
export class AgePipe implements PipeTransform {
  /**
   * Transforme une date de naissance (string ou Date) en chaîne lisible.
   * @param birthDate – date de naissance
   * @returns "0 mois", "X mois", "1 an" ou "Y ans"
   */
  transform(birthDate: string | Date, ...args: unknown[]): string {
    // 1. Conversion vers objet Date
    const birth = new Date(birthDate);
    const now = new Date();

    // 2. Calcul du nombre total de mois écoulés
    let months =
      (now.getFullYear() - birth.getFullYear()) * 12 +
      (now.getMonth() - birth.getMonth());

    // 3. Ajustement si on n’a pas encore atteint le jour d’anniversaire dans le mois courant
    if (now.getDate() < birth.getDate()) {
      months--;
    }

    // 4. Cas croissance négative (date future ou même mois non encore atteint)
    if (months < 0) {
      return '0 mois';
    }

    // 5. Moins d’un an : on affiche en mois
    if (months < 12) {
      return `${months} mois`;
    }

    // 6. Sinon, on convertit en années
    const years = Math.floor(months / 12);
    // 6a. Forme singulier/pluriel
    return `${years} ${years > 1 ? 'ans' : 'an'}`;
  }
}
