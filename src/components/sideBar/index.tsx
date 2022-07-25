import React from "react";
import s from "./Sidebar.module.scss"
import { motion } from "framer-motion"
import {fadeInUp} from "../../animation";
import clsx from "clsx";

interface SideBarProps {
    title?: string
    children: React.ReactNode
}

export const SideBlock = ({ title, children }: SideBarProps) => {
    return (
        <motion.div variants={fadeInUp} className={clsx(s.root, title === "tags" && s.colorWhite)} >
             {children}
        </motion.div>
    );
};