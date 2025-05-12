import React from "react";
import { Routes, Route, BrowserRouter } from "react-router";
import NavBar from "./containers/NavBar/NavBar";
import FilterPage from "./pages/FilterPage";
import DashBoardPage from "./pages/DashBoard";
import { ThemeProvider } from "./contexts/ThemeContext";

function App() {
    const UseNavBar = ({ children }: { children: React.ReactNode }) => {
        return (
            <div className="root-container relative w-full min-h-screen h-full place-items-center">
                <NavBar />
                <div className="content-container px-10    w-full place-items-center">
                    {children}
                </div>
            </div>
        );
    };

    return (
        <>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <UseNavBar>
                                    <FilterPage />
                                </UseNavBar>
                            }
                        />
                        <Route path="/dash-board" element={<DashBoardPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </>
    );
}

export default App;
