import React from "react";
import s from "./Sidebar.module.scss"

interface SideBarProps {
    title: string
    children: React.ReactNode
}

export const SideBlock = ({ title, children }: SideBarProps) => {
    return (
        <div className={s.root}>
            <p className={s.title}>
               {title}
            </p>
             {children}
        </div>
    );
};