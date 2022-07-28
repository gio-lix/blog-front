import React, {useState} from 'react';
import s from "./Responsive.module.scss"
import {TagsBlock} from "../tagBlogs";
import CommentsBlock from "../commentsBlog";

interface Props {
    setOpenResponsiveCarts: Function
    items: string[]
    isLoading: boolean
    setTag: Function
    setSearchParams: Function
    setPage: Function
    setNav: Function
    setSearch: Function
    commentsItem: any
    tag: any
}

const Responsive = ({setOpenResponsiveCarts,tag,setTag,setSearchParams,setSearch,items,commentsItem,isLoading,setPage,setNav}: Props) => {
    const [tagResponsive, setResponsive] = useState(false)
    const [commentResponsive, setCommentResponsive] = useState(false)

    return (
        <section className={s.root}>
            <button onClick={() => setOpenResponsiveCarts(false)}>X</button>
            <div onClick={() => setResponsive(!tagResponsive)}>
                <p>tags</p>
                {tagResponsive ? (
                    <div className={tagResponsive && s.tagBox}>
                        <TagsBlock
                            setSearch={setSearch}
                            setTag={setTag}
                            items={items}
                            isLoading={false}
                            setSearchParams={setSearchParams}
                            setPage={setPage}
                            setNav={setNav}
                            tag={tag}
                        />
                    </div>
                ) : null}
            </div>
            <div>
                <p onClick={() => setCommentResponsive(!commentResponsive)}>comments</p>
                {commentResponsive ? (
                    <div className={s.commentBox}>
                        <CommentsBlock
                            item={commentsItem}
                            isLoading={false}
                        />
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default Responsive;