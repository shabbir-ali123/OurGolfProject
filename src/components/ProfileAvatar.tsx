import React, { ReactNode, useRef } from "react";

interface ProfileAvatarProps {
  icon: ReactNode;
  label: string;
  pname: string;
  placeholder?: string;
  colSpanSm?: number;
  colSpanMd?: number;
  colSpanLg?: number;
  iconWidth?: string;
  iconHeight?: string;
  imageUrl?: string;
  onChangeImage?: (file: File) => void; // Callback for image change
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
  imageUrl = "/img/profile1.png",
  onChangeImage,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && onChangeImage) {
      onChangeImage(selectedFile);
    }
  };

  return (
    <div>
      <div className="relative h-20 mt-10 bg-gradient-to-r from-blue-400 to-red-800">
        <div
          className="absolute left-60 bottom-[-60] top-[-36px] border-10 border-solid-green"
          onClick={handleImageClick}
        >
          <img
            src={imageUrl}
            width="150px"
            height="150px"
            alt={pname}
            style={{ cursor: "pointer" }}
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
