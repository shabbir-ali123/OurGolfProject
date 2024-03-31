import axios from "axios";
import { API_ENDPOINTS } from "../appConfig";
import { toast } from "react-toastify";

export const handleEditForm = async (e: React.FormEvent,setIsEdit:any,handleMessage:any, formData:any) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        API_ENDPOINTS.EDITPOSTCOMMENTS,
        {
          commentId: formData.commentId,
          content: formData.content,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setIsEdit((prevState: any) => ({
        false: false,
      }));
      if (response.status === 200) {
        handleMessage(response.data.updatedComment.content);
        toast.success("comment has been updated");
      }
    } catch (error) {
      toast.error(`Error updating likes: ${error}`);
    }
  };

  export const handleDeleteComment = async (commentId: any, userId: any, handleMessage: any, setIsEdit: any) => {
    try {
      const response = await axios.delete(API_ENDPOINTS.DELETECOMMENTBYID + commentId, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        data: {
          commentId: commentId,
        },
      });
  
      setIsEdit(false);
        handleMessage(response.data.message);
        toast.success("comment has been deleted");

    
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };