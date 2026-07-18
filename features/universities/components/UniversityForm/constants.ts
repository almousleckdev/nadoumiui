export const UNIVERSITY_FORM_TABS = [
  { id: "basic", label: "Basic Info" },
  { id: "academics", label: "Academics" },
  { id: "content", label: "Content & Details" },
  { id: "accommodation", label: "Accommodation" },
  { id: "documents", label: "Documents" },
  { id: "media", label: "Media & Links" },
  { id: "publish", label: "Publish Settings" },
] as const;

export type UniversityFormTabId = (typeof UNIVERSITY_FORM_TABS)[number]["id"];

export const INSTITUTION_TYPE_OPTIONS = [
  { value: "Public", label: "Public" },
  { value: "Private", label: "Private" },
];

export const PUBLISH_STATUS_OPTIONS = [
  { value: "active", label: "Active & Published" },
  { value: "draft", label: "Draft" },
  { value: "inactive", label: "Inactive / Hidden" },
];

export const SCHOLARSHIP_AVAILABILITY_OPTIONS = [
  { value: "Available", label: "Available" },
  { value: "Limited", label: "Limited Slots" },
  { value: "Not Available", label: "Not Available" },
];
