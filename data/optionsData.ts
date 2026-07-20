export interface OptionItem {
  value: string;
  label: string;
}

export const PROVINCE_OPTIONS: OptionItem[] = [
  { value: "Sichuan", label: "Sichuan" },
  { value: "Beijing", label: "Beijing" },
  { value: "Shanghai", label: "Shanghai" },
  { value: "Zhejiang", label: "Zhejiang" },
  { value: "Jiangsu", label: "Jiangsu" },
  { value: "Guangdong", label: "Guangdong" },
  { value: "Hubei", label: "Hubei" },
  { value: "Shaanxi", label: "Shaanxi" },
];

export const UNIVERSITY_TYPE_OPTIONS: OptionItem[] = [
  { value: "985 Project", label: "985 Project" },
  { value: "211 Project", label: "211 Project" },
  { value: "Double First-Class", label: "Double First-Class" },
  { value: "Comprehensive", label: "Comprehensive" },
];

export const PROGRAM_CATEGORY_OPTIONS: OptionItem[] = [
  { value: "Engineering", label: "Engineering" },
  { value: "Computer Science", label: "Computer Science" },
  { value: "Medicine", label: "Medicine" },
  { value: "Business & Management", label: "Business & Management" },
  { value: "Economics", label: "Economics" },
  { value: "Natural Sciences", label: "Natural Sciences" },
  { value: "Humanities & Social Sciences", label: "Humanities & Social Sciences" },
  { value: "Arts & Design", label: "Arts & Design" },
  { value: "Chinese Language", label: "Chinese Language" },
];

export const PROGRAM_LEVEL_OPTIONS: OptionItem[] = [
  { value: "Bachelor", label: "Bachelor's Degree" },
  { value: "Master", label: "Master's Degree" },
  { value: "Doctoral", label: "Ph.D. / Doctoral" },
  { value: "Non-Degree", label: "Non-Degree / Language" },
];

export const SCHOLARSHIP_CATEGORY_OPTIONS: OptionItem[] = [
  { value: "CSC", label: "Chinese Government (CSC)" },
  { value: "Provincial", label: "Provincial Government" },
  { value: "Presidential", label: "University Presidential" },
  { value: "Belt and Road", label: "Belt & Road Scholarship" },
  { value: "Partial", label: "Partial / Tuition Waiver" },
];

export const APPLICATION_STATUS_OPTIONS: OptionItem[] = [
  { value: "DRAFT", label: "Draft" },
  { value: "SUBMITTED", label: "Submitted" },
  { value: "UNDER_REVIEW", label: "Under Review" },
  { value: "ACCEPTED", label: "Accepted" },
  { value: "REJECTED", label: "Rejected" },
  { value: "WITHDRAWN", label: "Withdrawn" },
];
