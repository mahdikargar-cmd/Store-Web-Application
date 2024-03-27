import React, { useState } from "react";

export const LoginSignup = () => {
    const [state, setState] = useState("Login");
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        email: "",
    });

    const changeHandler = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const Login = async () => {
        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`Login request failed with status ${response.status}`);
            }

            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            }
        } catch (error) {
            alert(`Login error: ${error}`);
        }
    }

    const SignUp = async () => {
        try {
            const response = await fetch('http://localhost:5000/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Signup request failed");
            }

            const responseData = await response.json();

            if (responseData.success) {
                localStorage.setItem('auth-token', responseData.token);
                window.location.replace("/");
            } else {
                alert(responseData.errors || responseData.message || "An error occurred during signup.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            alert("An error occurred during signup.");
        }
    };

    return (
        <div className="loginsignup w-full h-screen bg-[#fce3fe] pt-10">
            <div className="loginsignup-container max-w-[500px] bg-white m-auto py-2 px-8">
                <h1 className="text-[20px] font-semibold mb-10">{state}</h1>
                <div className="loginsignup-fields flex flex-col gap-5">
                    {state === "Sign Up" && (
                        <input
                            name="username"
                            value={formData.username}
                            onChange={changeHandler}
                            className="h-12 pl-4 outline-none text-[#5c5c5c] text-lg"
                            type="text"
                            placeholder="Your name"
                        />
                    )}
                    <input
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        className="h-12 pl-4 outline-none text-[#5c5c5c] text-lg"
                        type="email"
                        placeholder="Email Address"
                    />
                    <input
                        name="password"
                        value={formData.password}
                        onChange={changeHandler}
                        className="h-12 pl-4 outline-none text-[#5c5c5c] text-lg"
                        type="password"
                        placeholder="Password"
                    />
                </div>
                <button
                    onClick={() => {
                        state === "Login" ? Login() : SignUp()
                    }}
                    className="w-full h-12 text-white bg-[#ff4141] mt-5 text-lg font-semibold border-none cursor-pointer"
                >
                    Continue
                </button>
                <p className="mt-5 text-[#5c5c5c] text-lg font-semibold">
                    {state === "Sign Up" ? "Already have an account?" : "Create an account?"}
                    <span
                        className="text-[#ff4141] cursor-pointer font-semibold"
                        onClick={() => {
                            setState(state === "Login" ? "Sign Up" : "Login");
                        }}
                    >
                        {state === "Sign Up" ? " Login here" : " Click here"}
                    </span>
                </p>
                <div className="loginsignup-agree flex items-center mt-5 gap-3 text-[#5c5c5c] text-lg font-semibold">
                    <input type="checkbox" id="agree" className="mr-2"/>
                    <label htmlFor="agree">By continuing, I agree to the terms of use & policy</label>
                </div>
            </div>
        </div>
    );
}

