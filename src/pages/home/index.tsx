import React, {useEffect, useState} from 'react';
import s from "./Home.module.scss"
import {classNames} from "../../utlis/classes";
import Post from "../../components/post";
import {TagsBlock} from "../../components/tagBlogs";
import {CommentsBlock} from "../../components/commentsBlog";
import {RootState, useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchPosts, fetchTags} from "../../redux/slices/posts";
import 'react-loading-skeleton/dist/skeleton.css'
import {PostSkeleton} from "../../components/post/PostSkeleton";
import {DataState} from "../../types/type";

const HomePage = () => {
    const dispatch = useAppDispatch()
    const {posts, tags} = useAppSelector((state: RootState) => state.posts)
    const userData = useAppSelector((state: RootState) => state.auth.data)
    const [nav, setNav] = useState(0)


    const isPostLoading = posts.status === "loading"
    const isTagLoading = tags.status === "loading"


    useEffect(() => {
        dispatch(fetchPosts())
        dispatch(fetchTags())
    }, [])

    const items = [
        {
            user: {
                fullName: 'Mollie Andersson',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'hey',
        },
        {
            user: {
                fullName: 'Rebbbea anderson',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
        },
    ]


    return (
        <section className="container">
            {/*  navigation  */}
            <div className={s.home_article}>
                <p
                    onClick={() => setNav(0)}
                    className={classNames(nav === 0 ? s.choice : "")}
                >
                    new
                </p>
                <p
                    onClick={() => setNav(1)}
                    className={classNames(nav === 1 ? s.choice : "")}
                >
                    popular
                </p>
            </div>

            <div className={s.home_grid}>
                <div className={s.cart}>
                    {isPostLoading
                        ? [...Array(5)].map((e, i: number) => <PostSkeleton image={false} key={i}/>)
                        : posts.items.map((post: DataState, index: number) => {
                            return (
                                <Post
                                    key={post._id}
                                    post={post}
                                    isLoading={false}
                                    isFullPost={false}
                                    isEditable={userData?._id === post.user._id}
                                />
                            )
                        })}
                </div>
                <aside className={s.info}>
                    <TagsBlock
                        items={tags.items}
                        isLoading={isTagLoading}
                    />
                    <CommentsBlock item={items} isLoading={false}/>
                </aside>
            </div>
        </section>
    );
};

export default HomePage;