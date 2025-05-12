import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import personLogo from "../../assets/happiness.png";
import { PanelRightOpenIcon, Gauge, ShoppingBasket } from "lucide-react";
import VBLogo from "../../assets/medium.png";
import EarthLogo from "../../assets/planet-earth.png";
import { H1ClassName, SmallTextClassName } from "@/utils";
import ProductCard from "@/components/ProductCard";

const DashBoardPage: React.FC = () => {
    return (
        <div
            className="flex flex-row gap-1 shadow-md rounded-lg 
         p-2 place-content-center"
        >
            <div className="left-container py-5 w-[235px] bg-secondary-bg rounded-lg  md:block xs:hidden">
                <div className=" w-full px-4">
                    <div className="flex flex-row mb-4 place-items-center">
                        <img src={VBLogo} alt="" className="w-1/5 mr-2" />
                        <p className="font-mono text-foreground text-xl font-bold">
                            VisualBoard
                        </p>
                        <PanelRightOpenIcon className="w-6 h-6 text-theme-text-primary ml-2 hover:text-theme-primary cursor-pointer" />
                    </div>
                    <p
                        className={`${SmallTextClassName} font-serif text-gray-300 mb-4 px-2`}
                    >
                        General
                    </p>
                    <ul className=" document-list  text-sm font-roboto ">
                        <li className="">
                            <div
                                className={`flex flex-row place-items-center gap-2 mb-2 px-2 py-2 hover:bg-gray-600/40  hover:text-white cursor-pointer rounded-lg`}
                            >
                                <Gauge className="w-5 h-5 text-theme-text-primary" />
                                <p className="">Dashboard</p>
                            </div>
                        </li>
                        <li className="">
                            <div
                                className={`flex flex-row place-items-center gap-2 px-2  py-2 hover:bg-gray-600/40  hover:text-white cursor-pointer rounded-lg`}
                            >
                                <ShoppingBasket className="w-5 h-5 text-theme-text-primary " />
                                <p>Orders</p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right-container md:w-4/5 xs:w-full p-3 b ">
                <div className="mb-4">
                    <p className="text-lg font-playfair">Good morning,</p>
                    <p className="text-2xl font-bold">Frank Frozen</p>
                </div>
                <div
                    className="top-banner flex flex-row-reverse w-full h-auto bg-admin-primary 
                p-3 rounded-lg mb-6  sm:flex-row-reverse xs:flex-col sm:place-items-start xs:place-content-center xs:place-items-center "
                >
                    <div className="right relative overflow-hidden sm:w-2/5 xs:w-50">
                        <img
                            src={EarthLogo}
                            alt=""
                            className="absolute top-1/2 right-0 "
                        />
                        <img
                            src={personLogo}
                            alt=""
                            className="scale-x-[-1] z-2"
                        />
                    </div>
                    <div className="left w-full pl-10 pt-10">
                        <h1
                            className={` text-4xl font-bold text-white font-playfair`}
                        >
                            Here's what's in your
                            <br />
                            sales last week
                        </h1>
                        <p className={` ${H1ClassName} text-white mt-6`}>
                            $ 8,000.00
                        </p>
                    </div>
                </div>
                <div className="product-content">
                    <div className="grid grid-cols-3 gap-3">
                        <ProductCard url="https://images.pexels.com/photos/335257/pexels-photo-335257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <ProductCard url="https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                        <ProductCard url="https://images.pexels.com/photos/391733/pexels-photo-391733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashBoardPage;
