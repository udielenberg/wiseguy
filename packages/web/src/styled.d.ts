import 'styled-components'

interface ColorsTheme {
    primary: string;
    secondary: string;
    complementary: string;
    complementaryYellow: string;
    dark: string;
    light: string;
    superLight: string;
    error2: string;
    error: string;
    success: string;
    white: string;
    black: string;
}

interface FontSizeTheme {
    s: string;
    m: string;
    l: string;
}

interface SpacingTheme {
    mini: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
}

interface Theme {
    colors: ColorsTheme;
    fontSize: FontSizeTheme;
    spacing: SpacingTheme;
}

declare module 'styled-components' {
    export interface DefaultTheme extends Theme {
        colors: ColorsTheme;
        fontSize: FontSizeTheme;
        spacing: SpacingTheme;
    }
}