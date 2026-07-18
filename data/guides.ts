export const howToApplySteps = [
  {
    number: '01',
    title: 'Consultation & Profile Evaluation',
    desc: 'Create an account and fill out your academic profile. Our experts will evaluate your background, GPA, and career goals to recommend the best universities and scholarship tracks.'
  },
  {
    number: '02',
    title: 'Document Preparation',
    desc: 'Gather your transcripts, diplomas, passport, study plan, and recommendation letters. We provide templates and review all documents for compliance with Chinese university standards.'
  },
  {
    number: '03',
    title: 'Application Submission',
    desc: 'We handle the complex submission process through the university portals and the official CSC (Chinese Scholarship Council) system, ensuring zero errors.'
  },
  {
    number: '04',
    title: 'Interview Preparation',
    desc: 'If the university requires an interview, we will conduct mock interviews with you, focusing on the specific questions commonly asked by Chinese admission committees.'
  },
  {
    number: '05',
    title: 'Admission & Visa',
    desc: 'Once accepted, we assist you in securing your JW201/202 form and guide you through the student visa (X1/X2) application process at your local embassy.'
  }
];

export const scholarshipTypes = [
  {
    title: 'CSC Scholarship',
    type: 'Government Funded',
    description: 'The most prestigious scholarship available to international students, fully funded by the Chinese Ministry of Education.',
    benefits: ['Full tuition waiver', 'Free university dormitory', 'Monthly stipend (2,500 - 3,500 RMB)', 'Comprehensive medical insurance'],
    highlight: true
  },
  {
    title: 'Provincial Scholarship',
    type: 'Local Government',
    description: 'Established by local provincial governments to attract outstanding international students to study in their respective regions.',
    benefits: ['Full or partial tuition waiver', 'Accommodation allowance (varies)', 'Living stipend (varies by province)', 'Excellent for Tier 2 cities'],
    highlight: false
  },
  {
    title: 'University Scholarship',
    type: 'Institution Funded',
    description: 'Offered directly by individual universities to encourage excellent international students and scholars to study at their institutions.',
    benefits: ['Partial to full tuition waiver', 'Performance-based renewal', 'Sometimes includes free accommodation', 'Easier to obtain than CSC'],
    highlight: false
  }
];

export const livingExpenses = [
  { item: 'Accommodation (Dormitory)', cost: '150 - 400 USD / month' },
  { item: 'Accommodation (Off-campus)', cost: '250 - 600 USD / month' },
  { item: 'Food (Campus Canteens)', cost: '100 - 150 USD / month' },
  { item: 'Transportation', cost: '15 - 30 USD / month' },
  { item: 'Internet & Mobile', cost: '10 - 20 USD / month' },
];

export const cityGuides = [
  {
    name: 'Beijing',
    tag: 'The Cultural Heart',
    desc: 'Home to Tsinghua and Peking University. A city where ancient history meets modern political power.',
    image: '/images/team0.jpg'
  },
  {
    name: 'Shanghai',
    tag: 'The Financial Hub',
    desc: 'The most international city in China. Famous for its skyline, business opportunities, and fast-paced lifestyle.',
    image: '/images/team1.jpg'
  },
  {
    name: 'Chengdu',
    tag: 'The Relaxed Capital',
    desc: 'Famous for pandas, spicy hotpot, and a famously relaxed lifestyle. Emerging as a massive tech hub.',
    image: '/images/team2.jpg'
  },
  {
    name: 'Guangzhou',
    tag: 'The Trade Gateway',
    desc: 'A booming metropolis in the south, known for its incredible dim sum and massive international trade fairs.',
    image: '/images/team3.jpg'
  }
];
