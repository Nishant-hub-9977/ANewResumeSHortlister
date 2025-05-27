export const mockCandidates = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    score: 92,
    skills: ['JavaScript', 'React', 'Node.js', 'TypeScript', 'AWS'],
    experience: 5,
    education: "Master's Degree",
    matchPercentage: 92,
    isShortlisted: true
  },
  {
    id: '2',
    name: 'Emma Johnson',
    email: 'emma.johnson@example.com',
    score: 85,
    skills: ['JavaScript', 'Angular', 'Python', 'SQL', 'Docker'],
    experience: 4,
    education: "Bachelor's Degree",
    matchPercentage: 85,
    isShortlisted: true
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'michael.brown@example.com',
    score: 78,
    skills: ['JavaScript', 'Vue.js', 'Express', 'MongoDB', 'Git'],
    experience: 3,
    education: "Bachelor's Degree",
    matchPercentage: 78,
    isShortlisted: false
  },
  {
    id: '4',
    name: 'Sarah Davis',
    email: 'sarah.davis@example.com',
    score: 70,
    skills: ['React', 'CSS', 'HTML', 'Redux', 'Sass'],
    experience: 2,
    education: "Bachelor's Degree",
    matchPercentage: 70,
    isShortlisted: false
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@example.com',
    score: 65,
    skills: ['Java', 'Spring', 'JavaScript', 'SQL', 'React'],
    experience: 7,
    education: "Master's Degree",
    matchPercentage: 65,
    isShortlisted: false
  },
  {
    id: '6',
    name: 'Jennifer Lee',
    email: 'jennifer.lee@example.com',
    score: 60,
    skills: ['Python', 'Django', 'JavaScript', 'PostgreSQL', 'Docker'],
    experience: 4,
    education: "Bachelor's Degree",
    matchPercentage: 60,
    isShortlisted: false
  },
  {
    id: '7',
    name: 'Robert Martin',
    email: 'robert.martin@example.com',
    score: 55,
    skills: ['C#', '.NET', 'SQL Server', 'JavaScript', 'Azure'],
    experience: 6,
    education: "Master's Degree",
    matchPercentage: 55,
    isShortlisted: false
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@example.com',
    score: 52,
    skills: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'jQuery'],
    experience: 3,
    education: "Bachelor's Degree",
    matchPercentage: 52,
    isShortlisted: false
  },
  {
    id: '9',
    name: 'Thomas White',
    email: 'thomas.white@example.com',
    score: 48,
    skills: ['Ruby', 'Rails', 'JavaScript', 'PostgreSQL', 'Redis'],
    experience: 5,
    education: "Bachelor's Degree",
    matchPercentage: 48,
    isShortlisted: false
  }
];

export const mockDashboardData = {
  stats: {
    totalResumes: 125,
    shortlisted: 18,
    pendingReview: 32,
    activeJobs: 4
  },
  recentCandidates: [
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@example.com',
      matchScore: 92,
      status: 'Shortlisted'
    },
    {
      id: '2',
      name: 'Emma Johnson',
      email: 'emma.johnson@example.com',
      matchScore: 85,
      status: 'Shortlisted'
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@example.com',
      matchScore: 78,
      status: 'Reviewing'
    },
    {
      id: '4',
      name: 'Sarah Davis',
      email: 'sarah.davis@example.com',
      matchScore: 70,
      status: 'Reviewing'
    },
    {
      id: '5',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      matchScore: 65,
      status: 'New'
    }
  ]
};

export const mockJobRequirements = [
  {
    id: '1',
    title: 'Senior Frontend Developer',
    description: 'We are looking for an experienced frontend developer with React expertise to join our team.',
    skills: [
      { id: '101', name: 'React', isRequired: true },
      { id: '102', name: 'TypeScript', isRequired: true },
      { id: '103', name: 'Redux', isRequired: false },
      { id: '104', name: 'CSS/SCSS', isRequired: true },
      { id: '105', name: 'Jest', isRequired: false }
    ],
    experience: 4,
    education: "Bachelor's",
    isActive: true
  },
  {
    id: '2',
    title: 'Full Stack Developer',
    description: 'Looking for a full stack developer with experience in both frontend and backend technologies.',
    skills: [
      { id: '201', name: 'JavaScript', isRequired: true },
      { id: '202', name: 'Node.js', isRequired: true },
      { id: '203', name: 'React', isRequired: true },
      { id: '204', name: 'MongoDB', isRequired: false },
      { id: '205', name: 'Express', isRequired: false }
    ],
    experience: 3,
    education: "Bachelor's",
    isActive: true
  },
  {
    id: '3',
    title: 'DevOps Engineer',
    description: 'Seeking a DevOps engineer to help automate our deployment processes and maintain infrastructure.',
    skills: [
      { id: '301', name: 'Docker', isRequired: true },
      { id: '302', name: 'Kubernetes', isRequired: true },
      { id: '303', name: 'AWS', isRequired: true },
      { id: '304', name: 'Terraform', isRequired: false },
      { id: '305', name: 'CI/CD', isRequired: true }
    ],
    experience: 5,
    education: "Bachelor's",
    isActive: false
  }
];