
import React, { ReactNode } from "react";

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
pname   
}) => {
return (
    <div>
   <div className="relative bg-gradient-to-r from-blue-400 to-red-800  h-20 mt-10">
    <div className="absolute left-60 bottom-[-60] top-0 border-10 border-solid-green " >
        <img src="/img/profile1.png" width="150px" height="150px" alt=""  />
    </div>
   </div>
    </div>
);
};

export default ProfileAvatar;
