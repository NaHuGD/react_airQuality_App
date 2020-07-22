import { createMuiTheme } from '@material-ui/core/styles';

declare module '@material-ui/core/styles/createMuiTheme' {
    interface Theme {
        custom: {
        green: string,
        yellow: string,
        orange: string,
        red: string,
        blue: string,
        purple: string,
        };
    }
    // allow configuration using `createMuiTheme`
    interface ThemeOptions {
        custom?: {
        green?: string,
        yellow?: string,
        orange?: string,
        red?: string,
        blue?: string,
        purple?: string,
        };
    }
}

export const theme = createMuiTheme({
    custom: {
        green: '#96ceb4',
        yellow: '#ffeead',
        orange: '#ffad60',
        red: '#d9534f',
        blue: '#2e94b9',
        purple: '#a696c8',
    }
});