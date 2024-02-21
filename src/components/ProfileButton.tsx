import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { API_ENDPOINTS } from "../appConfig";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { notificationsContextStore } from "../contexts/notification";
import { NotificationPop } from "./NotificationPop";

export default function ProfileButton() {
  const { notifications } = notificationsContextStore();
  const { t, i18n } = useTranslation();

  const languages = {
    en: { displayName: "English" },
    ja: { displayName: i18n.language === "en" ? "Japan" : "日本語" },
  };

  const [token, setToken] = useState("");
  const [user, setUser] = useState<any>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    getUser(userId)
      .then((userData) => {
        setUser(userData.user);
        localStorage.setItem("user", JSON.stringify(userData.user));
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDotClick = () => {
    setDropdownOpen((prevState) => !prevState);

    const timeoutId = setTimeout(() => {
      setDropdownOpen(false);
    }, 5000);

    return () => clearTimeout(timeoutId);
  };

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const getUser = async (userId: any) => {
    try {
      const token = localStorage.getItem("token");
      if (token && token !== "undefined") {
        const response = await axios.get(`${API_ENDPOINTS.GET_USER}${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      }
    } catch (error) {
      throw "sdf";
    }
  };

  return (
    <div className=" lg:flex lg:flex-1 lg:justify-end">
      <div className="relative flex-shrink-0 block">
        <div className="flex items-center">
          {token && user ? (
            <>
              <div className="flex items-center justify-center ">
                <img
                  onClick={handleDotClick}
                  className="inline-block h-8 w-8 cursor-pointer border-solid border border-[#ffffff] rounded-full p-1"
                  src={user?.imageUrl}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="m-0 text-base font-medium text-black group-hover:text-gray-900">
                  {user.nickName ? user.nickName : user.email}
                </p>
                <button
                  onClick={() => handleChangeLanguage("ja")}
                  className={
                    i18n.resolvedLanguage === "ja"
                      ? "actives  rounded-l-full p-1"
                      : "rounded-l-full p-1"
                  }
                >
                  {languages.ja.displayName}
                </button>
                <button
                  onClick={() => handleChangeLanguage("en")}
                  className={
                    i18n.resolvedLanguage === "en"
                      ? "actives rounded-r-full  p-1"
                      : "rounded-r-full p-1"
                  }
                >
                  {languages.en.displayName}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center ">
                <img
                  onClick={handleDotClick}
                  className="inline-block h-6 w-6 cursor-pointer border-solid border border-[#ffffff] rounded-full p-1"
                  src="/img/profile-page.png"
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="m-0 text-base font-medium text-white group-hover:text-gray-900">
                  <Link to="/login-page" className="text-black">
                    Login
                  </Link>
                </p>
                <div>
                  <button
                    onClick={() => handleChangeLanguage("ja")}
                    className={
                      i18n.resolvedLanguage === "ja"
                        ? "actives rounded-l-full p-1"
                        : "rounded-l-full p-1"
                    }
                  >
                    {languages.ja.displayName}
                  </button>
                  <button
                    onClick={() => handleChangeLanguage("en")}
                    className={
                      i18n.resolvedLanguage === "en"
                        ? "actives rounded-r-full p-1"
                        : "rounded-r-full p-1"
                    }
                  >
                    {languages.en.displayName}
                  </button>
                </div>
              </div>
            </>
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
                stroke="black"
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
          <div
            onClick={() => {
              setNotification(!notification);
            }}
            className="px-6"
          >
            <span>
              <div className="relative cursor-pointer">
                <svg
                  className="w-5 h-5 text-teal-600 animate-wiggle"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 21 21"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.585 15.5H5.415A1.65 1.65 0 0 1 4 13a10.526 10.526 0 0 0 1.5-5.415V6.5a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1.085c0 1.907.518 3.78 1.5 5.415a1.65 1.65 0 0 1-1.415 2.5zm1.915-11c-.267-.934-.6-1.6-1-2s-1.066-.733-2-1m-10.912 3c.209-.934.512-1.6.912-2s1.096-.733 2.088-1M13 17c-.667 1-1.5 1.5-2.5 1.5S8.667 18 8 17"
                  />
                </svg>
                <div className="absolute px-1 text-sm text-center text-white bg-teal-500 rounded-full -top-3 -end-2">
                  {notifications.length > 0 && notifications.length}
                  <div className="absolute top-0 w-full h-full bg-teal-200 rounded-full start-0 -z-10 animate-ping"></div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </div>
      {notification && (
        <NotificationPop
          notifcations={notifications}
          setNotification={setNotification}
        />
      )}
    </div>
  );
}
