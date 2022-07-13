import React from 'react';
import Sign from "../../components/sign";
import Button from "../../components/button";
import s from "../login/Login.module.scss";
import {useForm} from "react-hook-form";
import {fetchRegister, fetchUserData, selectAuth} from "../../redux/slices/auth";
import {Navigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";

interface FormProps {
    fullName: string
    email: string;
    password: string;
}


const Registration = () => {
    const isAuth = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()

    const {register,  handleSubmit, formState: {errors, isValid}} = useForm<FormProps>({
        defaultValues: {
            fullName: "rebecca",
            email: "rebecca@gail.com",
            password: '112345'
        },
        mode: "onChange"
    })

    const onSubmit = async (values: any) => {
        const {payload} = await dispatch(fetchRegister(values))
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
            <Sign>
                <label>
                    Registration
                </label>
                { errors.fullName?.message}
                <input
                    type="text"
                    {...register("fullName", {required: "Please write the fullName"}) }
                    placeholder='FullName'
                />
                { errors.email?.message}
                <input
                    type="email"
                    {...register("email", {required: "Please write the email"}) }
                    placeholder="E-Mail"
                />
                { errors.password?.message}
                <input
                    type="password"
                    {...register("password", {required: "Please write the password"}) }
                    placeholder="Password"
                />
                <Button className={s.button}>
                    Sign up
                </Button>
            </Sign>
        </form>

    );
};

export default Registration;