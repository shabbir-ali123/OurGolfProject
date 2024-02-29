import { Fragment, useState } from 'react'
import { Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/20/solid'
import { useTranslation } from "react-i18next";
export default function AllNotification() {
    const [show, setShow] = useState(true)
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();
    return (
        <>
            <div className='max-w-5xl mx-auto'>
                <h4>{t("ALL_NOTIFICATION")}</h4>
                <div
                    aria-live="assertive"
                    className=" h-screen animate__animated animate__fadeInLeft "
                >

                    <div className="flex w-full h-[150px] justify-center my-4">

                        <Transition
                            show={show}
                            as={Fragment}
                            enter="transform ease-out duration-300 transition"
                            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="pointer-events-auto w-full max-w-5xl rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                    <div className="flex items-center justify-center pt-0.5 border-2 border-solid border-[#17b3a6] rounded-full p-1 h-8 w-8">
                                           
                                            <BellIcon className="h-6 w-6    text-[#17b3a6]" />
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
                                            <p className="mt-1 text-sm text-gray-500">Sent you an invite to connect.</p>
                                            <div className="mt-4 flex">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    {t("ACCEPT")}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    {t("DECLINE")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            20 {t("MIN_AGO")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                    <div className="flex w-full h-[150px] justify-center my-4">

<Transition
    show={show}
    as={Fragment}
    enter="transform ease-out duration-300 transition"
    enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
    enterTo="translate-y-0 opacity-100 sm:translate-x-0"
    leave="transition ease-in duration-100"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
>
    <div className="pointer-events-auto w-full max-w-5xl rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
        <div className="p-4">
            <div className="flex items-start">
            <div className="flex items-center justify-center pt-0.5 border-2 border-solid border-[#17b3a6] rounded-full p-1 h-8 w-8">
                   
                    <BellIcon className="h-6 w-6    text-[#17b3a6]" />
                </div>
                <div className="ml-3 w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
                    <p className="mt-1 text-sm text-gray-500">Sent you an invite to connect.</p>
                    <div className="mt-4 flex">
                        <button
                            type="button"
                            className="inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            {t("ACCEPT")}
                        </button>
                        <button
                            type="button"
                            className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            {t("DECLINE")}
                        </button>
                    </div>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                    20 {t("MIN_AGO")}
                </div>
            </div>
        </div>
    </div>
</Transition>
</div>
<div className="flex w-full h-[150px] justify-center my-4">

                        <Transition
                            show={show}
                            as={Fragment}
                            enter="transform ease-out duration-300 transition"
                            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="pointer-events-auto w-full max-w-5xl rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="p-4">
                                    <div className="flex items-start">
                                    <div className="flex items-center justify-center pt-0.5 border-2 border-solid border-[#17b3a6] rounded-full p-1 h-8 w-8">
                                           
                                            <BellIcon className="h-6 w-6    text-[#17b3a6]" />
                                        </div>
                                        <div className="ml-3 w-0 flex-1">
                                            <p className="text-sm font-medium text-gray-900">Emilia Gates</p>
                                            <p className="mt-1 text-sm text-gray-500">Sent you an invite to connect.</p>
                                            <div className="mt-4 flex">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center rounded-md bg-[#17b3a6] px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                >
                                                    {t("ACCEPT")}
                                                </button>
                                                <button
                                                    type="button"
                                                    className="ml-3 inline-flex items-center rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                                >
                                                    {t("DECLINE")}
                                                </button>
                                            </div>
                                        </div>
                                        <div className="ml-4 flex flex-shrink-0">
                                            20 {t("MIN_AGO")}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Transition>
                    </div>
                </div>
            </div>

        </>
    )
}
