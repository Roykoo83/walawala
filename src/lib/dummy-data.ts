
export const PERSONAS = {
  MIN: {
    id: 'min',
    name: 'Nguyen Van Min',
    nickname: 'Min',
    role: 'International Student',
    visaType: 'D-2',
    nationality: 'Vietnam 🇻🇳',
    age: 22,
    education: 'Junior, Business Administration (Korean University)',
    koreanLevel: 'TOPIK 4',
    residence: 'Sinchon, Seoul (Studio)',
    income: '800k - 1m KRW / month (Living expenses)',
    goals: [
      'Graduate from Korean University',
      'Get a job in Korea (Switch to D-10 -> E-7)',
      'Secure stable housing',
      'Earn living expenses through part-time jobs',
      'Final Goal: F-2 or F-2R Visa'
    ],
    painPoints: [
      { issue: 'Complex Visa Renewal', severity: 'High' },
      { issue: 'Fear of Visa Change Procedures', severity: 'High' },
      { issue: 'Risk of Fraud (Part-time/Housing)', severity: 'Medium' },
      { issue: 'Fragmented Information', severity: 'Medium' }
    ],
    bio: "Min is a 22-year-old Vietnamese student studying Business Administration in Seoul. He balances his studies with part-time work at a convenience store. He is anxious about his upcoming visa renewal and finds professional services too expensive. He relies on community information but finds it often outdated or unreliable.",
    scenario: "Visa renewal is in 2 months. Unsure about required documents. Administrative scriveners are too expensive (>1m KRW). Needs a checklist and affordable assistance.",
    expectedValue: "Visa renewal alerts, Document checklist, AI form filling, Cost reduction."
  },
  SOPHIA: {
    id: 'sophia',
    name: 'Wang Xiaofei',
    nickname: 'Sophia',
    role: 'Frontend Developer',
    visaType: 'E-7',
    nationality: 'China 🇨🇳',
    age: 28,
    occupation: 'IT Frontend Developer',
    koreanLevel: 'TOPIK 5',
    residence: 'Gangnam, Seoul (Officetel)',
    income: '45m KRW / year',
    goals: [
      'Acquire F-2 (Residency) Visa',
      'Final Goal: F-2R (Regional Specialized) Visa',
      'Invite parents to Korea (F-1)',
      'Build long-term career in Korea',
      'Buy a house'
    ],
    painPoints: [
      { issue: 'Complex F-2 Point System', severity: 'High' },
      { issue: 'Visa Renewal Stress (Every 3 years)', severity: 'Medium' },
      { issue: 'Family Invitation Procedures', severity: 'High' },
      { issue: 'KIIP Schedule Conflicts', severity: 'Medium' }
    ],
    bio: "Sophia is a 28-year-old skilled developer from China working in Gangnam. She earns a good salary and wants to settle in Korea long-term. She struggles with understanding the specific point requirements for the F-2 visa and finding time for the Social Integration Program (KIIP) due to her work schedule.",
    scenario: "Wants to know if she qualifies for F-2 visa points. Needs to find a weekend KIIP class.",
    expectedValue: "F-2 Point Calculator, KIIP Schedule Guide, Automated Document Preparation, Connection to vetted experts."
  }
};

export const COMMUNITY_CATEGORIES = [
  { id: 'all', name: 'All', icon: 'LayoutGrid' },
  { id: 'visa', name: 'Visa', icon: 'FileText' },
  { id: 'housing', name: 'Housing', icon: 'Home' },
  { id: 'jobs', name: 'Jobs', icon: 'Briefcase' },
  { id: 'meetup', name: 'Meetup', icon: 'Users' },
  { id: 'daily', name: 'Daily Life', icon: 'MessageCircle' },
];

export const DUMMY_POSTS = [
  {
    id: '1',
    author: PERSONAS.MIN,
    category: 'visa',
    title: 'Successfully switched to E-7! Sharing my journey 🥳',
    content: "I finally got my E-7 visa after 6 months of waiting! It was a long journey, but I want to share some tips that helped me. Especially for those graduating soon, don't lose hope. The document preparation is key...",
    likes: 234,
    comments: 45,
    createdAt: '2h ago',
    tags: ['E-7', 'VisaSuccess', 'Tips']
  },
  {
    id: '2',
    author: {
      name: 'Anonymous',
      nationality: 'Korea 🇰🇷',
      nickname: 'FriendlyNeighbor'
    },
    category: 'housing',
    title: 'Watch out for Sinchon housing scams!',
    content: "I heard some students recently lost their deposits in Sinchon. Please make sure to check the 'Deung-gi-bu' (registry) before sending any money. If you need help reading the documents, feel free to ask here!",
    likes: 567,
    comments: 123,
    createdAt: '5h ago',
    tags: ['Sinchon', 'Warning', 'Housing']
  },
  {
    id: '3',
    author: PERSONAS.SOPHIA,
    category: 'meetup',
    title: 'Looking for study buddies for KIIP Level 5 📚',
    content: "I'm starting KIIP Level 5 classes on weekends in Gangnam. It's quite challenging to do while working. Anyone want to study together or share notes? Let's help each other settle in Korea! 🌸",
    likes: 89,
    comments: 12,
    createdAt: '1d ago',
    tags: ['KIIP', 'StudyGroup', 'Gangnam']
  },
  {
    id: '4',
    author: {
      name: 'Amar Gurung',
      nationality: 'Nepal 🇳🇵',
      nickname: 'Amar'
    },
    category: 'daily',
    title: 'Best place for authentic spices in Ansan?',
    content: "Hello everyone! I just moved to Ansan. Does anyone know a good market where I can find authentic Nepalese or Indian spices? Missing home food today. 🥘",
    likes: 156,
    comments: 38,
    createdAt: '3h ago',
    tags: ['Ansan', 'Food', 'Community']
  }
];
