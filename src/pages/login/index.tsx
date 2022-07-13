import React from 'react';
import s from "./Login.module.scss"
import Button from "../../components/button";
import Sign from "../../components/sign";
import {useForm} from "react-hook-form";
import {Navigate} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchUserData, selectAuth} from "../../redux/slices/auth";


interface FormProps {
    email: string;
    password: string;
}



const Login = () => {
    const isAuth = useAppSelector(selectAuth)


    const dispatch = useAppDispatch()
    const {register,  handleSubmit, formState: {errors}} = useForm<FormProps>({
        mode: "onChange"
    })
    const onSubmit = async (values: any) => {
       const {payload} = await dispatch(fetchUserData(values))

        if (!payload) {
            return
        }

        if ("token" in payload) {
            window.localStorage.setItem("token", payload.token)
        }
    };

    if (isAuth) {
        return <Navigate to={'/'} />
    }

    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            {!isAuth && (
                <Sign>
                    <label>
                        login
                    </label>
                    { errors.email?.message}
                    <input
                        type="email"
                        placeholder="E-Mail"
                        {...register("email", {required: "Please write the email"}) }
                    />
                    {errors.password?.message}
                    <input
                        type="password"
                        {...register("password", {required: "Please write the password"}) }
                        placeholder="Password"
                    />
                    <Button  className={s.button}>
                        Sign in
                    </Button>
                </Sign>
            )}
        </form>
    );
};

export default Login;