import React, {useEffect, useState} from 'react';
import {CommentsBlock} from "../../components/commentsBlog";
import AddComments from "../../components/addComment";
import {useParams} from "react-router-dom"
import axios from "../../axios";
import {PostSkeleton} from "../../components/post/PostSkeleton";
import Post from "../../components/post";

const FullPost = () => {
    const [data, setData] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const {id} = useParams()

    const items = [
        {
            user: {
                fullName: 'Mollie Andersson',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'Это тестовый комментарий',
        },
        {
            user: {
                fullName: 'Rebbbea anderson',
                avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
            },
            text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
        },
    ]


    useEffect(() => {
        axios.get(`/posts/${id}`).then((res) => {
            setData(res.data)
            setIsLoading(false)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    if (isLoading) {
        return <PostSkeleton image={true}/>
    }


    return (
        <section className="container">
            {data && <Post
                post={data}
                isLoading={isLoading}
            />
            }
            <CommentsBlock item={items} isLoading={false}>
                <AddComments/>
            </CommentsBlock>

        </section>
    );
};

export default FullPost;