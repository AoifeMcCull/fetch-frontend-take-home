import { useState, type FormEvent, type ChangeEvent } from "react";
import { authApi } from "../api";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

interface FormErrors {
    name?: string;
    email?: string;
    general?: string;
}

const LoginForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [errors, setErrors] = useState<FormErrors>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validate = (): boolean => {
        const newErrors: FormErrors = {}; //clear errors
        if (!name.trim()) newErrors.name = "Name is required"; //name must have at least one character
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            //email must contain at least one valid character, an @ sign, at least one valid character,a dot, and at least one more valid character.
            //example: i@j.k is considered valid here.
            //a stricter regular expression could be used, but that should probably be handled on the back end at sign-up.
            newErrors.email = "Please enter a valid email";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!validate()) return;

        setIsLoading(true);
        setErrors({});

        try {
            await authApi.login({ name, email });
            navigate("/search");
        } catch (error) {
            setErrors({
                general:
                    error instanceof Error ? error.message : "Login failed",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "name") {
            setName(value);
        } else if (id === "email") {
            setEmail(value);
        }
    };

    return (
        <div className="flex h-dvh items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>
                        Enter your name and email below to log in.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Jane Doe"
                                    value={name}
                                    onChange={handleChange}
                                />
                                {errors.name && (
                                    <p className="text-sm justify-center text-red-500">
                                        {errors.name}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="email">Email</Label>
                                </div>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="foo@bar.com"
                                    value={email}
                                    onChange={handleChange}
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-500">
                                        {errors.email}
                                    </p>
                                )}
                            </div>
                        </div>
                        {errors.general && (
                            <p className="mt-4 text-sm text-red-500">
                                {errors.general}
                            </p>
                        )}
                        <Button
                            type="submit"
                            className="w-full mt-5 bg-violet-600"
                            disabled={isLoading}
                        >
                            {isLoading ? "Logging in..." : "Log in"}
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2"></CardFooter>
            </Card>
        </div>
    );
};

export default LoginForm;
