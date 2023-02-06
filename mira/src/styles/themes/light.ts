import { breakpoints } from "../../constants";
import { DefaultTheme } from "styled-components";

export const light: DefaultTheme = {
    title: 'light',
    colors: {
        primary: '#1C0C5B',
        secondary: '#916bbf80',
        tertiary: '#504382',
        background: '#dad4f180',
        menu: '#53565d',
        menuLight: 'hsla(0,0%,80%,.29)',
        menuItem: 'hsla(0,0%,100%,.25)',
        text: '#333',
        lightText: "#f0f8ff",
    },
    boxShadow: '0 6px 10px 0 rgb(27 28 30 / 31%)',
    headerShadow: '0 0 25px 5px #504382',
    font: {
        size: {
            xSmall: '10px',
            small: '12px',
            medium: '14px',
            large: '18px',
            xLarge: '22px',
        },
        family: "'Inter', Arial, Helvetica",
        weight: {
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700,
        },
    },
    borderRadius: {
        card: '5px',
        button: '5px',
        addButton: '50%',
        searchBar: '8px',
    },
    device: {
        mobile: (mediaQueryType = 'max-width') => 
            `@media screen and (${mediaQueryType}: ${breakpoints.sm})`,
        tablet: (mediaQueryType = 'max-width') => 
            `@media screen and (${mediaQueryType}: ${breakpoints.md})`,
        desktop: (mediaQueryType = 'max-width') => 
            `@media screen and (${mediaQueryType}: ${breakpoints.lg})`,
        ultrawide: (mediaQueryType = 'max-width') => 
            `@media screen and (${mediaQueryType}: ${breakpoints.xxl})`,
    }
}