import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { Switch } from "../ui/switch";
import { Moon, Sun } from "lucide-react";

const ThemeSwitchButton: React.FC = () => {
    const value = useTheme();

    return (
        <div className="fixed top-50 left-0 bg-slate-800 p-2 rounded-r-lg z-2 flex flex-col justify-center items-center">
            <div className="relative">
                <Sun
                    className={`${
                        value.theme !== "dark" ? "opacity-100" : "opacity-0"
                    }   absolute text-yellow-500 duration-150 ease-in-out`}
                />
                <Moon
                    className={`${
                        value.theme === "dark" ? "opacity-100" : "opacity-0"
                    }  text-white transition-opacity duration-150 ease-in-out`}
                />
            </div>
            <p className="font-mono text-xs text-white">Night</p>
            <p className="font-mono text-xs text-white">mode</p>
            <div>
                <Switch
                    checked={value.theme === "dark"}
                    onCheckedChange={() => {
                        value.toggleTheme(
                            value.theme === "dark" ? "light" : "dark"
                        );
                    }}
                    className={`data-[state=unchecked]:bg-slate-600 data-[state=checked]:bg-slate-900 text-white    `}
                />
            </div>
        </div>
    );
};

export default ThemeSwitchButton;
