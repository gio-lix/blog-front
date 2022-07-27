import React from 'react';
import {SideBlock} from "../sideBar";
import {RiArtboard2Line} from "react-icons/ri";
import s from './TagBlogs.module.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useAppDispatch} from "../../redux/store";
import {categoryReducer} from "../../redux/slices/posts";

interface TagBlogsProps {
    items: string[]
    isLoading: boolean
    setTag: Function
    setSearchParams: Function
    setPage: Function
    setNav: Function
    setSearch: Function
    tag: any
}

export const TagsBlock = ({ items, isLoading = true,setTag, setSearchParams,setNav, setPage,tag, setSearch }: TagBlogsProps) => {
    const dispatch = useAppDispatch()
    const tagsFunc = (name: string) => {
        if (tag === name) {
            return
        }
        dispatch(categoryReducer("clear"))
        window.scrollTo(0, 0);
        setPage(0)
        setNav(0)
        setSearchParams("")
        setSearch("")
        setTag(name)
    }

    return (
        <SideBlock title="tags">
                {(isLoading ? [...Array(5)] : items).map((name: any, i: number) => (
                    <div key={i} onClick={() => tagsFunc(name)} className={s.root}>
                            {isLoading ? (
                                <p>
                                    <Skeleton className={s.skeleton} />
                                </p>
                                ) : (
                                <p className={s.tags}>
                                    <span className={s.icon}> <RiArtboard2Line/> </span>
                                    <span className={s.title}> {name}</span>
                                </p>
                                )
                            }
                    </div>
                ))}
        </SideBlock>
    );
};