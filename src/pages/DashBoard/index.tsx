import React, { useEffect } from "react";
import personLogo from "../../assets/happiness.png";
import { PanelRightOpenIcon, Gauge, ShoppingBasket } from "lucide-react";
import VBLogo from "../../assets/medium.png";
import EarthLogo from "../../assets/planet-earth.png";
import { H1ClassName, SmallTextClassName } from "@/utils";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTale } from "@/components/Table/ProductsTable";
import { ProductType } from "@/types/commonTypes";
import { useProducts } from "@/api/queries/useProducts";
import { useBoundStore } from "@/stores";

const columnHelper = createColumnHelper<ProductType>();
const columns = [
    columnHelper.accessor("id", {
        cell: (info) => info.getValue(),
        footer: (info: { column: { id: string } }) => info.column.id,
    }),
    columnHelper.accessor("name", {
        id: "name",
        cell: (info) => <i>{info.getValue()}</i>,
        header: () => <span>Product Name</span>,
    }),
    columnHelper.accessor("category", {
        header: () => "Category",
        cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("price", {
        header: () => <span>Price</span>,
        cell: (info) => <p>${info.getValue()}</p>,
    }),
    columnHelper.accessor("quantity", {
        header: "Quantity",
    }),
    columnHelper.accessor("isActive", {
        header: "Active",
    }),
    columnHelper.accessor("date", {
        header: "Created Date",
        cell: (info) => (
            <p>{new Date(info.getValue()).toLocaleDateString("en-GB")}</p>
        ),
    }),
    columnHelper.accessor("image", {
        header: "thumbnail",
        cell: (info) => <img src={info.getValue()} alt="thumbnail" />,
    }),
];

const DashBoardPage: React.FC = () => {
    const { data, isLoading, isError } = useProducts();
    const setProduct = useBoundStore.use.setProducts();
    const productsData = useBoundStore.use.products();

    useEffect(() => {
        if (data) {
            setProduct(data);
        }
    }, [data]);
    console.log(productsData);
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
                    {isLoading && <p>Loading....</p>}
                    {isError && <p>Error....</p>}

                    {productsData && (
                        <DataTale data={productsData} columns={columns} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashBoardPage;
