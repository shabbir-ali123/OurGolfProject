import { FunctionComponent } from "react";
import PostHeader from "../components/PostHeader";
import PostProfile from "../components/PostProfilePrompt";
import PostCard from "../components/PostCard";
import { useTranslation } from "react-i18next";

const PostPage: FunctionComponent = () => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return (
    <div className="font-poppins max-w-6xl mx-auto h-full flex justify-center mt-10">
      <div>
        <PostHeader />
        <PostProfile />
        <PostCard />
        
      </div>
    </div>
  );
};

export default PostPage;
