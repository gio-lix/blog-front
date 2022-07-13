import React from 'react';
import s from "./Sign.module.scss"

interface SignProps {
    children: React.ReactNode
}

const Sign = ({children}: SignProps) => {
    return (
        <div className={s.root}>
            {children}
        </div>
    );
};

export default Sign;