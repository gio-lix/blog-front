import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import s from "./Home.module.scss"
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import Post from "../../components/post";
import {fetchAllPosts, fetchTags, search} from "../../redux/slices/posts";
import 'react-loading-skeleton/dist/skeleton.css'
import {PostSkeleton} from "../../components/post/PostSkeleton";
import { DataState} from "../../types/type";
import CommentsBlock from "../../components/commentsBlog";
import clsx from "clsx";
import {motion} from 'framer-motion';
import {stagger} from "../../animation";
import {TagsBlock} from "../../components/tagBlogs";
import {fetchPostsComments} from "../../redux/slices/comments";




const HomePage = () => {
    const dispatch = useAppDispatch()
    const {posts, tags} = useAppSelector((state: RootState) => state.posts)
    const userData = useAppSelector((state: RootState) => state.auth.data)
    const [nav, setNav] = useState(0)
    const [openComments, setOpenComments] = useState<boolean>(false)
    const [openTags, setOpenTags] = useState<boolean>(false)
    const [postId, setPostId] = useState<string>()
    const [page, setPage] = useState(0)
    const [tag, setTag] = useState<string>("")
    const scrollRef = useRef<any | null>(null)
    const {allComments} = useAppSelector((state: RootState) => state.comments)
    const [searchParams, setSearchParams] = useState("")


    const isPostLoading = posts.status === "loading"
    const isTagLoading = tags.status === "loading"



    useLayoutEffect(() => {
        dispatch(fetchAllPosts({page, searchParams, tag}))

    }, [page, searchParams, tag])

    const handleEndConcert = () => {
        setNav(0)
        setTag("")
        setSearchParams("")
        dispatch(search("clear"))
    }

    useEffect(() => {
        window.addEventListener('beforeunload', handleEndConcert);
        return () => {
            window.removeEventListener('beforeunload', handleEndConcert);
            handleEndConcert()

        }
    }, []);


    useEffect(() => {
        dispatch(fetchTags())
    }, [dispatch])


    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.addEventListener('scroll', handleScroll)
    }, []);
    const handleScroll = () => {
        const scrollHeight = Math.ceil(window.scrollY + window.innerHeight)
        const windowHeight = Math.floor(document.documentElement.scrollHeight)
        if (scrollHeight === windowHeight) {
            setPage((prev: number): number =>  prev + 1)
            return
        }

    }




    const navigation = useCallback((num: number) => {
        if (num === 0) {
            setNav(0)
            setTag("")
            if (searchParams === "") return
            setSearchParams("")
            dispatch(search("clear"))
            setPage(0)
        } else {
            setNav(1)
            setTag("")
            if (searchParams) return
            setSearchParams("popular")
            dispatch(search("clear"))
            setPage(0)
        }
    }, [posts.items])


    useEffect(() => {
        if (!postId) return
        dispatch(fetchPostsComments(postId))
    }, [posts.items, postId])


    const options = {
        root: document.querySelector('.scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
    }


    const callBack = useCallback((entries: any) => {
        entries.forEach((entry: any) => {
            if (entry.isIntersecting) {
                setPostId(entry.target.id)
            }
        })
    }, [scrollRef, options, openComments])


    let observer = new IntersectionObserver(callBack, options)

    useEffect(() => {
        [...scrollRef.current.children].forEach(el => {
            observer.observe(el)
        })
    }, [scrollRef, options])







    return (
        <main className={clsx("container", s.bottom)}>
            {/*  navigation  */}
            <div className={s.home_article}>
                <p onClick={() => navigation(0)} className={clsx(nav === 0 ? s.choice : "")}>
                    new
                </p>
                <p onClick={() => navigation(1)} className={clsx(nav === 1 ? s.choice : "")}>
                    popular
                </p>
            </div>

            <section className={s.home_grid}>
                <div ref={scrollRef} className={s.cart}>
                    {posts.items?.map((post: DataState, index: number) => {
                        return (
                            <div className=".scrollArea" id={post._id} key={`${post._id}_${index}`}>
                                <Post
                                    post={post}
                                    isLoading={false}
                                    isFullPost={false}
                                    isEditable={(post as any)?.user === userData?._id}
                                />
                            </div>
                        )
                    })}
                    {isPostLoading ? (
                        <div>
                            {[...Array(5)].map((e, i: number) =>
                                <PostSkeleton key={i}/>)
                            }
                        </div>
                    ) : null}

                </div>
                <div className={s.info}>
                    <aside className={s.tagsClass}>
                        <div className={clsx(openTags ? s.tagsToggleOpen : s.tagsToggleClose)}>
                            <p onClick={() => setOpenTags(!openTags)}>Tags</p>
                            {openTags ? (
                                <TagsBlock
                                    setTag={setTag}
                                    items={tags.items}
                                    isLoading={isTagLoading}
                                    setSearchParams={setSearchParams}
                                    setPage={setPage}
                                    setNav={setNav}
                                    tag={tag}
                                />
                            ) : null}
                        </div>
                    </aside>

                    <div className={clsx(s.commentBox, openTags ? s.commentTop : "")}>
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
                    </div>
                </div>
            </section>
        </main>
    );
};

export default HomePage;

