import React, { useRef, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import axios from "axios";
import { useTranslation } from "react-i18next";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
interface CreateCatalogType {
  title: string;
  description: string;
  mediaFiles: any;
  price: string;
}

const CatalogModal: React.FC<any> = () => {
  const { t, i18n } = useTranslation();

  const userId = localStorage.getItem("id");
  const [isLoading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState<CreateCatalogType>({
    title: "",
    description: "",
    mediaFiles: [],
    price: "",
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const filesArray: File[] = Array.from(files).slice(0, 5);
      setSelectedFiles([...selectedFiles, ...filesArray]);
      setFormData((prevFormData: CreateCatalogType) => ({
        ...prevFormData,
        mediaFiles: [...prevFormData.mediaFiles, ...filesArray],
      }));
    }
  };

  const removeSelectedFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setFormData((prevFormData: CreateCatalogType) => ({
      ...prevFormData,
      mediaFiles: updatedFiles,
    }));
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();

    const isTextEmpty =
      !formData.title || !formData.title.replace(/<(.|\n)*?>/g, "").trim();
    if (isTextEmpty && formData.mediaFiles.length === 0) {
      alert(t("Please add some text or an image/video before posting."));
      return;
    }

    setLoading(true);
    console.log(formData)
    // Reset form data
    setFormData({
      title: "",
      description: "",
      mediaFiles: [],
      price: "",
    });

    setSelectedFiles([]);
    setLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData: any) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className=" w-full max-w-xl p-6 mx-auto bg-white rounded-lg xl:mx-auto"
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          maxHeight: "90vh",
          overflowY: "auto",
        }}
      >
        <form className="px-2">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">Create Catalog!!!</h1>
          </div>
          <div>
            <label>Title</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="Catalog Title"
              name="title"
              onChange={handleInputChange}
              required
            />
          </div>{" "}
          <div>
            <label htmlFor="">Write Description</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="Write Description"
              name="description"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="">Catalog Price</label> <br />
            <input
              className="xs:w-[200px] sm:w-[300px] md:w-[400px] xl:w-[533px] mt-2 p-3 mb-4 text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:border-[#51ff85] focus:ring-1 focus:ring-[#51ff85] focus:outline-none"
              placeholder="Price"
              name="price"
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">{t("ADD_VIDEOS")}</label>
            <div className="flex flex-wrap gap-4 mt-2  ">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative ">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`file-${index}`}
                    className="w-16 h-16 object-cover rounded-lg "
                  />
                  <button
                    className="absolute top-0 right-[-10px] h-4 w-4 bg-[#61cbc2] rounded-full text-white text-[14px] flex justify-center items-center cursor-pointer"
                    onClick={() => removeSelectedFile(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <input
              id="file-upload"
              name="mediaFiles"
              ref={fileInputRef}
              className="hidden "
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*,video/*"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center justify-center p-4  border-2 border-dashed rounded-lg border-[#61cbc2] cursor-pointer"
            >
              <svg
                className="w-6 h-6 text-gray-600"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12 4v16m8-8H4"></path>
              </svg>
            </label>
          </div>
          <button
            className="w-full bg-[#61cbc2] hover:bg-[#45e07d] text-white font-bold py-3 px-4 rounded-lg shadow hover:shadow-md transition-all mt-10"
            disabled={
              isLoading ||
              (!formData.title.trim() && formData.mediaFiles.length === 0)
            }
            type="submit"
            onClick={(e) => handleCreate(e)}
          >
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CatalogModal;
