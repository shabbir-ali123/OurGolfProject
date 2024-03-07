import React, {  useCallback, useEffect, useState } from 'react';
import { deletePost, fetchPosts } from '../utils/fetchPosts';
import { useNavigate } from 'react-router-dom';


const PostsContext = React.createContext<any>({});

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();
    const [deletePostId, setDeletePostId] = useState<any>();


    useEffect(() => {
        fetchPosts(setPost, category, router);
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


    const handleDeletePost = useCallback((postId: any) => {
        console.log(postId);
        setDeletePostId(postId);
        deletePost(postId, router); // Call the external deletePost function
    }, [router]);

    const value =  { handlePosts, handleDeletePost, handleCategory, category, post}

    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

