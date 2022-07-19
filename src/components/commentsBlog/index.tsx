import React from 'react';
import {SideBlock} from "../sideBar";
import s from "./CommentBlogs.module.scss"
import {CommentsState} from "../../types/type";
import {AiOutlineUserAdd} from "react-icons/ai"


interface Props {
    item?: CommentsState[]
    children?: React.ReactNode
    isLoading?: boolean
}

export const CommentsBlock = ({ item, children, isLoading = true }: Props) => {

    return (
        <SideBlock  title="Comments">
                {(isLoading ? [...Array(5)] : item)?.map((obj: CommentsState, index: number) => {
                    return (
                        <article key={index} className={s.root}>
                            <div>
                                <AiOutlineUserAdd className={s.icon} />
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