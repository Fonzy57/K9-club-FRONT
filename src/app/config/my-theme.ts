import { definePreset } from "@primeng/themes";
import Aura from "@primeng/themes/aura";

export const MyPreset = definePreset(Aura, {
  semantic: {
    radius: {
      base: "6px",
      lg: "8px",
    },
    shadow: {
      xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      xxl: "0 25px 50px -12px rgb(0 0 0 / 0.25)",
    },
    colors: {
      global: {
        main: "#15803d",
        text: "#231f20",
        bgLight: "#ffffff",
        bgContent: "#f8f8f8",
        border: "#dddddd",
        ghostActive: "#e8ebeb",
        icon: "#a4a4a4",
        grayOne: "#686868",
        grayTwo: "#afafaf",
        tabHover: "#f5f7f7",
        warning: "#f59e0b",
        success: "#00c247",
        error: "#dc2626",
        information: "#3b82f6",
        black: "#000000",
        white: "#ffffff",
      },
      primary: {
        50: "#f0fdf5",
        100: "#dcfce8",
        200: "#bbf7d1",
        300: "#86efad",
        400: "#4ade81",
        500: "#22c55f",
        600: "#16a34b",
        700: "#15803d", // Basic color
        800: "#166534",
        900: "#14532c",
        950: "#052e14",
      },
      text: {
        50: "#f8f7f8",
        100: "#f0eeee",
        200: "#ded9da",
        300: "#c1b8bb",
        400: "#9f9196",
        500: "#847379",
        600: "#6c5d62",
        700: "#584c50",
        800: "#4b4144",
        900: "#41393b",
        950: "#231f20", // Basic color
      },
      warning: {
        50: "#fff8eb",
        100: "#feeac7",
        200: "#fdd28a",
        300: "#fcbb4d",
        400: "#fbab24",
        500: "#f59e0b", // Basic color
        600: "#d98b06",
        700: "#b47409",
        800: "#92610e",
        900: "#78510f",
        950: "#452c03",
      },
      success: {
        50: "#eefff3",
        100: "#d7ffe5",
        200: "#b2ffcd",
        300: "#76ffa7",
        400: "#33f579",
        500: "#09de56",
        600: "#00c247", // Basic color
        700: "#049139",
        800: "#0a7131",
        900: "#0a5d2b",
        950: "#003415",
      },
      error: {
        50: "#fef2f2",
        100: "#fee2e2",
        200: "#fecaca",
        300: "#fca5a5",
        400: "#f87171",
        500: "#ef4444",
        600: "#dc2626", // Basic color
        700: "#b91c1c",
        800: "#991b1b",
        900: "#7f1d1d",
        950: "#450a0a",
      },
      information: {
        50: "#eff5ff",
        100: "#dbe8fe",
        200: "#bfd7fe",
        300: "#93bbfd",
        400: "#609afa",
        500: "#3b82f6", // Basic color
        600: "#2570eb",
        700: "#1d64d8",
        800: "#1e55af",
        900: "#1e478a",
        950: "#172e54",
      },
    },
  },
  components: {
    /* button: {
      colorScheme: {
        light: {
          root: {
            primary: {
              background: "#ef4",
            },
            secondary: {
              background: "#212121",
            },
          },
        },
      },
    }, */
    select: {
      colorScheme: {
        light: {
          root: {
            background: "{colors.global.white}",
            /* TODO REVOIR COULEUR DISABLED */
            /* disabledBackground: "{form.field.disabled.background}", */
            filledBackground: "{colors.global.white}",
            filledHoverBackground: "{colors.global.white}",
            filledFocusBackground: "{colors.global.white}",
            borderColor: "{colors.global.border}",
            hoverBorderColor: "{colors.global.main}",
            focusBorderColor: "{colors.global.main}",
            invalidBorderColor: "{colors.global.error}",
            color: "{colors.text.950}",
            disabledColor: "{colors.global.grayTwo}",
            placeholderColor: "{colors.global.grayTwo}",
            invalidPlaceholderColor: "{colors.global.grayTwo}",
            shadow: "{shadow.sm}",
            borderRadius: "{radius.base}",
            focusRing: {
              width: "2px",
              style: "solid",
              color: "rgba(21, 128, 61, 0.2)",
            },
          },
          dropdown: {
            color: "{colors.global.icon}",
          },
          overlay: {
            background: "{colors.global.white}",
            borderColor: "{colors.global.border}",
            borderRadius: "{radius.base}",
            shadow: "{shadow.lg}",
          },
          option: {
            selectedBackground: "{colors.primary.100}",
            selectedFocusBackground: "{colors.primary.100}",
          },
          checkmark: {
            color: "{colors.global.main}",
          },
        },
      },
    },
    inputtext: {
      colorScheme: {
        light: {
          root: {
            borderColor: "{colors.global.border}",
            hoverBorderColor: "{colors.global.main}",
            focusBorderColor: "{colors.global.main}",
            focusRing: {
              width: "2px",
              style: "solid",
              color: "rgba(21, 128, 61, 0.2)",
            },
          },
        },
      },
    },
    radiobutton: {
      colorScheme: {
        light: {
          root: {
            background: "{colors.global.white}",
            checkedBackground: "{colors.global.main}",
            checkedHoverBackground: "{colors.primary.500}",
            borderColor: "{colors.global.border}",
            hoverBorderColor: "{colors.global.main}",
            checkedBorderColor: "{colors.global.main}",
            checkedHoverBorderColor: "{colors.primary.500}",
            checkedFocusBorderColor: "{colors.global.main}",
            invalidBorderColor: "{colors.global.error}",
          },
          icon: {
            color: "{colors.global.white}",
          },
        },
      },
    },
    checkbox: {
      colorScheme: {
        light: {
          root: {
            background: "{colors.global.white}",
            checkedBackground: "{colors.global.main}",
            checkedHoverBackground: "{colors.primary.500}",
            borderColor: "{colors.global.border}",
            hoverBorderColor: "{colors.global.main}",
            checkedBorderColor: "{colors.global.main}",
            checkedHoverBorderColor: "{colors.primary.500}",
            checkedFocusBorderColor: "{colors.global.main}",
            invalidBorderColor: "{colors.global.error}",
          },
          icon: {
            color: "{colors.global.white}",
            checkedColor: "{colors.global.white}",
            checkedHoverColor: "{colors.global.white}",
          },
        },
      },
    },
  },
});
