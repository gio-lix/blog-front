import React from 'react';
import s from "./AddComent.module.scss"
import Button from "../button";
import {FaUserCircle} from "react-icons/fa"

interface Props {
    setCommentText: Function
    onSendComment: () => void
    commentText: string
}

const AddComments = ({setCommentText,commentText, onSendComment}: Props) => {

    return (
        <>
            <div className={s.root}>
                <FaUserCircle className={s.icon} />
                <div className={s.form}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        id="comment"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                    />
                    <Button onClick={onSendComment} className={s.button} >Send Comment</Button>
                </div>
            </div>
        </>
    );
};

export default AddComments;