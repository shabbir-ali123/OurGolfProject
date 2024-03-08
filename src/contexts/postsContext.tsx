import React, {  useCallback, useEffect, useState } from 'react';
import { deletePost, fetchPosts, fetchSinglePosts } from '../utils/fetchPosts';
import { useNavigate } from 'react-router-dom';


const PostsContext = React.createContext<any>({});

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [singlePost, setSinglePost] = useState<any>();
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();
    const [deletePostId, setDeletePostId] = useState<any>();
    const [postId, setPostId] = useState<any>();


    useEffect(() => {
        fetchPosts(setPost, category, router);
    }, [category]);
    
    useEffect(() => {
        if (postId) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [postId]);

    const handlePosts = useCallback((value: any) => {
        return setPost(value);
    }, [post]);
    
    const handleCategory = useCallback((category: string) => {
        if(!token){
            router("/login-page");
        }
        setCategory(category)
        
    }, [category]);
    const handlePostId = useCallback((value: string) => {
        if(!token){
            router("/login-page");
        }
        setPostId(value)
        
    }, [postId])


    const handleDeletePost = useCallback((postId: any) => {
        setDeletePostId(postId);
        deletePost(postId, router); // Call the external deletePost function
    }, [router]);
    

    const handlePost = useCallback((value: string) => {
       
        setSinglePost(value)
        
    }, [singlePost])


    const value =  {handlePostId, handlePosts, handleDeletePost, handleCategory,singlePost, category, post}

    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

