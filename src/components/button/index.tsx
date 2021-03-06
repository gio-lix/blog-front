import React from 'react';

interface ButtonProps {
    children?: React.ReactNode;
    onClick?: () => void;
    className?: string;
}

const Button = ({children,onClick, className}: ButtonProps) => {
    return (
        <button
            type="submit"
            className={className}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;