import React, { useState } from "react";
import { useEnhancedVotingDAO } from './ContractInteraction';
import { useAddress, useContractWrite } from "@thirdweb-dev/react";

const Projectinfo = () => {
    const address = useAddress();
    const contractAddress = process.env.REACT_APP_ADDRESS;
    const [area, setArea] = useState('');
    const [designation, setDesignation] = useState('');
    const [name, setName] = useState('');
    const [sector, setSector] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');
    const [politicianAddress, setPoliticianAddress] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false); // Add this line

    const {
        useReadProjectDetails,
        useReadPoliticianDetails,
        useReadPoliticianReputation,
        useReadTotalUsers,
        useWriteCreateProject,
        useWriteVote,
        useWriteUpdateProjectStatus,
        useWriteAddMilestone,
        useWriteUpdateMilestone,
        useWriteSubmitFeedback,
        useWriteAddSector,
        useWriteRegisterPolitician,
        useWriteAssignPolitician,
        useWriteRegisterUser,
        useReadIndividualFeedback,
        useReadIndividualProjectFeedback,
        useReadPoliticianProfessionalDetails,
        useReadIsAdmin,
        useWriteRegisterAdmin
    } = useEnhancedVotingDAO(contractAddress);

    const { data: politicianDetails } = useReadPoliticianDetails(address, "getPoliticianDetails");


    const { data: reputation, error: reputationError } = useReadPoliticianReputation(address, sector);


    // registerpolitician
    const { mutateAsync: registerPolitician } = useWriteRegisterPolitician(address, "registerPolitician");


    // Registering the Politician const
    const handleRegisterPolitician = async (e) => {
        e.preventDefault(); // Add this line to prevent form submission
        try {
            setRegisterLoading(true); // Set loading to true when starting registration
            console.log("Registering politician with address: ", address);
            await registerPolitician({ args: [area, designation, name] });
            alert("Successfully registered as a Politician!");
        } catch (error) {
            console.error("Error registering the politician:", error);
            setError("Failed to register politician. Please try again."); // Set error message
        } finally {
            setRegisterLoading(false); // Set loading back to false when registration is complete
        }
    };

    const handleGetPoliticianDetails = async (e) => {
        e.preventDefault(); // Add this line to prevent form submission
        // Implementation for getting politician details
        try {
            await politicianDetails({ args: [politicianAddress] });
        }

        catch (error) {
            alert(error);
            console.error("Error fetching politician details: ", error);
        }
    };

    const handleFetchReputation = async (e) => {
        try {
            await reputation({ args: [politicianAddress] });
        }
        catch (error) {
            console.error("Error while fetching reputation: ", error)
        }
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-8 mt-10 max-w-4xl mx-auto">
            <h2 className="text-4xl font-semibold text-gray-800 border-b-2 pb-4 mb-8 border-blue-500">
                Politician Information Center
            </h2>

            {/* Get Politician Details Form */}
            <form onSubmit={handleGetPoliticianDetails} className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get Politician Details</h3>
                <input
                    type="text"
                    value={politicianAddress}
                    onChange={(e) => setPoliticianAddress(e.target.value)}
                    placeholder="Politician's Address"
                    className="shadow-md bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                    required
                />
                <button
                    type="submit"
                    className="mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-6 py-3 w-full"
                >
                    Fetch Details
                </button>
            </form>

            {/* Get Politician Reputation Form */}
            <div className="mb-12">
                <h3 className="text-2xl font-semibold text-gray-900 mb-6">Get Politician Reputation</h3>
                <div className="grid grid-cols-2 gap-6">
                    <input
                        type="text"
                        value={politicianAddress}
                        onChange={(e) => setPoliticianAddress(e.target.value)}
                        placeholder="Politician's Address"
                        className="shadow-md bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        required
                    />
                    <input
                        type="number"
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        placeholder="Sector ID"
                        className="shadow-md bg-gray-100 border border-gray-300 text-gray-800 text-base rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-4"
                        required
                    />
                </div>
                <button
                    onClick={handleFetchReputation}
                    type="submit"
                    className="mt-8 text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-semibold rounded-lg text-lg px-6 py-3 w-full"
                >
                    Fetch Reputation
                </button>
            </div>

            {error && <p className="text-red-600 text-base mb-6">{error}</p>}

            {reputationError && (
                <p className="text-red-600 text-base mb-6">Error fetching reputation: {reputationError.message}</p>
            )}

            {reputation !== undefined && (
                <div className="bg-gray-50 border border-gray-300 rounded-lg p-6 mb-8">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-4">Politician Reputation</h3>
                    <p className="text-lg text-gray-700">Reputation in Sector {sector}: {reputation.toString()}</p>
                </div>
            )}

            {/* Modal for Politician Details */}
            {isModalOpen && politicianDetails && (
                <div
                    className="fixed inset-0 bg-gray-700 bg-opacity-75 overflow-y-auto h-full w-full"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="relative top-32 mx-auto p-8 border max-w-md shadow-lg rounded-lg bg-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h3 className="text-2xl font-semibold text-gray-900 mb-4">Politician Details</h3>
                        <div className="text-left">
                            <p className="text-base text-gray-600">Entry Date: {new Date(politicianDetails.entryDate.toNumber() * 1000).toLocaleDateString()}</p>
                            <p className="text-base text-gray-600">Projects Completed: {politicianDetails.projectsCompleted.toString()}</p>
                            <p className="text-base text-gray-600">Area: {politicianDetails.areaUnderAdministration}</p>
                            <p className="text-base text-gray-600">Designation: {politicianDetails.designation}</p>
                            <p className="text-base text-gray-600">Name: {politicianDetails.name}</p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="mt-6 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg w-full hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

}
    export default Projectinfo;