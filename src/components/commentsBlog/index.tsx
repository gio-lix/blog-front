import React, {memo} from 'react';
import {SideBlock} from "../sideBar";
import s from "./CommentBlogs.module.scss"
import {CommentsState} from "../../types/type";
import {AiOutlineUserAdd} from "react-icons/ai"
import { useParams, useLocation } from "react-router-dom"
import clsx from "clsx";
import { motion } from "framer-motion"
import {fadeInUp} from "../../animation";


interface Props {
    item?: CommentsState[]
    children?: React.ReactNode
    isLoading?: boolean
}

const CommentsBlock = ({ item, children, isLoading = true }: Props) => {
    const {id} = useParams()
    const {pathname} = useLocation()

    const path = pathname === `/posts/${id}`


    return (
        <SideBlock  >
                {(isLoading ? [...Array(5)] : item)?.map((obj: CommentsState, index: number) => {
                    return (
                        <motion.div variants={fadeInUp} id={obj._id} key={index} className={s.root}>
                            <div>
                                <AiOutlineUserAdd className={clsx(path ? s.icon : s.pathIcon)} />
                            </div>
                            <div>
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
                                    <div  className={clsx(path ? s.commentsBox : s.commentsBoxPath)}>
                                        <p>
                                            {obj.user.fullName}
                                        </p>
                                        <p>
                                            {obj.text}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </motion.div>)
                })}
            {children}
        </SideBlock>
    );
};
export default memo(CommentsBlock);