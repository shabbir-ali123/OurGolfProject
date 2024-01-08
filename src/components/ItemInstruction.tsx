import React, { useRef } from "react";
import { useTranslation } from "react-i18next";

const ItemInstruction: React.FC = () => {
const {t, i18n} = useTranslation();
document.body.dir = i18n.dir();

  return (
    <div className="px-2 mx-auto lg:max-w-6xl ">
      <h2 className="text-[#0f1e56] text-4xl">
        {t('PARTICIPANTS_ITEMS')}
      </h2>
      <div className="py-6 bg-gradient-to-b from-[rgba(167,255,193,0.34)] via-transparent to-transparent rounded-3xl mt-4 border-solid border-2 border-[#51ff85]">
        <p className="px-16">
        {t('INSTRUCTION')}
        </p>
        <div className="gap-16 lg:flex">
          <div className="col-span-8 gap-24 py-2 mx-16 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex items-center col-span-3 gap-2 py-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="py-1 m-0">{t('FULL_NAME')}</h4>
                <p className="m-0">{t('NAME_EXAMPLE')}</p>
              </div>
            </div>
            <div className="flex items-center col-span-3 gap-2">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="py-1 m-0">{t('EMAIL')}</h4>
                <p className="m-0">{t('EMAIL_EXAMPLE')}</p>
              </div>
            </div>
          </div>
          <div className="col-span-8 gap-24 py-2 mx-16 lg:col-span-4 md:col-span-5 md:mr-0 md:mb-3">
            <div className="flex items-center col-span-3 gap-2 py-4">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="py-1 m-0">{t('TELEPHONE')}</h4>
                <p className="m-0">{t('TELEPHONE_EXAMPLE')}</p>
              </div>
            </div>
            <div className="flex items-center col-span-3 gap-2">
              <svg
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M25 12.5C25 19.4035 19.4035 25 12.5 25C5.59644 25 0 19.4035 0 12.5C0 5.59644 5.59644 0 12.5 0C19.4035 0 25 5.59644 25 12.5ZM17.5379 8.71209C17.904 9.0782 17.904 9.6718 17.5379 10.0379L11.2879 16.2879C10.9218 16.654 10.3282 16.654 9.96209 16.2879L7.46209 13.7879C7.09597 13.4218 7.09597 12.8282 7.46209 12.4621C7.8282 12.096 8.4218 12.096 8.78791 12.4621L10.625 14.2991L13.4185 11.5056L16.2121 8.71209C16.5782 8.34597 17.1718 8.34597 17.5379 8.71209Z"
                  fill="#52FF86"
                />
              </svg>
              <div>
                <h4 className="py-1 m-0">{t('HANDICAP_SCORE')}</h4>
                <p className="m-0">{t('HANDICAP_EXAMPLE')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemInstruction;
