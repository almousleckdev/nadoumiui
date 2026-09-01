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

export const UNIVERSITY_TAB_FIELD_MAP: Record<UniversityFormTabId, string[]> = {
  basic: [
    "universityId",
    "name",
    "nameInChinese",
    "type",
    "city",
    "province",
    "foundedYear",
    "totalStudents",
    "internationalStudents",
    "qsRank",
    "facultyCount",
    "numberOfPrograms",
    "introduction",
    "isPartner",
    "partnerId",
  ],
  academics: ["rankings", "majors"],
  content: [
    "description",
    "history",
    "highlights",
    "advantages",
    "opportunities",
    "searchTags",
    "searchKeywords",
    "nearbyInfo",
  ],
  accommodation: ["accommodation", "campusFacilities"],
  documents: ["requiredDocuments"],
  media: ["logo", "bannerImage", "albums", "officialWebsite", "admissionsEmail", "officePhone"],
  publish: [
    "status",
    "scholarshipAvailability",
    "scholarshipNotes",
    "isRecommended",
    "isTop",
    "recommendationNotes",
  ],
};

export function getTabForField(fieldName: string): { id: UniversityFormTabId; label: string } {
  for (const tab of UNIVERSITY_FORM_TABS) {
    const fields = UNIVERSITY_TAB_FIELD_MAP[tab.id] || [];
    if (fields.some((f) => fieldName === f || fieldName.startsWith(`${f}.`))) {
      return tab;
    }
  }
  return UNIVERSITY_FORM_TABS[0];
}

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
