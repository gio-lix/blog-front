import React from 'react';
import s from "./AddComent.module.scss"
import Button from "../button";

const AddComments = () => {
    return (
        <>
            <div className={s.root}>
                <img
                    className={s.img}
                    src="https://mui.com/static/images/avatar/5.jpg"
                    alt="img"
                />
                <div className={s.form}>
                    <label htmlFor="comment">Comment</label>
                    <textarea
                        name="comment"
                        defaultValue=""
                    />
                    <Button className={s.button} >Send Comment</Button>
                </div>
            </div>
        </>
    );
};

export default AddComments;