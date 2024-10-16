import React from "react";

const Homepage = () => {
    return (
        <div className="grid grid-cols-2 flex-grow ">

            <div className=" flex items-start justify-center ">
                <div className="text-6xl bg-gradient-to-tr font-bold from-green-500 to-orange-300 bg-clip-text text-transparent">
                    <p>Empower Your Vote</p>
                </div>

            </div>
            <div className=" items-center justify-center flex flex-col">
                <button type="button" class="text-white font-semibold -900 bg-green-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-100  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <svg class="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Register as a Voter
                </button>
                <button type="button" class="text-white font-semibold -900 bg-green-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-100  rounded-lg text-sm px-5 py-2.5 mt-5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
                    <svg class="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Register as a Politician
                </button>

                <button type="button" class="text-white font-semibold -900 bg-green-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-100  rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mt-5 mb-2">
                    <svg class="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
                    Register as Government Admin
                </button>



                <div className="text-center  text-gray-900 mt-28 bg-orange-500 h-40 rounded-md p-4">
                    <p className="text-white font-semibold text-lg">
                        Hold Local Politcians Accountable for What they Should Do!
                    </p>
                    <p className="text-justify text-white">
                        Indian locals don't know what their local politician is working on. Necessary developments aren't made even after too much proposals. It's high time that citizens take the power back and make the politicians work for which they get paid.
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Homepage;

// import React from "react";

// const Homepage = () => {
//     return (
//         <div className="grid grid-cols-2 h-screen">

//             {/* Empower Your Vote at the top */}
//             <div className="bg-red-400 flex items-start mt-8">
//                 <div className="text-6xl bg-gradient-to-tr font-bold from-green-500 to-orange-300 bg-clip-text text-transparent">
//                     <p>Empower Your Vote</p>
//                 </div>
//             </div>

//             {/* Rest of the content centered */}
//             <div className="flex flex-col items-center justify-center">
//                 <button type="button" className="text-gray-900 bg-green-400 hover:bg-orange-500 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 me-2 mb-2">
//                     <svg className="w-4 h-4 me-2 -ms-1 text-[#626890]" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="ethereum" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M311.9 260.8L160 353.6 8 260.8 160 0l151.9 260.8zM160 383.4L8 290.6 160 512l152-221.4-152 92.8z"></path></svg>
//                     Register as a Voter
//                 </button>
//                 <div className="text-center font-semibold text-lg text-gray-900">
//                     <p>Hold Local Politicians Accountable for What they Should Do!</p>
//                 </div>
//             </div>

//         </div>
//     );
// }

// export default Homepage;
