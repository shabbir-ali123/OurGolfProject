import React, { useState, useRef } from "react";

interface ProfileAvatarProps {
  icon?: any;
  label?: string;
  pname?: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  defaultImageUrl?: string;
  onChangeImage?: any; 
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  icon,
  label,
  placeholder,
  colSpanSm = 8,
  colSpanMd = 5,
  colSpanLg = 4,
  iconWidth = "24px",
  iconHeight = "24px",
  pname,
  defaultImageUrl = "/img/profile1.png",
  onChangeImage,
}) => {
  const [imageUrl, setImageUrl] = useState(defaultImageUrl);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setImageUrl(result);
        if (onChangeImage) {
          onChangeImage(file);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="relative h-20 mt-10 bg-gradient-to-r from-blue-400 to-red-800 ">
        <div
          className="absolute left-60 bottom-[-60px] top-[-36px] "
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        >
          <img
            className="rounded-full"
            src={imageUrl}
            width="150px"
            height="150px"
            alt={pname}
          />
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleFileInputChange}
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
