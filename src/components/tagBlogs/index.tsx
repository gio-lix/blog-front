import React, {useCallback, useEffect} from 'react';
import {SideBlock} from "../sideBar";
import {RiArtboard2Line} from "react-icons/ri";
import s from './TagBlogs.module.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import {useAppDispatch} from "../../redux/store";
import {search} from "../../redux/slices/posts";

interface TagBlogsProps {
    items: string[]
    isLoading: boolean
    setTag: Function
    setSearchParams: Function
    setPage: Function
    navigation: Function
}

export const TagsBlock = ({ items, isLoading = true,setTag, setSearchParams,navigation, setPage }: TagBlogsProps) => {
    const dispatch = useAppDispatch()

    const tagsFunc = (name: string) => {
        window.scrollTo(0, 0);
        setTag((prev: string) => {
            if (prev === name) {
                return name
            } else {
                dispatch(search("clear"))
                setSearchParams("")
                setPage(0)
                navigation(0)
                return  name
            }

        })
    }
    //        window.scrollTo(0, 0);

    return (
        <SideBlock title="tags">
                {(isLoading ? [...Array(5)] : items).map((name: any, i: number) => (
                    <div
                        key={i}
                        onClick={() => tagsFunc(name)}
                        className={s.root}
                    >
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