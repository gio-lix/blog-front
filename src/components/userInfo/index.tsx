import React from 'react';
import s from "./UserInfo.module.scss"
import {UserProps} from "../../types/type";
import {parseISO, formatDistanceToNow} from "date-fns"

const TimeAgo = ({timeStep}: any) => {
    let timeAgo = ""
    if (timeStep) {
        const date = parseISO(timeStep)
        const timePeriod = formatDistanceToNow(date)
        timeAgo = `${timePeriod} ago`
    }
    return (
        <div> {timeAgo} </div>
    )
}

interface UserInfoProps extends UserProps {
    additionalText: any
}

export const UserInfo = ({ avatarUrl, fullName, additionalText }: UserInfoProps) => {
    return (
        <div className={s.root}>
            <div className={s.userDetails}>
                <span className={s.userName}>{fullName}</span>
                <span className={s.additional}>
                    <TimeAgo timeStep={additionalText}/>
                </span>
            </div>
        </div>
    );
};