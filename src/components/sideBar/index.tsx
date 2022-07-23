import React from "react";
import s from "./Sidebar.module.scss"
import { motion } from "framer-motion"
import {fadeInUp} from "../../animation";

interface SideBarProps {
    title?: string
    children: React.ReactNode
}

export const SideBlock = ({ title, children }: SideBarProps) => {
    return (
        <motion.div variants={fadeInUp}
            // variants={fadeInUp}
            className={s.root}>
            <p className={s.title}>
               {title}
            </p>
             {children}
        </motion.div>
    );
};