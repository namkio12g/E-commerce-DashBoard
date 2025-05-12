import ThemeSwitchButton from "@/components/CutomButtons/ThemeSwitchButton";
import { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

type ThemeContextProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    toggleTheme: (theme: Theme) => void;
};

const initialTheme: ThemeProviderState = {
    theme: "system",
    toggleTheme: () => null,
};

const ThemeContext = createContext<ThemeProviderState>(initialTheme);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export const ThemeProvider = ({
    children,
    defaultTheme = "system",
    storageKey = "cat-theme",
    ...props
}: ThemeContextProps) => {
    const [theme, setTheme] = useState<Theme>(
        () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
    );

    useEffect(() => {
        const root = window.document.documentElement;
        root.removeAttribute("data-theme");
        if (theme === "system") {
            const systemTheme = window.matchMedia("(prefers-color-scheme:dark)")
                .matches
                ? "dark"
                : "light";
            root.setAttribute("data-theme", systemTheme);
            return;
        }
        root.setAttribute("data-theme", theme);
        return;
    }, [theme]);

    const value: ThemeProviderState = {
        theme,
        toggleTheme: (theme: Theme) => {
            localStorage.setItem(storageKey, theme);
            setTheme(theme);
        },
    };
    return (
        <ThemeContext.Provider {...props} value={value}>
            <ThemeSwitchButton />
            {children}
        </ThemeContext.Provider>
    );
};
