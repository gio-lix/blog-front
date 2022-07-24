import React, {useEffect, useState} from 'react';
import AddComments from "../../components/addComment";
import {useParams} from "react-router-dom"
import axios from "../../axios";
import {PostSkeleton} from "../../components/post/PostSkeleton";
import Post from "../../components/post";
import {CommentsState, DataState} from "../../types/type";
import {useAppSelector} from "../../redux/store";
import {selectAuth} from "../../redux/slices/auth";
import CommentsBlock from "../../components/commentsBlog";

const FullPost = () => {
    const [data, setData] = useState<DataState>()
    const isAuth = useAppSelector(selectAuth)
    const [comments, setComments] = useState<CommentsState[]>([])
    const [commentText, setCommentText] = useState<string>("")
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const {id} = useParams()


    useEffect(() => {
        axios.get(`/posts/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [id])

    useEffect(() => {
        axios.get(`/posts/${id}/comment`)
            .then((res) => {
                setComments(res.data)
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [id])

    const onSendComment = async () => {
        try {
            const data = await axios.post(`/posts/${id}/comment`, {text: commentText})
            console.log(data)
        } catch (err) {
            console.log(err)
        } finally {
            setCommentText("")
        }
    }

    if (isLoading) {
        return <PostSkeleton />
    }


    return (
        <section className="container">
            {data && <Post
                post={data}
                isLoading={isLoading}
            />
            }
            <CommentsBlock item={comments} isLoading={false}>
                {isAuth && (
                    <AddComments
                        commentText={commentText}
                        setCommentText={setCommentText}
                        onSendComment={onSendComment}
                    />
                )}
            </CommentsBlock>

        </section>
    );
};

export default FullPost;