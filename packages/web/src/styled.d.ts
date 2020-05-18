import 'styled-components'

interface ColorsTheme {
    [key: string]: string;
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