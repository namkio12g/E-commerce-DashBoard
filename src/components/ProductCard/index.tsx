import React from "react";
import { Star, ShoppingBag, HeartPlus } from "lucide-react";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ClickCommonClassName } from "@/utils";
import { ProductCartType, ProductType } from "@/types/commonTypes";
import { useBoundStore } from "@/stores";
import { toast } from "sonner";

interface Props {
    data: ProductType;
}

const ProductCard: React.FC<Props> = ({ data }) => {
    const addToCart = useBoundStore.use.addProductToCart();

    const handleAddToCart = (data: ProductCartType) => {
        addToCart(data);
        toast.success("Product added to cart", {
            duration: 1000,
            action: {
                label: "cancel",
                onClick: () => {
                    toast.dismiss();
                },
            },
        });
    };

    return (
        <Card className="h-auto p-2 rounded-lg border-none gap-1 bg-secondary-bg ">
            <CardHeader className="relative p-0 m-0 ">
                <div className="fit-content relative group cursor-pointer">
                    <img
                        src={data.image}
                        alt=""
                        className=" w-full  h-[160px] object-fit rounded-lg"
                    />
                    <div className="absolute place-content-center place-items-center gap-2 inset-0 backdrop-blur-xs rounded-lg hidden group-hover:flex ">
                        <button
                            className={`rounded-lg h-fit p-2 bg-background ${ClickCommonClassName}`}
                        >
                            <HeartPlus className=" w-6 h-6 " />
                        </button>
                        <button
                            className={`rounded-lg p-2 bg-background ${ClickCommonClassName}`}
                            onClick={() => handleAddToCart(data)}
                        >
                            <ShoppingBag className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <CardTitle className="text-md font-roboto font-bold line-clamp-1 mb-3 text-foreground">
                    {data.name}
                    <p className="text-xs text-foreground/50 line-clamp-2">
                        {data.description}
                    </p>
                </CardTitle>
                <CardDescription className="text-sm">
                    <div className="flex flex-row items-center">
                        <p className="font-semibold">4.0</p>
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                        <Star className="w-4 h-4 text-yellow-500 ml-1 fill-yellow-500" />
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-theme-text-secondary font-playfair font-bold">
                            Price
                        </span>
                        <span className=" font-mono font-bold ml-2 text-foreground">
                            $ {data.price}
                        </span>
                    </div>
                    <div className="flex flex-row justify-between items-center">
                        <span className="text-theme-text-secondary font-playfair font-bold">
                            Quantity
                        </span>
                        <span className=" font-mono font-bold ml-2 text-foreground">
                            {data.quantity}
                        </span>
                    </div>
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center"></CardFooter>
        </Card>
    );
};

export default ProductCard;
