/** A object of all CSS variables determined by the current theme. */
export interface ThemeVars {
    "--foreground": string;
    "--background": string;
    "--feature-foreground": string;
    "--tooltip-background": string;
    "--raised-background": string;
    "--points": string;
    "--locked": string;
    "--highlighted": string;
    "--bought": string;
    "--danger": string;
    "--link": string;
    "--outline": string;
    "--accent1": string;
    "--accent2": string;
    "--accent3": string;
    "--border-radius": string;
    "--modal-border": string;
    "--feature-margin": string;
}

/** An object representing a theme the player can use to change the look of the game. */
export interface Theme {
    /** The values of the theme's CSS variables. */
    variables: ThemeVars;
    /** Whether or not tabs should "float" in the center of their container. */
    floatingTabs: boolean;
    /** Whether or not adjacent features should merge together - removing the margin between them, and only applying the border radius to the first and last elements in the row or column. */
    mergeAdjacent: boolean;
    /** Whether or not to show a pin icon on pinned tooltips. */
    showPin: boolean;
}

declare module "@vue/runtime-dom" {
    /** Make CSS properties accept any CSS variables usually controlled by a theme. */
    // eslint-disable-next-line @typescript-eslint/no-empty-interface
    interface CSSProperties extends Partial<ThemeVars> {}

    interface HTMLAttributes {
        style?: StyleValue;
    }
}

const defaultTheme: Theme = {
    variables: {
        "--foreground": "#dfdfdf",
        "--background": "#0f0f0f",
        "--feature-foreground": "#0f0f0f",
        "--tooltip-background": "rgba(0, 0, 0, 0.75)",
        "--raised-background": "#1f1f1f",
        "--points": "#ffffff",
        "--locked": "#bf8f8f",
        "--highlighted": "#333",
        "--bought": "#77bf5f",
        "--danger": "rgb(220, 53, 69)",
        "--link": "#02f2f2",
        "--outline": "#dfdfdf",
        "--accent1": "#627a82",
        "--accent2": "#658262",
        "--accent3": "#7c6282",

        "--border-radius": "0px",
        "--modal-border": "solid 2px var(--color)",
        "--feature-margin": "0px"
    },
    floatingTabs: true,
    mergeAdjacent: true,
    showPin: true
};

/** An enum of all available themes and their internal IDs. The keys are their display names. */
export enum Themes {
    Classic = "classic"
}

/** A dictionary of all available themes. */
export default {
    classic: defaultTheme
} as Record<Themes, Theme>;
