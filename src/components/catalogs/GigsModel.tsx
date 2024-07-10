import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { hasImageExtension } from '../../utils/imgExtension';

interface Gig {
    title: string;
    description: string;
}

interface GigModalProps {
    isOpen: boolean;
    onClose: () => void;
    gigs: any;
}

const GigModal: React.FC<GigModalProps> = ({ isOpen, onClose, gigs }) => {
    const [loading, setLoading] = useState(true);
    const router = useNavigate();

    useEffect(() => {
        if (gigs) {
            setLoading(false);
        }
    }, [gigs]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-5xl w-full">
                <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">Gigs</h2>
                    <button onClick={onClose} className="text-xl font-bold">&times;</button>
                </div>
               <div className='mt-4'>
               {loading ? (
                    "Loading..."
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {gigs && gigs.length > 0 ? (
                            gigs.map((item:any, index:any) => {
                                const arrayImages = item?.imageUrl?.split(",");
                                return <div
                                    className="mb-4 px-2 py-4 space-y-4 text-white hover:bg-[#f1f1f1] cursor-pointer border border-yellow-400 rounded-lg bg-white"
                                    style={{
                                        boxShadow:
                                            "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
                                    }}
                                    onClick={(e) => router(`/gig/` + item.id)}
                                >
                                    <div className="items-center text-black relative">

                                        <div className="w-full h-full bg-cover">


                                            <>
                                                {/* Ensure key is unique and at the top element */}
                                                {hasImageExtension(arrayImages[0]) ? (
                                                    <div className=" ">
                                                        <img
                                                            className="w-full h-[200px] object-cover rounded-lg "
                                                            src={arrayImages[0]}
                                                            alt="Blog Post Image"
                                                        />
                                                    </div>
                                                ) : (
                                                    <div className=" ">
                                                        <video
                                                            controls
                                                            className="w-full h-[200px] object-cover rounded-lg "
                                                            src={arrayImages[0]}
                                                        />
                                                    </div>
                                                )}
                                            </>

                                        </div>

                                        <div className="flex flex-col">

                                            <h3>{item.title}</h3>
                                            <p className="text-start font-bold text-green">
                                                Price {item.price} ¥{" "}
                                            </p>
                                            <button
                                                onClick={(e) => router(`/gig/` + item.id)}
                                                className="p-2 rounded-lg cursor-pointer bg-[#2dd4bf] text-white hover:bg-black hover:text-white"
                                            >
                                                See More
                                            </button>
                                            {
                                                item.teacherId != localStorage.getItem("teacher_id") &&
                                                <Link
                                                    to="/message-page"
                                                    className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                                                >
                                                    Chat
                                                </Link>
                                            }
                                            {
                                                item.teacherId != localStorage.getItem("teacher_id") &&
                                                < Link
                                                    to="/gig"
                                                    className="text-center bg-[#2dd4bf] text-white p-2 mt-2 rounded-lg cursor-pointer hover:bg-black hover:text-white"
                                                >
                                                    Buy Gig
                                                </Link>
                                            }

                                        </div>
                                    </div>
                                </div>
                            })
                        ) : (
                            <p>No gigs available.</p>
                        )}
                    </div>
                )}
               </div>
            </div>
        </div>
    );
};

export default GigModal;
