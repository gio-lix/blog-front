import React, {useEffect, useRef, useState} from 'react';
import Button from "../../components/button";
import clsx from "clsx";
import s from "./AddPost.module.scss"
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {useAppSelector} from "../../redux/store";
import {selectAuth} from "../../redux/slices/auth";
import {Navigate, useNavigate, useParams} from "react-router-dom"
import axios from "../../axios";
import {AxiosResponse} from "axios";


interface FetchProps {
    text: string
    title: string
    imageUrl: string
    tags: string
}
const AddPost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const isAuth = useAppSelector(selectAuth)
    const [imageUrl, setImageUrl] = useState("")
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [text, setText] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [tags, setTags] = React.useState<string>("");
    const inputFileRef = useRef<HTMLInputElement | null>(null)

    const isEditing = Boolean(id)


    const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        }
        try {
            const formData = new FormData()
            const file = e.target.files[0]
            formData.append("image", file)

            const {data} = await axios.post("/upload", formData)
            setImageUrl(data.url)
        } catch (err) {
            console.log("error - ", err)
        }

    };
    const onClickRemoveImage = () => {
        setImageUrl("")
    };


    const onChange = React.useCallback((value: any) => {
        setText(value);
    }, []);

    const options: any = React.useMemo(
        () => ({
            spellChecker: false,
            maxHeight: '400px',
            autofocus: true,
            placeholder: 'Write text...',
            status: false,
            autosave: {
                enabled: true,
                delay: 1000,
            },
        }),
        [],
    );

    useEffect(() => {
        if (isEditing) {
            axios.get(`/posts/${id}`)
                .then(({data}:AxiosResponse<FetchProps>) => {
                    setTitle(data.title)
                    setText(data.text)
                    setTags(data.tags)
                    setImageUrl(data.imageUrl)
                })
                .catch((err) => console.log(err))
        }
    },[isEditing, id])



   const handleSubmit = async () => {
        try {
            const allTags = [tags]
            const fields = {
                title,
                text,
                tags: allTags,
                imageUrl
            }
            const {data} = isEditing
                ? await axios.patch(`/posts/${id}`, fields)
                : await axios.post('/posts', fields)
            const _id = isEditing ? id : data._id
            navigate(`/posts/${_id}`)
        } catch (err) {
            console.log(" --  > ", err)
        } finally {
            setIsLoading(false)
        }
   }


    if (!window.localStorage.getItem("token") && !isAuth) {
        return <Navigate to={'/'}/>
    }
    return (
        <section className={clsx(s.root, "container")}>
            <label htmlFor="file" >
                upload file
            </label>

            <input
                ref={inputFileRef}
                type="file"
                id="file"
                onChange={handleChangeFile}
                hidden
            />

            {imageUrl && (
                <>
                    <img className={s.imageUrl} src={`http://localhost:9000${imageUrl}`} alt="Uploaded"/>
                    <Button className={s.imageBtnDel} onClick={onClickRemoveImage}>
                        delete
                    </Button>
                </>
            )}

            <br/>
            <br/>

            <input
                type="text"
                name="title"
                className={s.title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Write title..."
            />
            <input
                type="text"
                name="text"
                className={s.tag}
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Tags"
            />
            <hr/>
            <br/>

            <SimpleMDE
                className={s.editor}
                value={text}
                onChange={onChange}
                options={options}
            />

            <div  className={s.buttonBox}>
                <Button onClick={handleSubmit} className={s.button}>
                    {isEditing ? "save" : "Submit"}
                </Button>
                <Button onClick={() => navigate("/")} className={s.closeButton}>Close</Button>
            </div>
        </section>
    );
};

export default AddPost;