import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [errorFields, setErrorFields] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (username, password, confirmPassword) => {
        setError(null);
        setIsLoading(true);

        const response = await fetch(`${process.env.REACT_APP_API}/api/user/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({username, password, confirmPassword})
        });

        const json = await response.json();

        if(!response.ok){
            console.log(json.error);
            console.log(json.errorFields);
            setIsLoading(false);
            setError(json.error);
            setErrorFields(json.errorFields);
        }
        if(response.ok){
            localStorage.setItem('user', JSON.stringify(json));
            dispatch({type: 'LOGIN', payload: json});
            setIsLoading(false);
        }
    };

    return { signup, error, isLoading, errorFields };
}