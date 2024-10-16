/*

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnhancedVotingDAO is Ownable {

    enum ProjectStatus { Proposed, Approved, InProgress, Completed, Cancelled }
    enum MilestoneStatus { Pending, Completed, Delayed }
    enum Severity { Important, VeryImportant, Critical }

    struct Vote {
        bool inFavor;
        uint256 weight;
    }

    struct Milestone {
        string description;
        uint256 targetDate;
        //string proofURL;
        MilestoneStatus status;
    }

    struct Project {
        string name;
        uint256 sector;
        address assignedPolitician;
        ProjectStatus status;
        uint256 startDate;
        uint256 endDate;
        uint256 completionPercentage;
        uint256 totalVotes;
        uint256 likes;
        uint256 dislikes;
        Milestone[] milestones;
        Severity severity;
    }

    struct Feedback {
        bool liked;
        string comment;
    }

    struct Politician {
        uint256 entryDate;
        uint256 projectsCompleted;
        mapping(uint256 => uint256) sectorReputation;
        string areaUnderAdministration;
        string designation;
    }

    uint256 private _projectIdCounter;
    uint256 private _userCounter;

    mapping(uint256 => Project) public projects;
    mapping(uint256 => mapping(address => Vote)) public projectVotes;
    mapping(uint256 => mapping(address => Feedback)) public projectFeedbacks;
    mapping(uint256 => string) public sectors;
    mapping(address => Politician) public politicians;
    mapping(uint256 => uint256) private _projectVoteCounts;

    uint256 public constant IMPORTANT_THRESHOLD = 39;
    uint256 public constant VERY_IMPORTANT_THRESHOLD = 55;

    event ProjectCreated(uint256 indexed projectId, string name, uint256 sector, Severity severity);
    event ProjectVoted(uint256 indexed projectId, address indexed voter, bool inFavor, uint256 weight);
    event ProjectStatusUpdated(uint256 indexed projectId, ProjectStatus newStatus);
    event MilestoneAdded(uint256 indexed projectId, uint256 milestoneIndex, string description);
    event MilestoneUpdated(uint256 indexed projectId, uint256 milestoneIndex, MilestoneStatus newStatus);
    event FeedbackSubmitted(uint256 indexed projectId, address indexed citizen, bool liked);
    event SectorAdded(uint256 indexed sectorId, string name);
    event PoliticianRegistered(address indexed politician, string areaUnderAdministration, string designation);
    event ReputationUpdated(address indexed politician, uint256 sector, uint256 points);

    constructor() Ownable(msg.sender) {
        // Initialize default sectors
        sectors[1] = "Healthcare";
        sectors[2] = "Education";
        sectors[3] = "Infrastructure";
        sectors[4] = "Welfare";
    }

    function createProject(string memory _name, uint256 _sector) public returns (uint256) {
        require(bytes(sectors[_sector]).length > 0, "Invalid sector");
        uint256 newProjectId = _projectIdCounter;
        _projectIdCounter = _projectIdCounter++;

        Project storage newProject = projects[newProjectId];
        newProject.name = _name;
        newProject.sector = _sector;
        newProject.status = ProjectStatus.Proposed;
        newProject.severity = Severity.Important; // Default severity

        emit ProjectCreated(newProjectId, _name, _sector, newProject.severity);
        return newProjectId;
    }

    function vote(uint256 _projectId, bool _inFavor) public {
        require(projectVotes[_projectId][msg.sender].weight == 0, "Already voted on this project");

        projectVotes[_projectId][msg.sender] = Vote(_inFavor, 1);
        _projectVoteCounts[_projectId]++;

        if (_inFavor) {
            projects[_projectId].totalVotes++;
        }

        updateProjectSeverity(_projectId);

        emit ProjectVoted(_projectId, msg.sender, _inFavor, 1);
    }

    function updateProjectSeverity(uint256 _projectId) internal {
        uint256 votePercentage = (_projectVoteCounts[_projectId] * 100) / _userCounter;
        
        if (votePercentage >= VERY_IMPORTANT_THRESHOLD) {
            projects[_projectId].severity = Severity.Critical;
        } else if (votePercentage >= IMPORTANT_THRESHOLD) {
            projects[_projectId].severity = Severity.VeryImportant;
        } else {
            projects[_projectId].severity = Severity.Important;
        }
    }

    function updateProjectStatus(uint256 _projectId, ProjectStatus _newStatus) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can update status");
        projects[_projectId].status = _newStatus;

        if (_newStatus == ProjectStatus.InProgress && projects[_projectId].startDate == 0) {
            projects[_projectId].startDate = block.timestamp;
        } else if (_newStatus == ProjectStatus.Completed && projects[_projectId].endDate == 0) {
            projects[_projectId].endDate = block.timestamp;
            updatePoliticianReputation(_projectId);
        }

        emit ProjectStatusUpdated(_projectId, _newStatus);
    }

    function updatePoliticianReputation(uint256 _projectId) internal {
        Project storage project = projects[_projectId];
        Politician storage politician = politicians[project.assignedPolitician];

        uint256 reputationPoints;
        if (project.severity == Severity.Important) {
            reputationPoints = 10;
        } else if (project.severity == Severity.VeryImportant) {
            reputationPoints = 20;
        } else {
            reputationPoints = 30;
        }

        politician.sectorReputation[project.sector] += reputationPoints;
        politician.projectsCompleted++;

        emit ReputationUpdated(project.assignedPolitician, project.sector, reputationPoints);
    }

    function addMilestone(uint256 _projectId, string memory _description, uint256 _targetDate) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can add milestones");

        Milestone memory newMilestone = Milestone({
            description: _description,
            targetDate: _targetDate,
            status: MilestoneStatus.Pending
        });

        projects[_projectId].milestones.push(newMilestone);

        emit MilestoneAdded(_projectId, projects[_projectId].milestones.length - 1, _description);
    }

    function updateMilestone(uint256 _projectId, uint256 _milestoneIndex, MilestoneStatus _newStatus) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can update milestones");
        require(_milestoneIndex < projects[_projectId].milestones.length, "Invalid milestone index");

        projects[_projectId].milestones[_milestoneIndex].status = _newStatus;
        emit MilestoneUpdated(_projectId, _milestoneIndex, _newStatus);

        updateProjectCompletion(_projectId);
    }

    function updateProjectCompletion(uint256 _projectId) internal {
        uint256 totalMilestones = projects[_projectId].milestones.length;
        uint256 completedMilestones = 0;

        for (uint256 i = 0; i < totalMilestones; i++) {
            if (projects[_projectId].milestones[i].status == MilestoneStatus.Completed) {
                completedMilestones++;
            }
        }

        projects[_projectId].completionPercentage = totalMilestones > 0 ? (completedMilestones * 100) / totalMilestones : 0;
    }

    function submitFeedback(uint256 _projectId, bool _liked, string memory _comment) public {
        require(bytes(projectFeedbacks[_projectId][msg.sender].comment).length == 0, "Feedback already submitted");

        projectFeedbacks[_projectId][msg.sender] = Feedback(_liked, _comment);

        if (_liked) {
            projects[_projectId].likes++;
        } else {
            projects[_projectId].dislikes++;
        }

        emit FeedbackSubmitted(_projectId, msg.sender, _liked);
    }

    function addSector(uint256 _sectorId, string memory _name) public onlyOwner {
        require(bytes(sectors[_sectorId]).length == 0, "Sector ID already exists");
        sectors[_sectorId] = _name;
        emit SectorAdded(_sectorId, _name);
    }

    function registerPolitician(address _politician, string memory _area, string memory _designation) public onlyOwner {
        require(politicians[_politician].entryDate == 0, "Politician already registered");
        
        Politician storage newPolitician = politicians[_politician];
        newPolitician.entryDate = block.timestamp;
        newPolitician.areaUnderAdministration = _area;
        newPolitician.designation = _designation;

        emit PoliticianRegistered(_politician, _area, _designation);
    }

    function assignPolitician(uint256 _projectId, address _politician) public onlyOwner {
        require(politicians[_politician].entryDate != 0, "Politician not registered");
        projects[_projectId].assignedPolitician = _politician;
    }

    function registerUser() public {
        require(projectVotes[0][msg.sender].weight == 0, "User already registered");
        _userCounter = _userCounter++;
        projectVotes[0][msg.sender].weight = 1; // Use project 0 as a dummy project for user registration
    }

    function getProjectDetails(uint256 _projectId) public view returns (
        string memory name,
        string memory sector,
        address assignedPolitician,
        ProjectStatus status,
        uint256 startDate,
        uint256 endDate,
        uint256 completionPercentage,
        uint256 totalVotes,
        uint256 likes,
        uint256 dislikes,
        Severity severity
    ) {
        Project storage project = projects[_projectId];
        return (
            project.name,
            sectors[project.sector],
            project.assignedPolitician,
            project.status,
            project.startDate,
            project.endDate,
            project.completionPercentage,
            project.totalVotes,
            project.likes,
            project.dislikes,
            project.severity
        );
    }

    function getPoliticianDetails(address _politician) public view returns (
        uint256 entryDate,
        uint256 projectsCompleted,
        string memory areaUnderAdministration,
        string memory designation
    ) {
        Politician storage politician = politicians[_politician];
        return (
            politician.entryDate,
            politician.projectsCompleted,
            politician.areaUnderAdministration,
            politician.designation
        );
    }

    function getPoliticianReputation(address _politician, uint256 _sector) public view returns (uint256) {
        return politicians[_politician].sectorReputation[_sector];
    }

    function getTotalUsers() public view returns (uint256) {
        return _userCounter;
    }
}   
*/

/* Allows anyone to become an admin and become a politician */
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnhancedVotingDAO is Ownable {

    enum ProjectStatus { Proposed, Approved, InProgress, Completed, Cancelled }
    enum MilestoneStatus { Pending, Completed, Delayed }
    enum Severity { Important, VeryImportant, Critical }

    struct Vote {
        bool inFavor;
        uint256 weight;
    }

    struct Milestone {
        string description;
        uint256 targetDate;
        MilestoneStatus status;
    }

    struct Project {
        string name;
        uint256 sector;
        address assignedPolitician;
        ProjectStatus status;
        uint256 startDate;
        uint256 endDate;
        uint256 completionPercentage;
        uint256 totalVotes;
        uint256 likes;
        uint256 dislikes;
        Milestone[] milestones;
        Severity severity;
    }

    struct Feedback {
        bool liked;
        string comment;
    }

    struct Politician {
        uint256 entryDate;
        uint256 projectsCompleted;
        mapping(uint256 => uint256) sectorReputation;
        string areaUnderAdministration;
        string designation;
    }

    uint256 private _projectIdCounter;
    uint256 private _userCounter;

    mapping(uint256 => Project) public projects;
    mapping(uint256 => mapping(address => Vote)) public projectVotes;
    mapping(uint256 => mapping(address => Feedback)) public projectFeedbacks;
    mapping(uint256 => string) public sectors;
    mapping(address => Politician) public politicians;
    mapping(uint256 => uint256) private _projectVoteCounts;
    mapping(address => bool) public admins;

    uint256 public constant IMPORTANT_THRESHOLD = 39;
    uint256 public constant VERY_IMPORTANT_THRESHOLD = 55;

    event ProjectCreated(uint256 indexed projectId, string name, uint256 sector, Severity severity);
    event ProjectVoted(uint256 indexed projectId, address indexed voter, bool inFavor, uint256 weight);
    event ProjectStatusUpdated(uint256 indexed projectId, ProjectStatus newStatus);
    event MilestoneAdded(uint256 indexed projectId, uint256 milestoneIndex, string description);
    event MilestoneUpdated(uint256 indexed projectId, uint256 milestoneIndex, MilestoneStatus newStatus);
    event FeedbackSubmitted(uint256 indexed projectId, address indexed citizen, bool liked);
    event SectorAdded(uint256 indexed sectorId, string name);
    event PoliticianRegistered(address indexed politician, string areaUnderAdministration, string designation);
    event ReputationUpdated(address indexed politician, uint256 sector, uint256 points);
    event AdminAdded(address indexed newAdmin);

    constructor() Ownable(msg.sender) {
        // Initialize default sectors
        sectors[1] = "Healthcare";
        sectors[2] = "Education";
        sectors[3] = "Infrastructure";
        sectors[4] = "Welfare";
        
        // Set the contract deployer as the initial admin
        admins[msg.sender] = true;
    }

    modifier onlyAdmin() {
        require(admins[msg.sender], "Only admins can perform this action");
        _;
    }

    function addAdmin(address _newAdmin) public {
        admins[_newAdmin] = true;
        emit AdminAdded(_newAdmin);
    }

    function createProject(string memory _name, uint256 _sector) public returns (uint256) {
        require(bytes(sectors[_sector]).length > 0, "Invalid sector");
        uint256 newProjectId = _projectIdCounter;
        _projectIdCounter++;

        Project storage newProject = projects[newProjectId];
        newProject.name = _name;
        newProject.sector = _sector;
        newProject.status = ProjectStatus.Proposed;
        newProject.severity = Severity.Important; // Default severity

        emit ProjectCreated(newProjectId, _name, _sector, newProject.severity);
        return newProjectId;
    }

    function vote(uint256 _projectId, bool _inFavor) public {
        require(projectVotes[_projectId][msg.sender].weight == 0, "Already voted on this project");

        projectVotes[_projectId][msg.sender] = Vote(_inFavor, 1);
        _projectVoteCounts[_projectId]++;

        if (_inFavor) {
            projects[_projectId].totalVotes++;
        }

        updateProjectSeverity(_projectId);

        emit ProjectVoted(_projectId, msg.sender, _inFavor, 1);
    }

    function updateProjectSeverity(uint256 _projectId) internal {
        uint256 votePercentage = (_projectVoteCounts[_projectId] * 100) / _userCounter;
        
        if (votePercentage >= VERY_IMPORTANT_THRESHOLD) {
            projects[_projectId].severity = Severity.Critical;
        } else if (votePercentage >= IMPORTANT_THRESHOLD) {
            projects[_projectId].severity = Severity.VeryImportant;
        } else {
            projects[_projectId].severity = Severity.Important;
        }
    }

    function updateProjectStatus(uint256 _projectId, ProjectStatus _newStatus) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can update status");
        projects[_projectId].status = _newStatus;

        if (_newStatus == ProjectStatus.InProgress && projects[_projectId].startDate == 0) {
            projects[_projectId].startDate = block.timestamp;
        } else if (_newStatus == ProjectStatus.Completed && projects[_projectId].endDate == 0) {
            projects[_projectId].endDate = block.timestamp;
            updatePoliticianReputation(_projectId);
        }

        emit ProjectStatusUpdated(_projectId, _newStatus);
    }

    function updatePoliticianReputation(uint256 _projectId) internal {
        Project storage project = projects[_projectId];
        Politician storage politician = politicians[project.assignedPolitician];

        uint256 reputationPoints;
        if (project.severity == Severity.Important) {
            reputationPoints = 10;
        } else if (project.severity == Severity.VeryImportant) {
            reputationPoints = 20;
        } else {
            reputationPoints = 30;
        }

        politician.sectorReputation[project.sector] += reputationPoints;
        politician.projectsCompleted++;

        emit ReputationUpdated(project.assignedPolitician, project.sector, reputationPoints);
    }

    function addMilestone(uint256 _projectId, string memory _description, uint256 _targetDate) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can add milestones");

        Milestone memory newMilestone = Milestone({
            description: _description,
            targetDate: _targetDate,
            status: MilestoneStatus.Pending
        });

        projects[_projectId].milestones.push(newMilestone);

        emit MilestoneAdded(_projectId, projects[_projectId].milestones.length - 1, _description);
    }

    function updateMilestone(uint256 _projectId, uint256 _milestoneIndex, MilestoneStatus _newStatus) public {
        require(projects[_projectId].assignedPolitician == msg.sender, "Only assigned politician can update milestones");
        require(_milestoneIndex < projects[_projectId].milestones.length, "Invalid milestone index");

        projects[_projectId].milestones[_milestoneIndex].status = _newStatus;
        emit MilestoneUpdated(_projectId, _milestoneIndex, _newStatus);

        updateProjectCompletion(_projectId);
    }

    function updateProjectCompletion(uint256 _projectId) internal {
        uint256 totalMilestones = projects[_projectId].milestones.length;
        uint256 completedMilestones = 0;

        for (uint256 i = 0; i < totalMilestones; i++) {
            if (projects[_projectId].milestones[i].status == MilestoneStatus.Completed) {
                completedMilestones++;
            }
        }

        projects[_projectId].completionPercentage = totalMilestones > 0 ? (completedMilestones * 100) / totalMilestones : 0;
    }

    function submitFeedback(uint256 _projectId, bool _liked, string memory _comment) public {
        require(bytes(projectFeedbacks[_projectId][msg.sender].comment).length == 0, "Feedback already submitted");

        projectFeedbacks[_projectId][msg.sender] = Feedback(_liked, _comment);

        if (_liked) {
            projects[_projectId].likes++;
        } else {
            projects[_projectId].dislikes++;
        }

        emit FeedbackSubmitted(_projectId, msg.sender, _liked);
    }

    function addSector(uint256 _sectorId, string memory _name) public onlyAdmin {
        require(bytes(sectors[_sectorId]).length == 0, "Sector ID already exists");
        sectors[_sectorId] = _name;
        emit SectorAdded(_sectorId, _name);
    }

    function registerPolitician(string memory _area, string memory _designation) public {
        require(politicians[msg.sender].entryDate == 0, "Politician already registered");
        
        Politician storage newPolitician = politicians[msg.sender];
        newPolitician.entryDate = block.timestamp;
        newPolitician.areaUnderAdministration = _area;
        newPolitician.designation = _designation;

        emit PoliticianRegistered(msg.sender, _area, _designation);
    }

    function assignPolitician(uint256 _projectId, address _politician) public onlyAdmin {
        require(politicians[_politician].entryDate != 0, "Politician not registered");
        projects[_projectId].assignedPolitician = _politician;
    }

    function registerUser() public {
        require(projectVotes[0][msg.sender].weight == 0, "User already registered");
        _userCounter++;
        projectVotes[0][msg.sender].weight = 1; // Use project 0 as a dummy project for user registration
    }

    function getProjectDetails(uint256 _projectId) public view returns (
        string memory name,
        string memory sector,
        address assignedPolitician,
        ProjectStatus status,
        uint256 startDate,
        uint256 endDate,
        uint256 completionPercentage,
        uint256 totalVotes,
        uint256 likes,
        uint256 dislikes,
        Severity severity
    ) {
        Project storage project = projects[_projectId];
        return (
            project.name,
            sectors[project.sector],
            project.assignedPolitician,
            project.status,
            project.startDate,
            project.endDate,
            project.completionPercentage,
            project.totalVotes,
            project.likes,
            project.dislikes,
            project.severity
        );
    }

    function getPoliticianDetails(address _politician) public view returns (
        uint256 entryDate,
        uint256 projectsCompleted,
        string memory areaUnderAdministration,
        string memory designation
    ) {
        Politician storage politician = politicians[_politician];
        return (
            politician.entryDate,
            politician.projectsCompleted,
            politician.areaUnderAdministration,
            politician.designation
        );
    }

    function getPoliticianReputation(address _politician, uint256 _sector) public view returns (uint256) {
        return politicians[_politician].sectorReputation[_sector];
    }

    function getTotalUsers() public view returns (uint256) {
        return _userCounter;
    }
}

