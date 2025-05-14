import { useBoundStore } from "@/stores";
import React from "react";
import "./index.scss";
import { ProductCartType } from "@/types/commonTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CartCardProps = {
    data: ProductCartType;
};
const CartCard: React.FC<CartCardProps> = ({ data }) => {
    const setQuantity = useBoundStore.use.setProductQuantityInCart();
    const removeProductFromCart = useBoundStore.use.removeProductFromCart();

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value, 10);
        if (value > 0) {
            setQuantity(value, data.id);
        } else {
            removeProductFromCart(data.id);
        }
    };
    const handleRemoveProduct = () => {
        removeProductFromCart(data.id);
    };
    return (
        <>
            <div className="flex flex-row place-items-start h-auto gap-2 border-t-1 border-b-1 py-3 border-foreground/40">
                <img
                    src={data.image}
                    alt=""
                    className="w-2/8 object-fit rounded-lg"
                />
                <div className="product-info flex flex-col place-content-center w-4/8">
                    <p className="product-title text-sm font-semibold line-clamp-2 ">
                        {data.name}
                    </p>
                    <div className="flex flex-row gap-2 text-md font-mono">
                        <span className="inline-block  text-orange-500 ">
                            ${data.price}
                        </span>
                    </div>
                </div>
                <div className=" w-2/8 flex flex-col place-items-center gap-2">
                    <Input
                        type="number"
                        className="w-14 px-3"
                        defaultValue={data.quantityInCart}
                        onChange={handleChangeValue}
                    />
                    <Button
                        className="w-14 text-sm! bg-orange-700 hover:bg-red-400 cursor-pointer"
                        onClick={() => handleRemoveProduct()}
                    >
                        remove
                    </Button>
                </div>
            </div>
        </>
    );
};

const CartContainer: React.FC = () => {
    const isOpen = useBoundStore.use.isCartOpen();
    const onClose = useBoundStore.use.toggleCart();
    const products = useBoundStore.use.productsInCart();

    const total = React.useMemo(() => {
        return products
            .reduce((acc, product) => {
                return acc + product.price * product.quantityInCart;
            }, 0)
            .toFixed(2);
    }, [products]);

    if (!isOpen) return null;
    return (
        <>
            <div className="cart-modal-overlay z-10 absolute w-full h-full bg-black/50 top-0 left-0 place-content-center place-items-center">
                <div
                    className="relative w-full h-full  "
                    onClick={() => onClose(false)}
                >
                    <div
                        className={`cart-div  fixed w-100 h-full  top-0 bg-secondary-bg ${
                            isOpen ? "active" : ""
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-2 h-full">
                            <p className="cart-title text-foreground w-full text-center text-2xl font-bold font-mono">
                                Your cart
                            </p>
                            <div className="card-content h-11/14 overflow-y-scroll border-b-2 border-foreground mb-3">
                                {products?.map((product) => (
                                    <CartCard key={product.id} data={product} />
                                ))}
                            </div>
                            <div className="">
                                <div className="w-full flex justify-between items-center gap-2 mb-2 ">
                                    <p className="font-semibold text-md font-mono">
                                        Current total:
                                    </p>
                                    <p className="font-semibold text-md font-mono text-yellow-500">
                                        ${total}
                                    </p>
                                </div>
                                <Button className="w-full bg-foreground text-background hover:bg-theme-primary hover:text-white cursor-pointer">
                                    {" "}
                                    Create Order
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CartContainer;
