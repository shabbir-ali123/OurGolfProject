import { FunctionComponent, useState } from "react";
import PostHeader from "../components/PostHeader";
import PostProfile from "../components/PostProfilePrompt";
import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";
import { fetchPosts } from "../utils/fetchPosts";
const PostPage: FunctionComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Party');
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };
  return (
    <div className="font-poppins max-w-6xl mx-auto h-full flex justify-center mt-10">
      <div  className="w-full">
        <PostHeader onCategoryChange={handleCategoryChange} />
        <PostProfile />
        <PostCard category={selectedCategory} />
        
      </div>
    </div>
  );
};

export default PostPage;
