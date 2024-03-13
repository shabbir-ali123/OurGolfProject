import React, {  useCallback, useEffect, useState } from 'react';
import { createPost, deletePost, fetchAllPosts, fetchMyPosts, fetchPosts, fetchSinglePosts } from '../utils/fetchPosts';
import { useNavigate } from 'react-router-dom';


const PostsContext = React.createContext<any>({});
interface CreatePostType {
    text: string;
    category: string;
    tags: string;
    userId: string | null;
    mediaFiles: File[];
  }

export const PostContext = ({children}:any)=>{
    const [post, setPost] = useState<any[]>([]);
    const [singlePost, setSinglePost] = useState<any>();
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();
    const [deletePostId, setDeletePostId] = useState<any>();
    const [postId, setPostId] = useState<any>();
    const [message, setMessage] = useState<any>('');
    const [formData, setFormData] = useState<CreatePostType>({
        userId: "",
        text: "",
        category: "",
        tags: "",
        mediaFiles: [],
      });

    useEffect(() => {
        if (postId) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [postId, setSinglePost]);

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
        deletePost(postId, setMessage, router); 
    }, [router]);
    const handleCreatePost = () => {
        createPost(formData, setMessage); 
    };
    

    const handlePost = useCallback((value: any) => {
        setSinglePost(value)
    }, [singlePost])

    useEffect(() => {
        if(category === 'MyPost'){
             fetchMyPosts(setPost, router);
        }
        if(category === 'All'){
            fetchAllPosts(setPost,category, router);
        }
        if(category === 'Public' || category === 'Private'){
            fetchPosts(setPost, category, router);

        }

     }, [category,message, postId]);

     const handlePosts = useCallback((post: any) => {
        return setPost(post);
    }, [post,message, handleDeletePost]);
   
    const value =  {handlePostId, handlePosts,handlePost, handleDeletePost, handleCategory,handleCreatePost,setFormData,formData, singlePost, category, post}
   
    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

