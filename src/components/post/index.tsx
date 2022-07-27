import React from 'react';
import clsx from "clsx";
import {Link, useLocation, useNavigate } from "react-router-dom"
import s from "./Post.module.scss"
import {PostSkeleton} from "./PostSkeleton";
import {BiMessageSquare} from "react-icons/bi"
import {GrFormView} from "react-icons/gr"
import {FaUserCircle} from "react-icons/fa"
import {DataState} from "../../types/type";
import {VscChromeClose, VscEdit} from "react-icons/vsc"
import {useDispatch} from "react-redux";
import {fetchRemovePosts} from "../../redux/slices/posts";
import {UserInfo} from "../userInfo";


interface Props {
    post: DataState
    isLoading?: boolean
    isFullPost?: any
    isEditable?: boolean

}

const Post = ({post, isLoading, isFullPost, isEditable}: Props) => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {viewsCount, _id, tags, user} = post

    const path = location.pathname === "/"

    if (isLoading) {
        return <PostSkeleton />;
    }
    const onClickRemove = () => {
        dispatch(fetchRemovePosts(_id))
    };


    return (
        <div className={clsx(s.root, {[s.rootFull]: isFullPost})}>
            {isEditable ? (
                 <div className={s.close}>
                     <button onClick={() => navigate(`/posts/${post._id}/edit`)}>
                         <VscEdit className={s.icons1}/>
                     </button>
                     <button onClick={() => onClickRemove()}>
                         <VscChromeClose className={s.icons2}/>
                     </button>
                 </div>
            ) : null}
            <div className={s.wrapper}>
                <div className={s.userInfo}>
                    <FaUserCircle className={s.userImage}/>
                    <span>
                        <UserInfo {...user} additionalText={post.createdAt}/>
                    </span>
                </div>
                <figure>
                    {post.imageUrl && (
                        <img
                            src={`http://localhost:9000${post.imageUrl}`}
                            className={s.image}
                            alt="Uploaded"
                        />
                    )}
                    <figcaption>
                        <Link to={`/posts/${post._id}`}>
                            <p className={s.link}>{post.title}</p>
                        </Link>
                    </figcaption>
                </figure>

                <div>
                    <p >{path ? post.text.substring(0,200) +  "..." : post.text}</p>
                </div>
                <div>
                    <ul className={s.tags}>
                        {tags.map((name: any) => (
                            <li key={name}>
                                <Link to={`/tag/${name}`}>#{" "}{name}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div>
                    <ul className={s.postDetails}>
                        <li>
                            <GrFormView size="27px"/>
                            <span>{viewsCount}</span>
                        </li>
                        <li>
                            <BiMessageSquare size="21px"/>
                            {post.comments?.length}
                        </li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Post;

