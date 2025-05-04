import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

/**
 * Collection of validators and error message generators for Angular form controls.
 *
 * All methods are static so they can be used without instantiating this class,
 * reflecting their pure, stateless nature as utilities.
 */
export class FormValidators {
  /**
   * Returns a list of ValidatorFns for name fields (firstname, lastname):
   * - required: must not be empty
   * - minLength: at least 3 characters
   * - maxLength: no more than 100 characters
   * - noOnlyWhiteSpace: not just whitespace
   */
  static nameValidator(): ValidatorFn[] {
    return [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(100),
      FormValidators.noOnlyWhiteSpace(),
    ];
  }

  /**
   * ValidatorFn that fails if the control value is only whitespace.
   * @param control The form control to validate
   * @returns An object { whitespace: true } on error, or null if valid
   */
  static noOnlyWhiteSpace(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      return value != null && value.trim().length === 0
        ? { whitespace: true }
        : null;
    };
  }

  /**
   * Returns ValidatorFns for email fields:
   * - required: must not be empty
   * - pattern: must match a standard email regex
   */
  static emailValidator(): ValidatorFn[] {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    return [Validators.required, Validators.pattern(emailPattern)];
  }

  /**
   * Returns ValidatorFns for password fields:
   * - required: must not be empty
   * - minLength: at least 10 characters
   * - maxLength: no more than 40 characters
   * - pattern: must include uppercase, lowercase, digit, special char
   */
  static passwordValidator(): ValidatorFn[] {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]).{10,40}$/;

    return [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(40),
      Validators.pattern(passwordPattern),
    ];
  }

  /**
   * Generates a user-friendly error message for name fields based on control errors.
   * @param control The form control containing validation errors
   * @param label A human-readable label for the field (e.g. 'first name')
   * @returns A string describing the first encountered validation error, or '' if none
   */
  static getNameError(control: AbstractControl, label = 'champ'): string {
    if (control.hasError('required')) {
      return `Veuillez renseigner le champ ${label}.`;
    }

    if (control.hasError('minlength')) {
      const req = control.getError('minlength').requiredLength;
      return `Le ${label} doit contenir au minimum ${req} caractères.`;
    }

    if (control.hasError('maxlength')) {
      const req = control.getError('maxlength').requiredLength;
      return `Le ${label} doit contenir au maximum ${req} caractères.`;
    }

    if (control.hasError('whitespace')) {
      return `Le ${label} ne peut pas être vide ou ne contenir que des espaces.`;
    }

    return '';
  }

  /**
   * Generates a user-friendly error message for email fields based on control errors.
   * @param control The form control containing validation errors
   * @returns A string describing the first encountered validation error, or '' if none
   */
  static getEmailError(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Veuillez renseigner une adresse email.';
    }
    if (control.hasError('pattern')) {
      return 'Veuillez entrer une adresse email valide.';
    }
    return '';
  }

  /**
   * Generates a user-friendly error message for password fields based on control errors.
   * @param control The form control containing validation errors
   * @returns A string describing the first encountered validation error, or '' if none
   */
  static getPasswordError(control: AbstractControl): string {
    if (control.hasError('required')) {
      return 'Veuillez renseigner le mot de passe.';
    }
    if (control.hasError('minlength')) {
      const req = control.getError('minlength').requiredLength;
      return `Le mot de passe doit contenir au moins ${req} caractères.`;
    }
    if (control.hasError('maxlength')) {
      const req = control.getError('maxlength').requiredLength;
      return `Le mot de passe ne peut pas dépasser ${req} caractères.`;
    }
    if (control.hasError('pattern')) {
      return 'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial.';
    }
    return '';
  }
}
