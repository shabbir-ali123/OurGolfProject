import React, {  useCallback, useEffect, useState } from 'react';
import { fetchPosts } from '../utils/fetchPosts';
import { useNavigate } from 'react-router-dom';


const PostsContext = React.createContext<any>({});

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();


    useEffect(() => {
        fetchPosts(setPost, category);
    }, [category]);

    const handlePosts = useCallback((value: any) => {
        return setPost(value);
    }, [post]);
    
    const handleCategory = useCallback((category: string) => {
        if(!token){
            router("/login-page");
        }
        setCategory(category)
        
    }, [category])

    const value =  { handlePosts, handleCategory, category, post}

    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

