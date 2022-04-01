import React from 'react';
import ProfileSettingsImage from "../../images/admin-profile.jpg"


export default function AdminProfile(){
    return(
        <>
                        <div
            class="m-10 grid grid-cols-1 overflow-hidden border border-gray-100 rounded-lg group sm:grid-cols-3"
            href=""
            >
            <div class="relative">
                <img
                class="absolute inset-0 object-cover w-full h-full"
                src={ProfileSettingsImage}
                alt=""
                />
            </div>

            <div class="p-8 sm:col-span-2">
                <ul class="flex space-x-1">
                <li
                    class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full"
                >
                    Notice
                </li>

                <li
                    class="inline-block px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full"
                >
                    Information
                </li>
                </ul>

                <h5 class="mt-4 font-bold">Lorem ipsum dolor sit amet.</h5>

                <p class="mt-2 text-sm text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
                adipisci!
                </p>
            </div>
            </div>
        </>
    )

}