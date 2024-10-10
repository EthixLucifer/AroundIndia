// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
 
const GovernanceModule = buildModule("GovernanceModule", (m) => { 

  const enhacedGovernanceDao = m.contract("EnhancedVotingDAO", []);

  m.call(enhacedGovernanceDao, "createProject",["Road Construction",3 ]);

  m.call(enhacedGovernanceDao,"getProjectDetails",[0]);

  return { enhacedGovernanceDao };
});

export default GovernanceModule;
