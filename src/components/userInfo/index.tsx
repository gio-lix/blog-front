import React from 'react';
import s from "./UserInfo.module.scss"
import {UserProps} from "../../types/type";


interface UserInfoProps extends UserProps {
    additionalText: any
}

export const UserInfo = ({ avatarUrl, fullName, additionalText }: UserInfoProps) => {
    return (
        <div className={s.root}>

            {/*<img className={s.avatar} src={avatarUrl || '/noavatar.png'} alt={fullName} />*/}
            <div className={s.userDetails}>
                <span className={s.userName}>{fullName}</span>
                <span className={s.additional}>{additionalText}</span>
            </div>
        </div>
    );
};