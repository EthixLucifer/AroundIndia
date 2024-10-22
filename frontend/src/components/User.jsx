import React, { useState } from "react";
import PoliticianInfoForUser from "./Politicianinfo";
import Projectinfo from "./Projectinfo";

const User = () => {
    const [sector, setSector] = useState("NULL");


    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="grid grid-cols-2 gap-6 ">
                {/* Left Side - Activity Summary and Propose Your Project */}
                <div className="space-y-6 ">

                    {/* Propose Your Project */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="font-bold text-xl text-gray-800 mb-3">Propose Your Project</h2>
                        <p className="text-sm text-gray-500 mb-4">Create a developmental proposal that requires immediate action of your local politicians</p>
                        <div className="space-y-5 max-w-md">
                            <div>
                                <input className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" placeholder="Name of the Proposal" required />
                            </div>
                            <div>
                                <textarea className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 min-h-[100px]" placeholder="Describe your proposal in detail..." required></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Select Sector</label>
                                <select className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option>Healthcare [1]</option>
                                    <option>Education [2]</option>
                                    <option>Infrastructure [3]</option>
                                    <option>Welfare [4]</option>
                                </select>
                            </div>
                            <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 w-full">
                                Create Proposal
                            </button>
                        </div>
                    </div>


                    {/* Activity Summary Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="font-bold text-xl text-gray-800 mb-3">Activity Summary</h2>
                        <p className="text-sm text-gray-500 mb-4">Overview of your recent activities</p>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Proposals Submitted:</span>
                                <span className="font-bold text-gray-900">5</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Feedback Given:</span>
                                <span className="font-bold text-gray-900">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Projects Followed:</span>
                                <span className="font-bold text-gray-900">8</span>
                            </div>
                        </div>
                    </div>

                    {/* Recent Proposals Section */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="font-bold text-xl text-gray-800 mb-3">Recent Proposals</h2>
                        <p className="text-sm text-gray-500 mb-4">Your most recent project proposals</p>
                        <ul className="space-y-2">
                            <li className="border-b pb-2 text-gray-700">Improve City Park Facilities</li>
                            <li className="border-b pb-2 text-gray-700">Increase Funding for Local Schools</li>
                            <li className="border-b pb-2 text-gray-700">Implement Recycling Program</li>
                        </ul>
                    </div>

                    {/* /////// */}
                    {/* Fetching the Project Information */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <Projectinfo />
                    </div>
                </div>

                {/* Right Side - Submit Feedback and Other Content */}
                <div className="space-y-6">
                    {/* Submit Feedback */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <h2 className="font-bold text-xl text-gray-800 mb-3">Submit Feedback</h2>
                        <p className="text-sm text-gray-500 mb-4">Submit your feedback for the completed projects</p>
                        <div className="space-y-5 max-w-md">
                            <div>
                                <input className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3" placeholder="Enter Project ID" required />
                            </div>
                            <div>
                                <textarea className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 min-h-[100px]" placeholder="Describe your feedback in detail" required></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Satisfactory Completion</label>
                                <select className="shadow-sm bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                            <button type="submit" className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-3 w-full">
                                Submit Feedback
                            </button>
                        </div>
                    </div>

                    {/* Fetching the Details of the Politicians */}
                    <div className="p-6 bg-white rounded-lg shadow-md">
                        <PoliticianInfoForUser />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default User;