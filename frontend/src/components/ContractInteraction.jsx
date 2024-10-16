import { useContract, useContractRead, useContractWrite } from "@thirdweb-dev/react";
import {ABI} from "../ABI/ABI.js";
export function useContractInteractions() {
  const CONTRACT_ADDRESS = process.env.REACT_APP_ADDRESS;
  
  
//   const { contract } = useContract(CONTRACT_ADDRESS);

  const { contract, isLoading, error } = useContract(
    CONTRACT_ADDRESS,
    ABI,
  );

  // Read functions
  const useReadBalance = () => useContractRead(contract, "balanceOf");
  const useReadTotalSupply = () => useContractRead(contract, "totalSupply");

  // Write functions
  const useWriteTransfer = () => useContractWrite(contract, "transfer");
  const useWriteMint = () => useContractWrite(contract, "mint");

  return {
    contract,
    useReadBalance,
    useReadTotalSupply,
    useWriteTransfer,
    useWriteMint,
  };
}