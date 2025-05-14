import React, { useEffect, useRef } from "react";
import ShoppingBagLogo from "../../assets/shopping-bag.png";
import { H1ClassName, SmallTextClassName } from "@/utils";
import { useSearchParams, useParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import "./index.scss";
import { useBoundStore } from "@/stores";
import { useProducts } from "@/api/queries/useProducts";
import CartContainer from "@/components/cart";

const FilterPage: React.FC = () => {
    const { category } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const keywords = searchParams.get("keywords") || "";

    const { data, isLoading, isError } = useProducts(
        category ? `category=${category}` : ""
    );
    const setProduct = useBoundStore.use.setProducts();
    const productsData = useBoundStore.use.products();

    const searchRef = useRef<HTMLInputElement>(null);

    const dataFiltered = React.useMemo(() => {
        if (keywords === "") return productsData;
        return productsData.filter((item) =>
            item.name.toLowerCase().includes(keywords.toLowerCase())
        );
    }, [keywords, productsData]);

    const handleSetKeyWords = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setSearchParams((prev) => {
                const params = new URLSearchParams(prev);
                if (searchRef.current?.value) {
                    params.set("keywords", searchRef.current.value || "");
                } else {
                    params.delete("keywords");
                }
                return params;
            });
            setTimeout(() => {
                window.location.reload();
            }, 0);
        }
    };

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);

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
        <>
            <CartContainer />
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
                                        onKeyDown={handleSetKeyWords}
                                        defaultValue={keywords}
                                        ref={searchRef}
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
                                        <Link
                                            className=" font-sans text-sm hover:text-theme-primary"
                                            to={"/clothes"}
                                        >
                                            - Clothes
                                        </Link>
                                        <Link
                                            className="font-sans text-sm hover:text-theme-primary"
                                            to={"/electronics"}
                                        >
                                            - Electronics
                                        </Link>
                                        <Link
                                            className="font-sans text-sm hover:text-theme-primary"
                                            to={"/furniture"}
                                        >
                                            - Furniture
                                        </Link>
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
                            <img
                                src={ShoppingBagLogo}
                                className="w-ful"
                                alt=""
                            />
                        </div>
                        <div className="left w-4/5 pl-10 pt-10">
                            <h1 className={` ${H1ClassName} text-white`}>
                                Get your Grocery
                            </h1>
                            <h1 className={` ${H1ClassName} text-white`}>
                                Withtin 40 minutes
                            </h1>
                            <p
                                className={` ${SmallTextClassName} text-white mt-6`}
                            >
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Cumque, quidem!
                            </p>
                        </div>
                    </div>
                    <div className="product-content">
                        {isLoading && (
                            <div className="flex justify-center items-center">
                                <div className="spinner"></div>
                            </div>
                        )}
                        {isError && (
                            <div className="flex justify-center items-center">
                                <div className="spinner"></div>
                            </div>
                        )}
                        {dataFiltered && (
                            <div className="grid grid-cols-3 gap-3">
                                {dataFiltered?.map((product) => (
                                    <ProductCard
                                        key={product.id}
                                        data={product}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterPage;
