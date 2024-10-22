import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";

export function useEnhancedVotingDAO(contractAddress) {
    const { contract } = useContract(contractAddress);

    // Read functions
    const useReadProjectDetails = (projectId) => useContractRead(contract, "getProjectDetails", [projectId]);
    const useReadIndividualFeedback = (projectId, userAddress) => useContractRead(contract, "projectFeedbacks", [projectId, userAddress]);
    const useReadIndividualProjectFeedback = (projectId, userAddress) => useContractRead(contract, "projectVotes", [projectId, userAddress]);

    const useReadPoliticianDetails = (politicianAddress) => useContractRead(contract, "getPoliticianDetails", [politicianAddress]);
    const useReadPoliticianProfessionalDetails = (politicianAddress) => useContractRead(contract, 'politicians', [politicianAddress]);

    const useReadPoliticianReputation = (politicianAddress, sector) => useContractRead(contract, "getPoliticianReputation", [politicianAddress, sector]);
    const useReadTotalUsers = () => useContractRead(contract, "getTotalUsers");
    const useReadIsAdmin = (address) => useContractRead(contract, "admins", [address]);



    // Write functions
    const useWriteCreateProject = () => useContractWrite(contract, "createProject");
    const useWriteVote = () => useContractWrite(contract, "vote");
    const useWriteUpdateProjectStatus = () => useContractWrite(contract, "updateProjectStatus");
    const useWriteAddMilestone = () => useContractWrite(contract, "addMilestone");
    const useWriteUpdateMilestone = () => useContractWrite(contract, "updateMilestone");
    const useWriteSubmitFeedback = () => useContractWrite(contract, "submitFeedback");
    const useWriteAddSector = () => useContractWrite(contract, "addSector");
    const useWriteRegisterPolitician = () => useContractWrite(contract, "registerPolitician");
    const useWriteAssignPolitician = () => useContractWrite(contract, "assignPolitician");
    const useWriteRegisterUser = () => useContractWrite(contract, "registerUser");
    const useWriteRegisterAdmin = () => useContractWrite(contract, "addAdmin");

    return {
        contract,
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
    };
}