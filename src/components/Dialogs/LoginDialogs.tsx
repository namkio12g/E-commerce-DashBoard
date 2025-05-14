import React, { use, useRef, useState } from "react";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { LogInIcon } from "lucide-react";
import { loginQuery } from "@/api/queries/useLogin";
import { toast } from "sonner";
import { useBoundStore } from "@/stores";

type LoginInfoType = {
    email: string;
    password: string;
};
export const LoginDialog: React.FC = () => {
    const [open, setOpen] = useState(false);
    const setUserProfile = useBoundStore.use.Login();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({});

    const onSubmit = (data: any) => {
        loginQuery(data.email, data.password)
            .then((res) => {
                if (res) {
                    setUserProfile(res);
                    toast.success("Login success", {
                        description: "Welcome to the MightShops",
                        action: {
                            label: "cancel",
                            onClick: () => {
                                toast.dismiss();
                            },
                        },
                    });
                } else
                    toast.error("Login failed", {
                        description: "Invalid email or password",
                        action: {
                            label: "cancel",
                            onClick: () => {
                                toast.dismiss();
                            },
                        },
                    });
                setOpen(false);
            })
            .catch(() => {});
    };

    return (
        <div className="dialog-wrapper">
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <LogInIcon onClick={() => setOpen(true)} />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] bg-secondary-bg">
                    <DialogHeader>
                        <DialogTitle>Sign in</DialogTitle>
                        <DialogDescription>
                            Enter your email and password to sign in. Click sign
                            in to access your account.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Email
                                </Label>
                                <Input
                                    {...register("email")}
                                    id="email"
                                    placeholder="example@example.com"
                                    className="col-span-3"
                                    type="email"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="password"
                                    className="text-right"
                                >
                                    Password
                                </Label>
                                <Input
                                    {...register("password")}
                                    id="password"
                                    placeholder="*******"
                                    type="password"
                                    className="col-span-3"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button
                                type="submit"
                                className="bg-foreground hover:bg-gray-600 cursor-pointer text-background"
                            >
                                Sign in
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};
