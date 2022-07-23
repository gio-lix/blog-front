import React, {useCallback, useEffect, useRef, useState} from 'react';
import s from "./Home.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {classNames} from "../../utlis/classes";
import Post from "../../components/post";
import {fetchPosts, fetchTags} from "../../redux/slices/posts";
import 'react-loading-skeleton/dist/skeleton.css'
import {PostSkeleton} from "../../components/post/PostSkeleton";
import {CommentsState, DataState} from "../../types/type";
import CommentsBlock from "../../components/commentsBlog";
import axios from "../../axios";
import clsx from "clsx";
import {motion} from 'framer-motion';
import {stagger} from "../../animation";




const HomePage = () => {
    const dispatch = useAppDispatch()
    const {posts, tags} = useAppSelector((state: RootState) => state.posts)
    const userData = useAppSelector((state: RootState) => state.auth.data)
    const [nav, setNav] = useState(0)
    const [openComments, setOpenComments] = useState<boolean>(false)
    const [openTags, setOpenTags] = useState<boolean>(false)
    const [allPosts, setAllPosts] = useState<DataState[]>([])
    const [allComments, setAllComments] = useState<CommentsState[]>([])
    const [postId, setPostId] = useState<string>()

    const scrollRef = useRef<any | null>(null)

    useEffect(() => {
        setAllPosts(posts.items)
    }, [posts])


    const isPostLoading = posts.status === "loading"
    // const isTagLoading = tags.status === "loading"


    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [dispatch])


    const navigation = useCallback((num: number) => {
        if (num === 0) {
            setNav(0)
            setAllPosts(posts.items)
        } else {
            setNav(1)
            setAllPosts([...allPosts]?.sort((a, b) => b.viewsCount - a.viewsCount))
        }
    }, [allPosts, posts.items])




    useEffect(() => {
        axios.get(`/posts/${postId}/comment`)
            .then(({data}) => {
                setAllComments(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [allPosts , postId])




    const options = {
        root: document.querySelector('.scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
    }





    const callBack = useCallback((entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                console.log("entry.target.id - - ", entry.target.id)
                setPostId(entry.target.id)
            }
        })
    }, [scrollRef,options])


    let observer = new IntersectionObserver(callBack,options )

    useEffect(() => {
        [...scrollRef.current.children].forEach(el => {
            observer.observe(el)
        })
    }, [scrollRef,options])



    return (
        <main className="container">
            {/*  navigation  */}
            <div className={s.home_article}>
                <p
                    onClick={() => navigation(0)}
                    className={classNames(nav === 0 ? s.choice : "")}
                >
                    new
                </p>
                <p
                    onClick={() => navigation(1)}
                    className={classNames(nav === 1 ? s.choice : "")}
                >
                    popular
                </p>
            </div>

            <div  className={s.home_grid}>
                <div ref={scrollRef} className={s.cart} >
                    {isPostLoading
                        ? [...Array(5)].map((e, i: number) => <PostSkeleton image={false} key={i}/>)
                        : allPosts?.map((post: DataState, index: number) => {
                            return (
                                <div className=".scrollArea" id={post._id} key={post._id}>
                                     <Post
                                         post={post}
                                         isLoading={false}
                                         isFullPost={false}
                                         isEditable={userData?._id === post.user._id}
                                     />
                                </div>
                            )
                        })}
                </div>
                <div className={s.info}>
                    <aside className={s.tagsClass}>
                        <div  className={clsx( openTags ? s.tagsToggleOpen : s.tagsToggleClose)}
                        >
                            <p onClick={() => setOpenTags(!openTags)}>Tags</p>
                            {openTags ? (
                                <>
                                </>
                                // <TagsBlock items={tags.items} isLoading={isTagLoading}/>
                            ) : null}
                        </div>
                    </aside>

                    <div  className={clsx(s.commentBox, openTags ? s.commentTop : "")}>
                        <div className={clsx(openComments ? s.commentBoxOpen : s.commentBoxClose,)}>
                            <p onClick={() => setOpenComments(!openComments)}>Comments</p>
                            <motion.div initial="initial" variants={stagger} animate='animate' className={s.middle}>
                                {openComments ? (
                                    <CommentsBlock
                                        item={allComments}
                                        isLoading={false}
                                    />
                                ) : null}
                            </motion.div>
                        </div>
                    </div >
                </div>
            </div>
        </main>
    );
};

export default HomePage;


