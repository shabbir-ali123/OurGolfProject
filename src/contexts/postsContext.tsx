import React, {  useCallback, useEffect, useState } from 'react';
import { fetchPosts } from '../utils/fetchPosts';


const PostsContext = React.createContext<any>({});

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [category, setCategory] = useState<string>('party')

    useEffect(() => {
        fetchPosts(setPost, category);
    }, [category]);

    const handlePosts = useCallback((value: any) => {
        return setPost(value);
    }, [post]);
    
    const handleCategory = useCallback((category: string) => {
        setCategory(category)
    }, [category])

    const value =  { handlePosts, handleCategory, category, post}

    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

