import React from 'react';
import s from "./Header.module.scss"
import Button from "../button";
import {Link} from "react-router-dom"
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {logout, selectAuth} from "../../redux/slices/auth";
import clsx from "clsx";

const Header = () => {
    const dispatch = useAppDispatch()
    const isAuth = useAppSelector(selectAuth)

    const onClickLogout = () => {
        dispatch(logout())
        window.localStorage.removeItem("token")
    }



    return (
        <>
            <div className={clsx("flex flex-jc-sb flex-ai-c  container",s.header)}>
                <Link className={s.logo} to="/">
                    <div>logo</div>
                </Link>
                <div className={s.buttons}>
                    {isAuth ? (
                        <>
                            <Link to="/add-post">
                                <Button>write new blog</Button>
                            </Link>
                            <Button className={s.buttons} onClick={onClickLogout}>
                               logout
                            </Button>
                        </>
                    ) : (
                        <>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                            <Link to="/register">
                                <button>Registration</button>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Header;