import React, {useCallback, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchAllPosts, fetchTags, categoryReducer} from "../../redux/slices/posts";
import {PostSkeleton} from "../../components/post/PostSkeleton";
import {fetchPostsComments} from "../../redux/slices/comments";
import CommentsBlock from "../../components/commentsBlog";
import {TagsBlock} from "../../components/tagBlogs";
import 'react-loading-skeleton/dist/skeleton.css'
import Search from "../../components/search";
import {DataState} from "../../types/type";
import Post from "../../components/post";
import clsx from "clsx";
import s from "./Home.module.scss"
import {motion} from 'framer-motion';
import {stagger} from "../../animation";
import {GiSettingsKnobs} from "react-icons/gi"
import Responsive from "../../components/responsive";


const HomePage = () => {
    const dispatch = useAppDispatch()

    const {allComments} = useAppSelector((state: RootState) => state.comments)
    const {posts, tags} = useAppSelector((state: RootState) => state.posts)
    const userData = useAppSelector((state: RootState) => state.auth.data)

    const [openComments, setOpenComments] = useState<boolean>(false)
    const [openTags, setOpenTags] = useState<boolean>(false)
    const [openResponsiveCarts, setOpenResponsiveCarts] = useState<boolean>(false)

    const [categoryParams, setCategoryParams] = useState<string>("")
    const [postId, setPostId] = useState<string>("")
    const [search, setSearch] = useState<string>("")
    const [tag, setTag] = useState<string>("")

    const [nav, setNav] = useState<number>(0)
    const [page, setPage] = useState<number>(0)

    const scrollRef = useRef<any | null>(null)

    const isPostLoading = posts.status === "loading"
    const isTagLoading = tags.status === "loading"


    useEffect(() => {
        dispatch(fetchAllPosts({page, categoryParams, tag, search}))
    }, [page, categoryParams, tag, search])

    const handleEndConcert = () => {
        setNav(0)
        setPage(0)
        setTag("")
        setCategoryParams("")
        dispatch(categoryReducer("clear"))
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
        if (scrollHeight === windowHeight || (scrollHeight - 1) === windowHeight || (scrollHeight + 1) === windowHeight) {
            setPage((prev: number): any => {
                console.log("prev", prev)
                console.log("page", page)
                return prev + 1
            })
            return
        }
    }


    // navigation
    const navigation = useCallback((num: number) => {
        if (num === 0) {
            setNav(0)
            setTag("")
            setSearch("")
            if (categoryParams === "") return
            setCategoryParams("")
            dispatch(categoryReducer("clear"))
            setPage(0)
        } else {
            setNav(1)
            setTag("")
            setSearch("")
            if (categoryParams) return
            setCategoryParams("popular")
            dispatch(categoryReducer("clear"))
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
        <main className={clsx("container", s.root)}>
            {/*  navigation  */}
            <section className={s.home_article}>
                <div>
                    <p onClick={() => navigation(0)} className={clsx(nav === 0 ? s.choice : "")}>
                        new
                    </p>
                    <p onClick={() => navigation(1)} className={clsx(nav === 1 ? s.choice : "")}>
                        popular
                    </p>
                    <button onClick={() => setOpenResponsiveCarts(!openResponsiveCarts)} className={s.additional}>
                        <GiSettingsKnobs />
                    </button>
                </div>
                {openResponsiveCarts ? (
                    <div className={s.responsiveCart}>
                        <Responsive
                            setOpenResponsiveCarts={setOpenResponsiveCarts}
                            setSearch={setSearch}
                            setTag={setTag}
                            items={tags.items}
                            isLoading={isTagLoading}
                            setSearchParams={setCategoryParams}
                            setPage={setPage}
                            setNav={setNav}
                            tag={tag}
                            commentsItem={allComments}
                        />
                    </div>
                ) : null}
                <Search
                    setSearch={setSearch}
                    search={search}
                    setTag={setTag}
                    setSearchParams={setCategoryParams}
                    setPage={setPage}
                    setNav={setNav}
                />
            </section>


            <section className={s.home_grid}>
                <div ref={scrollRef} className={s.cart}>
                    {posts.items?.map((post: DataState, index: number) => {
                        return (
                            <div className=".scrollArea" id={post._id} key={`${post._id}_${index}`}>
                                <Post
                                    post={post}
                                    isLoading={false}
                                    isFullPost={false}
                                    isEditable={post.user._id === userData?._id}
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

                {/* sidebar  */}
                <div className={s.info}>
                    <aside className={s.tagsClass}>
                        <div className={clsx(openTags ? s.tagsToggleOpen : s.tagsToggleClose)}>
                            <p onClick={() => setOpenTags(!openTags)}>Tags</p>
                            {openTags ? (
                                <TagsBlock
                                    setSearch={setSearch}
                                    setTag={setTag}
                                    items={tags.items}
                                    isLoading={isTagLoading}
                                    setSearchParams={setCategoryParams}
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

