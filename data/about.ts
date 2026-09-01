export interface TeamMember {
  id: string;
  name: string;
  nameCn?: string;
  position: string;
  positionCn?: string;
  bio: string;
  image: string;
  specialization: string;
  languages: string[];
}

export interface ValueItem {
  id: string;
  title: string;
  titleCn?: string;
  description: string;
  iconName: "ShieldCheck" | "Building2" | "HeartHandshake" | "GraduationCap" | "Globe" | "Sparkles";
}

export interface MilestoneItem {
  year: string;
  title: string;
  description: string;
  highlight?: string;
}

export interface AboutStat {
  value: string;
  label: string;
  description: string;
}

export const aboutData = {
  company: {
    name: "Sichuan Nadoumi Education Consulting Co., Ltd.",
    nameCn: "四川纳豆米教育咨询有限公司",
    founded: "2014",
    headquarters: "Mianyang, Sichuan Province, China",
    tagline: "Bridging Global Dreams with World-Class Education in China",
    summary:
      "Since 2014, Sichuan Nadoumi Education Consulting Co., Ltd. has established itself as a premier higher education advisory and scholarship placement organization headquartered in Mianyang, Sichuan, China. Over more than a decade of dedicated operation, Nadoumi has connected over 5,000 international students from 40+ countries with top-tier Chinese universities, fully-funded CSC scholarships, provincial awards, and customized degree pathways.",
  },
  stats: [
    {
      value: "10+",
      label: "Years of Excellence",
      description: "Continuously operating in Mianyang, Sichuan since 2014.",
    },
    {
      value: "5,000+",
      label: "Scholars Placed",
      description: "International students enrolled across Bachelor, Master & PhD degrees.",
    },
    {
      value: "150+",
      label: "Partner Institutions",
      description: "Direct admissions pathways with leading universities across China.",
    },
    {
      value: "98%",
      label: "Scholarship Success",
      description: "Industry-leading grant acquisition rate for qualified applicants.",
    },
  ] as AboutStat[],
  history: {
    title: "Our Heritage & Story",
    titleCn: "发展历程与创立初心",
    content:
      "Founded in 2014 and rooted in Mianyang, Sichuan, 四川纳豆米教育咨询有限公司 (Sichuan Nadoumi Education Consulting Co., Ltd.) was born from a simple yet profound conviction: financial barriers should never stand between ambitious international students and world-class academic training.\n\nOver the past decade, China has emerged as one of the world's most dynamic hubs for technological innovation, medical research, engineering, and global commerce. Nadoumi bridges the gap between international students and Chinese universities by negotiating dedicated scholarship quotas, providing transparent 1-on-1 admission counseling, and assisting students from their initial application through to the issuance of the official JW202 / DQ Visa documentation and campus arrival.",
  },
  mission: {
    title: "Our Mission & Vision",
    titleCn: "企业愿景与使命",
    missionStatement:
      "To empower deserving students globally by unlocking access to fully-funded scholarships and world-class higher education in China through transparent, compassionate, and results-driven advisory services.",
    visionStatement:
      "To be the world's most trusted gateway for international education in China, recognized by universities and families worldwide for integrity, student-centered excellence, and cross-cultural harmony.",
  },
  values: [
    {
      id: "integrity",
      title: "Student-First Integrity",
      titleCn: "诚信为本",
      description:
        "We provide transparent guidance with no hidden conditions. Every student receives honest eligibility assessments and guaranteed fee clarity.",
      iconName: "ShieldCheck",
    },
    {
      id: "institutional-depth",
      title: "Direct Institutional Access",
      titleCn: "校企深度合作",
      description:
        "Direct partnership agreements with top Chinese universities give our students access to reserved scholarship quotas and expedited admissions.",
      iconName: "Building2",
    },
    {
      id: "end-to-end",
      title: "End-to-End Holistic Care",
      titleCn: "全流程贴心服务",
      description:
        "From scholarship selection and essay polishing to JW202 visa processing, airport pickup, and university registration — we guide every step.",
      iconName: "HeartHandshake",
    },
    {
      id: "global-equity",
      title: "Global Academic Equity",
      titleCn: "助力全球学子",
      description:
        "We actively democratize access to high-caliber CSC, Provincial, and University scholarships for students from developing and emerging nations.",
      iconName: "GraduationCap",
    },
  ] as ValueItem[],
  milestones: [
    {
      year: "2014",
      title: "Founding in Mianyang, Sichuan",
      description:
        "Sichuan Nadoumi Education Consulting Co., Ltd. was officially incorporated in Mianyang to assist international applicants in securing study opportunities in China.",
      highlight: "Company Inception",
    },
    {
      year: "2017",
      title: "Nationwide University Network",
      description:
        "Expanded direct partnership agreements to over 50 top-tier universities across Beijing, Shanghai, Jiangsu, Zhejiang, Hubei, and Shaanxi.",
      highlight: "50+ Institutional Partners",
    },
    {
      year: "2020",
      title: "Digital Admissions & Tracking",
      description:
        "Launched a centralized digital admissions workflow to streamline document verification, interview scheduling, and status tracking for global applicants.",
      highlight: "Digital Transformation",
    },
    {
      year: "2023",
      title: "3,000+ Placed Scholars Milestone",
      description:
        "Celebrated placing over 3,000 international scholars with full tuition waivers and monthly living stipends across MBBS, Engineering, and Business tracks.",
      highlight: "3,000+ International Scholars",
    },
    {
      year: "2026",
      title: "Enterprise Fullstack Platform",
      description:
        "Modernized the end-to-end platform with real-time student counseling, instant document delivery, and verified partner portals serving 40+ countries.",
      highlight: "Next-Gen Platform",
    },
  ] as MilestoneItem[],
  team: [
    {
      id: "founder",
      name: "Armand",
      nameCn: "阿曼德",
      position: "Founder & Chief Executive Officer",
      positionCn: "创始人兼首席执行官",
      bio: "With over 12 years of executive experience in international education and cross-border university partnerships, Armand has led Nadoumi from its inception into a globally recognized study-in-China consultancy.",
      image: "/images/founder.jpg",
      specialization: "Strategic Partnerships & University Quotas",
      languages: ["English", "Chinese (Mandarin)", "French"],
    },
    {
      id: "director",
      name: "Xu Lin",
      nameCn: "徐琳",
      position: "Head of Academic Admissions & Compliance",
      positionCn: "学术招生与合规总监",
      bio: "Former international student advisor with deep knowledge of Chinese Ministry of Education protocols, CSC scholarship evaluation matrices, and institutional admissions standards.",
      image: "/images/femme.jpg",
      specialization: "CSC & Provincial Scholarship Selection",
      languages: ["Chinese (Mandarin)", "English"],
    },
    {
      id: "advisor-stem",
      name: "Dr. Xiao Wei",
      nameCn: "肖微 博士",
      position: "Senior Academic Counselor (STEM & MBBS)",
      positionCn: "高级学术顾问（理工与医学）",
      bio: "Holds a PhD in Engineering and specializes in matching international candidates to top-ranked Chinese medical, software engineering, and artificial intelligence programs.",
      image: "/images/team6.jpg",
      specialization: "MBBS, Artificial Intelligence & Engineering",
      languages: ["Chinese (Mandarin)", "English"],
    },
  ] as TeamMember[],
};
