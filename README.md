# EnhancedVotingDAO Smart Contract

## Table of Contents
- [EnhancedVotingDAO Smart Contract](#enhancedvotingdao-smart-contract)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Contract Structure](#contract-structure)
  - [How It Works](#how-it-works)
  - [Functions](#functions)
    - [Admin Functions](#admin-functions)
    - [Citizen Functions](#citizen-functions)
    - [Politician Functions](#politician-functions)
    - [View Functions](#view-functions)
  - [Testing Mode](#testing-mode)
  - [Security Considerations](#security-considerations)
  - [Deployment and Interaction](#deployment-and-interaction)

## Introduction

The EnhancedVotingDAO is a Solidity smart contract designed to facilitate decentralized decision-making and project management in a government or organizational context. It allows citizens to vote on projects, politicians to manage projects, and provides a transparent system for tracking project progress and politician performance.

This contract is particularly useful for:
- Local governments wanting to implement participatory budgeting
- Organizations seeking to involve stakeholders in decision-making processes
- Communities aiming to manage and track public projects transparently

## Features

- Project creation and management
- Citizen voting system
- Politician registration and assignment
- Project milestone tracking
- Feedback submission for completed projects
- Dynamic project severity calculation based on votes
- Politician reputation system
- Sector-based project categorization

## Contract Structure

The contract uses several key data structures:

1. `Project`: Represents a proposed or ongoing project.
2. `Politician`: Stores information about registered politicians.
3. `Vote`: Represents a citizen's vote on a project.
4. `Milestone`: Represents a project milestone.
5. `Feedback`: Stores citizen feedback on completed projects.

## How It Works

1. **Project Creation**: Admins or citizens can create new projects, specifying a name and sector.

2. **Voting**: Citizens can vote on proposed projects. The number of votes influences the project's severity level.

3. **Politician Registration**: Politicians can register themselves, providing their area of administration and designation.

4. **Project Assignment**: Admins can assign registered politicians to projects.

5. **Project Management**: Assigned politicians can update project status and add or update milestones.

6. **Project Completion**: When a project is marked as completed, the assigned politician's reputation is updated based on the project's severity.

7. **Feedback**: Citizens can submit feedback (likes/dislikes and comments) on completed projects.

## Functions

### Admin Functions
- `addAdmin(address _newAdmin)`: Add a new admin (testing mode only).
- `addSector(uint256 _sectorId, string memory _name)`: Add a new sector for project categorization.
- `assignPolitician(uint256 _projectId, address _politician)`: Assign a politician to a project.

### Citizen Functions
- `createProject(string memory _name, uint256 _sector)`: Create a new project.
- `vote(uint256 _projectId, bool _inFavor)`: Vote on a project.
- `submitFeedback(uint256 _projectId, bool _liked, string memory _comment)`: Submit feedback on a completed project.
- `registerUser()`: Register as a user to participate in voting.

### Politician Functions
- `registerPolitician(string memory _area, string memory _designation)`: Register as a politician.
- `updateProjectStatus(uint256 _projectId, ProjectStatus _newStatus)`: Update the status of an assigned project.
- `addMilestone(uint256 _projectId, string memory _description, uint256 _targetDate)`: Add a milestone to an assigned project.
- `updateMilestone(uint256 _projectId, uint256 _milestoneIndex, MilestoneStatus _newStatus)`: Update the status of a project milestone.

### View Functions
- `getProjectDetails(uint256 _projectId)`: Get detailed information about a project.
- `getPoliticianDetails(address _politician)`: Get information about a registered politician.
- `getPoliticianReputation(address _politician, uint256 _sector)`: Get a politician's reputation in a specific sector.
- `getTotalUsers()`: Get the total number of registered users.

## Testing Mode

For testing purposes, this version of the contract allows:
- Any address to register as a politician using `registerPolitician()`.
- Any address to add themselves or others as admins using `addAdmin()`.

**Note**: This open registration should be removed or restricted in a production environment.

## Security Considerations

1. This contract uses `onlyAdmin` for sensitive functions. Ensure proper access control in production.
2. The open registration for politicians and admins in the testing mode should be replaced with a secure verification process in production.
3. Consider implementing a multi-signature wallet or a timelock for critical functions in production.
4. Thoroughly test and audit the contract before deploying it on the mainnet.

## Deployment and Interaction

1. Deploy the contract to your chosen Ethereum network (e.g., mainnet, testnet).
2. The deploying address becomes the initial admin.
3. Add sectors using the `addSector()` function.
4. Users can register using `registerUser()`.
5. Politicians can register using `registerPolitician()`.
6. Create projects, vote, and manage them according to your organization's governance rules.

Remember to replace the testing mode features with appropriate security measures before deploying in a production environment.