import React, {  useCallback, useEffect, useState } from 'react';
import { createPost, deletePost, fetchAllPosts, fetchMostCommentedPosts, fetchMostLikedPosts, fetchMyPosts, fetchPosts, fetchSinglePosts } from '../utils/fetchPosts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


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
    const [mostLiked, setMostLiked] = useState<any>();
    const [mostCommented, setMostCommented] = useState<any>();
    const [category, setCategory] = useState<string>('Public');
    const token = localStorage.getItem("token");
    const router = useNavigate();
    const [deletePostId, setDeletePostId] = useState<any>();
    const [postId, setPostId] = useState<any>();
    const [message, setMessage] = useState<any>();
    const [pageSize, setPageSize] = useState<any>(6);
    const [currentPage, setCurrentPage] = useState<any>(1);
    const [count, setCount] = useState<any>(null);



    const [formData, setFormData] = useState<CreatePostType>({
        userId: "",
        text: "",
        category: "",
        tags: "",
        mediaFiles: [],
      });

   
    const handleCategory = useCallback((category: string) => {
        if(!token){
            router("/login-page");
        }
        setCategory(category)
        
    }, [category]);
    const handlePostId = useCallback((value: any) => {

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


    const reqObj = {
        currentPage,
        pageSize
    }

    useEffect(() => {
        if(category === 'MyPost'){
             fetchMyPosts(setPost, router);
        }
        if(category === 'All'){
            fetchAllPosts(setPost, reqObj , router, setCount);
        }
        if(category === 'Public' || category === 'Private'){
            fetchPosts(setPost, category, router);
        }
        fetchMostLikedPosts(setMostLiked);
        fetchMostCommentedPosts(setMostCommented);

     }, [currentPage, category,message, postId]);

     const handlePosts = useCallback((post: any) => {
        return setPost(post);
    }, [post,message, handleDeletePost]);

    const handleMessage =  useCallback((value: any) => {
        return setMessage(value);

    }, [message]);
    useEffect(() => {
        if (postId) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [ setSinglePost,message, postId]);
    useEffect(() => {
        if (message) {
            fetchSinglePosts(handlePost, postId);
        }
    }, [message, handleMessage, setMessage]);


    const handleCurrentPage =  useCallback((value: any) => {
        return setCurrentPage(value);
    }, [currentPage]);

    const value =  {handleMessage,handleCurrentPage, handlePostId,setPostId, handlePosts,handlePost, handleDeletePost, handleCategory,handleCreatePost,setFormData,currentPage,count, pageSize, mostLiked, mostCommented, formData, singlePost, category, post}
   
    return <PostsContext.Provider  value={value}> {children}</PostsContext.Provider>
}

export const postContext = ()=> React.useContext(PostsContext);

