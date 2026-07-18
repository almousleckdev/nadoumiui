export const SCHOLARSHIP_FORM_TABS = [
  { id: "basic", label: "Basic Info & Setup" },
  { id: "academic", label: "Academic Requirements" },
  { id: "eligibility", label: "Eligibility & Policies" },
  { id: "financials", label: "Fees & Financials" },
  { id: "details", label: "Details & Benefits" },
  { id: "publish", label: "Publish Settings" },
] as const;

export type ScholarshipFormTabId = (typeof SCHOLARSHIP_FORM_TABS)[number]["id"];

export const SCHOLARSHIP_CATEGORY_OPTIONS = [
  { value: "CSC", label: "CSC (Government)" },
  { value: "Province", label: "Province Scholarship" },
  { value: "Universities", label: "University Scholarship" },
  { value: "Partial", label: "Partial Funding" },
  { value: "Self_funded", label: "Self Funded" },
  { value: "HSK", label: "HSK Scholarship" },
  { value: "Type_A", label: "Type A (Full)" },
  { value: "Type_B", label: "Type B (Partial)" },
];

export const TEACHING_LANGUAGE_OPTIONS = [
  { value: "English", label: "English Taught" },
  { value: "Chinese", label: "Chinese Taught" },
  { value: "Both", label: "Bilingual" },
];

export const CURRENCY_OPTIONS = [
  { value: "RMB", label: "RMB (¥)" },
  { value: "USD", label: "USD ($)" },
];

export const PUBLISH_STATUS_OPTIONS = [
  { value: "published", label: "Published & Active" },
  { value: "draft", label: "Draft" },
  { value: "closed", label: "Closed / Full" },
  { value: "limited", label: "Limited Slots" },
];
