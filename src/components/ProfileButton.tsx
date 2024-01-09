import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { useTranslation } from "react-i18next";
interface UserData {
  nickName: string;
  email: string;
  // Other properties of user data...
}
// import useRedirect from "../utils/Redirect"zzz

export default function ProfileButton() {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [token, setToken] = useState("");
  const [user, setUser] = useState<UserData | null>(null);

  const languages = {
    en: { displayName: "English" },
    ja: { displayName: "Japan" },
  };

  console.log(i18n.resolvedLanguage, "lang");
  useEffect(() => {
    const userId = localStorage.getItem("id");
    getUser(userId)
      .then((userData) => {
        console.log("User data:", userData.user);
        setUser(userData.user);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error:", error);
      });
  }, []);

  console.log(user?.email, "wemadsfs");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDotClick = () => {
    setDropdownOpen(true);

    const timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };
  useEffect(() => {
    // Check if a token exists in localStorage
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const getUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(response.data.user.nickName, "zzinda");
      // Assuming your API returns data in the response.data property
      return response.data;
    } catch (error) {
      // Handle errors here
      console.error("Error fetching user:", error);
      throw error; // You might want to handle this error in your component
    }
  };
  return (
    <div className="hidden lg:flex lg:flex-1 lg:justify-end ">
      <div className="relative flex-shrink-0 block">
        <div className="flex items-center">
          <div className="flex items-center justify-center ">
            <img
              onClick={handleDotClick}
              className="inline-block h-6 w-6 cursor-pointer border-solid border border-[#ffffff] rounded-full p-1"
              src="/img/profile-page.png"
              alt=""
            />
          </div>
          {token && user ? (
            <div className="ml-3">
              <p className="m-0 text-base font-medium text-white group-hover:text-gray-900">
                {user.nickName ? user.nickName : user.email}
              </p>
              <button
                onClick={() => handleChangeLanguage("en")}
                // style={{
                //     fontWeight: i18n.resolvedLanguage === languages.en ? "bold" : "normal",
                // }}
              >
                {languages.en.displayName}
              </button>
              <button onClick={() => handleChangeLanguage("ja")}>
                {languages.ja.displayName}
              </button>
            </div>
          ) : (
            <div className="ml-3">
              <p className="m-0 text-base font-medium text-white group-hover:text-gray-900">
                <Link to="/login-page">Login</Link>
              </p>
              <div>
                <button
                  onClick={() => handleChangeLanguage("en")}
                  // style={{
                  //     fontWeight: i18n.resolvedLanguage === languages.en ? "bold" : "normal",
                  // }}
                >
                  {languages.en.displayName}
                </button>
                <button
                  onClick={() => handleChangeLanguage("ja")}
                  // style={{
                  //     fontWeight: i18n.resolvedLanguage === languages.ja ? "bold" : "normal",
                  // }}
                >
                  {languages.ja.displayName}
                </button>
              </div>
            </div>
          )}
          <div className="relative">
            <button
              onClick={handleDotClick}
              className="relative px-1 bg-transparent focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="white"
                className="w-6 h-6 cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
            {/* Dropdown */}
            {dropdownOpen && (
              <div className="fixed right-[100px] mt-2 bg-white rounded-md shadow-lg w-[200px] z-[9999]">
                <ul className="py-1 text-center">
                  {token ? (
                    <Link to="/profile">
                      <li className="flex items-center justify-start gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          />
                        </svg>

                        <Link to="/profile">{t("PROFILE")}</Link>
                      </li>
                    </Link>
                  ) : (
                    ""
                  )}
                  {token ? (
                    ""
                  ) : (
                    <Link to="/register-page">
                      <li className="flex items-center justify-start gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/register-page">{t("SIGN_UP")}</Link>
                      </li>
                    </Link>
                  )}
                  {token ? (
                    <Link to="/logout">
                      <li className="flex items-center justify-start gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/logout">{t("SIGN_OUT")}</Link>
                      </li>
                    </Link>
                  ) : (
                    <Link to="/login-page">
                      <li className="flex items-center justify-start gap-2 px-2 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
                          />
                        </svg>

                        <Link to="/login-page">{t("SIGN_IN")}</Link>
                      </li>
                    </Link>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
