import React, {useEffect} from 'react';
import Header from "./components/header";
import HomePage from "./pages/home";
import FullPost from "./pages/fullPost";
import AddPost from "./pages/addPost";
import Login from "./pages/login";
import Registration from "./pages/registretion";
import {Routes, Route} from "react-router-dom"
import {useAppDispatch} from "./redux/store";
import {fetchAuthMe} from "./redux/slices/auth";



function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, [])

  return (
    <>
        <header className='mainBox'>
                <Header />
        </header>
        <Routes>
            <Route path="/" element={<HomePage /> } />
            <Route path="/posts/:id" element={<FullPost />} />
            <Route path="/posts/:id/edit" element={<AddPost />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
        </Routes>

    </>
  );
}

export default App;
