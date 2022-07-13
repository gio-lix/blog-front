import React from 'react';
import {SideBlock} from "../sideBar";
import s from "./CommentBlogs.module.scss"
import {UserProps} from "../../types/type";

interface StateProps {
    text: string
    user: UserProps
}

interface Props {
    item?: StateProps[]
    children?: React.ReactNode
    isLoading?: boolean
}

export const CommentsBlock = ({ item, children, isLoading = true }: Props) => {

    return (
        <SideBlock  title="Comments">
                {(isLoading ? [...Array(5)] : item)?.map((obj: StateProps, index: number) => {
                    return (
                        <article key={index} className={s.root}>
                            <div>
                                <img src={obj.user.avatarUrl} alt="alt" className={s.img}/>
                            </div>
                            <div >
                                <p>
                                    {isLoading ? (
                                        <>
                                            {/*<Skeleton variant="circular" width={40} height={40} />*/}
                                        </>
                                    ) : (
                                        <>
                                            {/*<Avatar alt={obj.user.fullName} src={obj.user.avatarUrl} />*/}
                                        </>
                                    )}
                                </p>
                                {isLoading ? (
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        {/*<Skeleton variant="text" height={25} width={120} />*/}
                                        {/*<Skeleton variant="text" height={18} width={230} />*/}
                                    </div>
                                ) : (
                                    <div  className={s.commentsBox}>
                                        <p>
                                            {obj.user.fullName}
                                        </p>
                                        <p>
                                            {obj.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </article>)
                })}
            {children}
        </SideBlock>
    );
};