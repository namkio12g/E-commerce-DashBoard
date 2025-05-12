import React from "react";
import ShoppingBagLogo from "../../assets/shopping-bag.png";
import { H1ClassName, SmallTextClassName } from "@/utils";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import "./index.scss";

const FilterPage: React.FC = () => {
    const handleExpandCategory = (e: React.MouseEvent<HTMLDivElement>) => {
        const target = e.currentTarget;
        const parent = target.parentElement;
        if (parent) {
            const child = parent.querySelector(".item-expansion");
            if (child) {
                child.classList.toggle("active");
            }
        }
    };
    return (
        <div className="all-tasks-container min-w-4/5 flex flex-row  pt-1 px-4 place-content-center">
            <div
                className="left-container w-1/5 pt-10 bg-secondary-bg rounded-lg
            "
            >
                <div className=" w-full px-4">
                    <ul className="menu document-list text-theme-text-primary text-lg font-roboto ">
                        <li className="inline-block mb-4">
                            <div className="flex flex-row h-10 place-items-center place-content-center   border-theme-text-secondary">
                                <input
                                    type="text"
                                    className={`search-box  h-full border-[2px] border-r-0 rounded-l-full
                                        w-full px-3 placeholder:text-theme-text-primary text-theme-text-primary 
                                        text-sm focus-within:border-theme-primary focus:outline-0`}
                                    placeholder={` Searching ...`}
                                />
                                <div className="bg-theme-primary  h-full w-3/10 place-content-center place-items-center rounded-r-full hover:opacity-80 cursor-pointer">
                                    <Search className="h-5 w-5 text-white" />
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="menu-item flex flex-col px-2  font-sans cursor-pointer">
                                <p
                                    className="item-title before:mr-2 before:content-['+'] hover:text-theme-primary"
                                    onClick={handleExpandCategory}
                                >
                                    Categories
                                </p>
                                <div
                                    className={`item-expansion pl-5 flex flex-col gap-2 mt-2 `}
                                >
                                    <p className=" font-sans text-sm hover:text-theme-primary">
                                        - Clothes
                                    </p>
                                    <p className="font-sans text-sm hover:text-theme-primary">
                                        - Electronics
                                    </p>
                                    <p className="font-sans text-sm hover:text-theme-primary">
                                        - Furniture
                                    </p>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="right-container md:w-4/5 xs:w-full p-3   ">
                <div
                    className="top-banner flex flex-row-reverse w-full h-auto bg-theme-primary 
                p-3 rounded-lg mb-6"
                >
                    <div className="right">
                        <img src={ShoppingBagLogo} className="w-ful" alt="" />
                    </div>
                    <div className="left w-4/5 pl-10 pt-10">
                        <h1 className={` ${H1ClassName} text-white`}>
                            Get your Grocery
                        </h1>
                        <h1 className={` ${H1ClassName} text-white`}>
                            Withtin 40 minutes
                        </h1>
                        <p className={` ${SmallTextClassName} text-white mt-6`}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Cumque, quidem!
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

export default FilterPage;
