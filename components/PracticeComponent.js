
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import PracticeTimer from './PracticeTimer';

const PracticeComponent = ({ topic }) => {
    const router = useRouter();

    return (
        <>
            <PracticeTimer
                initialTime={1800}
                onTimeEnd={() => {
                    alert('Time is up!');
                    router.push('/practice');
                }}/>

                <div className="bg-white rounded-3xl w-full max-w-7xl flex flex-wrap relative">
                    <div className="md:py-10 md:px-6 px-4 py-6 flex flex-col w-full">
                        <div className="w-full h-2 bg-gray-200 rounded-full mb-6"></div>

                        {/* Display Topic Dynamically */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-gray-800 font-bold md:text-xl text-md">
                                Question:
                            </h2>
                        </div>

                        <hr />
                    </div>
                </div>
        </>
    );
};

export default PracticeComponent;
