import { useContext } from "react";
import { useTranslation } from "react-i18next";
import InputWithIcon from "../components/FormComponents";
import { MapPinIcon, PhoneIcon, UserIcon } from "@heroicons/react/24/outline";
import { userAuthContext } from "../contexts/authContext";
import { toast } from "react-toastify";

const UpdateProfilePage: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { userFormData, setUserFormData, handleUpdateUser, message } =
    userAuthContext(); // Use useContext to access context values

  const handleChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserFormData((prev: any) => {
      const updatedValues = { ...prev, [name]: value };
      return updatedValues;
    });
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files?.[0];

    console.log(files);
    if (files) {
      setUserFormData((prevFormData: any) => ({
        ...prevFormData,
        imageUrl: [files],
      }));
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(userFormData);
    if (
      !userFormData.nickName ||
      !userFormData.email ||
      !userFormData.password
    ) {
      toast.error("Please fill out all required fields.");
      return;
    }

    await handleUpdateUser();

    toast.success("Updated Succuss");
  };

  return (
    <div className="py-8">
      <form onSubmit={handleSubmit}>
        <section className="h-full max-w-6xl mx-auto mt-6 text-center">
          <div className="">
            <h3>{userFormData.nickName}</h3>

            <label
              htmlFor="fileInput"
              className="cursor-pointer relative inline-block"
            >
              {typeof userFormData.imageUrl === "string" ? (
                <img
                  className="w-64 h-64 rounded-full"
                  src={userFormData.imageUrl}
                  alt="User Profile"
                />
              ) : userFormData.imageUrl  ? (
                <img
                  className="w-64 h-64 rounded-full"
                  src={URL.createObjectURL(userFormData.imageUrl?.[0])}
                  onError={() => console.log("Invalid image file")}

                  alt="User Profile"
                />
              ) : (
                <div>No image selected</div>
              )}
              <span className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-white text-[30px]">
                +
              </span>
              <input
                id="fileInput"
                type="file"
                name="imageUrl"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div>

          <div className="py-6">
            <div className="grid grid-cols-2 gap-4 text-start">
              <InputWithIcon
                pname="nickName"
                icon={<UserIcon />}
                label={t("LAST_NAME")}
                value={userFormData.nickName}
                onChange={handleChanges}
                placeholder={t("ENTER_LAST_NAME")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="email"
                icon={<UserIcon />}
                label={t("EMAIL")}
                value={userFormData.email}
                onChange={handleChanges}
                placeholder={t("ENTER_EMAIL")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />

              <InputWithIcon
                pname="password"
                icon={<PhoneIcon />}
                label={t("PASSWORD")}
                value={userFormData.password}
                ptype={"password"}
                onChange={handleChanges}
                placeholder={t("ENTER_PASSWORD")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
              <InputWithIcon
                pname="confirmPassword"
                icon={<PhoneIcon />}
                label={t("CONFIRM_PASSWORD")}
                value={userFormData.confirmPassword}
                ptype={"password"}
                onChange={handleChanges}
                placeholder={t("CONFIRM_PASSWORD")}
                colSpanSm={6}
                colSpanMd={4}
                colSpanLg={2}
              />
            </div>
            <button
              type="submit"
              className="px-16 py-4 mt-4 text-white glow-on-hover rounded-full text-[20px]"
            >
              {t("UPDATE")}
            </button>
          </div>
        </section>
      </form>
    </div>
  );
};
export default UpdateProfilePage;
