import React from 'react';
import {SideBlock} from "../sideBar";
import {RiArtboard2Line} from "react-icons/ri";
import s from './TagBlogs.module.scss'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface TagBlogsProps {
    items: string[]
    isLoading: boolean
}

export const TagsBlock = ({ items, isLoading = true }: TagBlogsProps) => {
    return (
        <SideBlock title="tags">
                {(isLoading ? [...Array(5)] : items).map((name: any, i: number) => (
                    <a
                        key={i}
                        href={`/tags/${name}`}
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
                    </a>
                ))}
        </SideBlock>
    );
};