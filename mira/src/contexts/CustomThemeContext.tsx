import { createContext, ReactNode } from 'react';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { light } from '../styles/themes/light';
import { dark } from '../styles/themes/dark';
import usePersistedState from '../hooks/usePersistedState';

interface CustomThemeContextTypes{
    theme: DefaultTheme;
    toggleTheme: () => void; 
}

interface CustomThemeProviderProps{
    children: ReactNode
}

export const CustomThemeContext = createContext({} as CustomThemeContextTypes);

export const CustomThemeProvider = ({ children }: CustomThemeProviderProps) => {
    const [ theme, setTheme] = usePersistedState<DefaultTheme>('theme', light)

    const toggleTheme = () => {
        setTheme( theme.title === 'light'? dark : light)
    }

    return(
        <CustomThemeContext.Provider value={{ theme, toggleTheme }}>
            <ThemeProvider theme={theme.title === 'light'? light : dark}>
                {children}
            </ThemeProvider>
        </CustomThemeContext.Provider>
    )
}