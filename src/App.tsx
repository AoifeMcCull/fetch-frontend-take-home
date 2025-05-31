import { useState } from "react";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./components/ui/card";
import { HashRouter, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import { Button } from "./components/ui/button";
import { Label } from "./components/ui/label";
import { Input } from "./components/ui/input";

function App() {
    return (
        <div className="flex h-dvh items-center justify-center">
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Log in</CardTitle>
                    <CardDescription>
                        Enter your name and email below to login.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="Jane Doe"
                                    required
                                />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="email">Email</Label>
                                </div>
                                <Input
                                    id="name"
                                    type="name"
                                    placeholder="foo@bar.com"
                                    required
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button
                        type="submit"
                        className="w-full"
                        onClick={() => alert("time to work on login")}
                    >
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}

export default App;
