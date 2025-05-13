import { useBoundStore } from "@/stores";
import React from "react";
import "./index.scss";
import { ProductCartType } from "@/types/commonTypes";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type CartCardProps = {
    // data: ProductCartType;
    // handleRemoveFromCart: (id: string) => void;
    // handleIncrement: (id: string) => void;
    // handleDecrement: (id: string) => void;
    url: string;
};
const CartCard: React.FC<CartCardProps> = ({ url }) => {
    return (
        <>
            <div className="flex flex-row place-items-start h-auto gap-2 border-t-1 border-b-1 py-3 border-foreground/40">
                <img src={url} alt="" className="w-2/8 object-fit rounded-lg" />
                <div className="product-info flex flex-col place-content-center w-4/8">
                    <p className="product-title text-sm font-semibold line-clamp-2 ">
                        My Product Lorem ipsum dolor, sit amet consectetur
                        adipisicing elit. Consequuntur quos est, ut magnam
                        dolore eaque voluptatem maxime accusantium ullam
                        dignissimos dolor exercitationem corporis pariatur
                        repellendus quasi distinctio iste adipisci aspernatur.
                    </p>
                    <div className="flex flex-row gap-2 text-md font-mono">
                        <span className="inline-block  text-orange-500 ">
                            $40.0
                        </span>
                    </div>
                </div>
                <div className=" w-2/8 flex flex-col place-items-center gap-2">
                    <Input
                        type="number"
                        className="w-14 px-3"
                        min={1}
                        defaultValue={1}
                    />
                    <Button className="w-14 text-sm! bg-orange-700 hover:bg-red-400 cursor-pointer">
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
    console.log(isOpen);

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
                                <CartCard url="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                <CartCard url="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                <CartCard url="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                                <CartCard url="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />

                                <CartCard url="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                            </div>
                            <div className="">
                                <div className="w-full flex justify-between items-center gap-2 mb-2 ">
                                    <p className="font-semibold text-md font-mono">
                                        Current total:
                                    </p>
                                    <p className="font-semibold text-md font-mono text-yellow-500">
                                        $10,000
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
