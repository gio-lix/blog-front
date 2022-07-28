import React, {useState} from 'react';
import clsx from "clsx";
import s from "./Search.module.scss";
import {HiOutlineSearch} from "react-icons/hi";
import {categoryReducer} from "../../redux/slices/posts";
import {useAppDispatch} from "../../redux/store";
interface SearchProps {
    search: string
    setTag: Function
    setSearchParams: Function
    setPage: Function
    setNav: Function
    setSearch: Function
}
const Search = ({setSearchParams,setNav,setPage,setTag,setSearch,search}: SearchProps) => {
    const dispatch = useAppDispatch()


    const handleChange = (value: string) => {
        dispatch(categoryReducer("clear"))
        setPage(0)
        setNav(0)
        setSearchParams("")
        setTag("")
        setSearch(value)
    }

    return (
        <div className={clsx(s.search)}>
            <span>
                <HiOutlineSearch />
            </span>
            <input
                type="text"
                value={search}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search"
            />
        </div>
    );
};

export default Search;