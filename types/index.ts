//Enums

export type UniversityType = "Public" | "Private";
export type UniversityStatus = "active" | "inactive" | "draft";
export type PartnerStatus = "active" | "inactive" | "draft";
export type Currency = "RMB" | "USD";
export type ScholarshipAvailability = "Available" | "Limited" | "Not_Available";

export type ProgramCategory = "Language" | "Bachelor" | "Master" | "PhD";
export type ProgramType = "Language" | "Bachelor" | "Master" | "PhD";

export interface ProgramMajorItem {
  id?: string;
  name: string;
  code?: string;
  field?: string;
}

export interface UniversityProgramItem {
  id?: string;
  type: ProgramType;
  title?: string;
  duration?: string;
  majors: ProgramMajorItem[];
}

export interface DocumentItem {
  name: string;
  required: boolean;
  notes?: string;
}

export interface ProgramStipendItem {
  programType: ProgramType;
  stipendAmount?: number | null;
  stipendUnit?: string;
  notes?: string;
}

export type ScholarshipCategory =
  | "Self_funded"
  | "Partial"
  | "CSC"
  | "Province"
  | "Universities"
  | "HSK"
  | "Type_A"
  | "Type_B"
  | "Type_C"
  | "Other";

export type ScholarshipStatus =
  | "draft"
  | "published"
  | "closed"
  | "active"
  | "inactive"
  | "limited";

export type TeachingLanguage = "English" | "Chinese" | "Both";

export type ApplicationStatus =
  | "pending"
  | "received"
  | "under_review"
  | "interview"
  | "interview_passed"
  | "interview_failed"
  | "accepted"
  | "rejected"
  | "revoked"
  | "waitlisted";

export type Gender = "Male" | "Female" | "Other";

export type MessageType = "text" | "file" | "image";
export type MessageStatus = "sent" | "delivered" | "read";

//Domain Models

export interface University {
  id: string;
  universityId: string;
  name: string;
  nameInChinese?: string | null;
  logo?: string | null;
  bannerImage?: string | null;
  city?: string | null;
  province?: string | null;
  type: UniversityType;
  foundedYear?: number | null;
  totalStudents?: number | null;
  internationalStudents?: number | null;
  facultyCount?: number | null;
  numberOfPrograms: number;
  introduction?: string | null;
  description?: string | null;
  highlights: string[];
  opportunities: string[];
  campusFacilities: string[];
  advantages: string[];
  officialWebsite?: string | null;
  admissionsEmail?: string | null;
  officePhone?: string | null;
  isRecommended: boolean;
  isPartner: boolean;
  partnerId?: string | null;
  partner?: Partner | null;
  isTop: boolean;
  qsRank?: number | null;
  scholarshipAvailability: ScholarshipAvailability;
  albums?: string[] | null;
  status: UniversityStatus;
  majors?: any[] | null;
  programs?: UniversityProgramItem[] | null;
  requiredDocuments?: DocumentItem[] | any[] | null;
  createdAt: string;
  updatedAt: string;
}

export interface Partner {
  id: string;
  partnerId: string;
  partnerType: "university" | "agency";
  nameEn: string;
  nameCn?: string | null;
  logo?: string | null;
  country?: string | null;
  province?: string | null;
  city?: string | null;
  contactPerson?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  servicesOffered?: string[];
  commissionRate?: string | null;
  agreementNotes?: string | null;
  topMajors: string[];
  research?: string | null;
  rank?: number | null;
  totalStudents?: number | null;
  totalForeignStudents?: number | null;
  totalColleges?: number | null;
  introduction?: string | null;
  website?: string | null;
  order: number;
  status: PartnerStatus;
  createdAt: string;
  updatedAt: string;
}

export interface ProgramAccommodation {
  id: string;
  programId: string;
  roomType: string;
  isFree: boolean;
  price?: number | null;
  currency: Currency;
}

export interface Program {
  id: string;
  scholarshipId: string;
  category: ProgramCategory;
  programName?: string | null;
  majors: string[];
  field?: string | null;
  fields: string[];
  teachingLanguage: TeachingLanguage;
  duration?: number | null;
  intake?: string | null;
  startDate?: string | null;
  stipendEnabled: boolean;
  stipendAmount?: number | null;
  stipendUnit?: string | null;
  tuitionFee?: number | null;
  tuitionFeeAfter?: number | null;
  applicationFee?: number | null;
  serviceFee?: number | null;
  currency: Currency;
  notes?: string | null;
  createdAt: string;
  updatedAt: string;
  accommodations?: ProgramAccommodation[];
  scholarship?: Scholarship;
}

export interface ProgramFilters {
  search?: string;
  category?: ProgramCategory;
  teachingLanguage?: TeachingLanguage;
  field?: string;
  tuitionMin?: number;
  tuitionMax?: number;
  page?: number;
  limit?: number;
  sort?: "popular" | "newest";
}

export interface Scholarship {
  id: string;
  scholarshipId: string;
  title: string;
  titleInChinese?: string | null;
  description: string;
  programCategories: ProgramCategory[];
  scholarshipCategory: ScholarshipCategory;
  applicationDeadline: string;
  originalTuitionFee?: number | null;
  tuitionFeeAfterScholarship?: number | null;
  accommodationFeeAfterScholarship?: number | null;
  accommodationFee?: string | null;
  accommodationFeeQuad?: number | null;
  teachingLanguage?: TeachingLanguage | null;
  status: ScholarshipStatus;
  isRecommended: boolean;
  isHot: boolean;
  isTop: boolean;
  coverImage?: string | null;
  tags: string[];
  availableSlots: number;
  universities?: University[];
  
  // Added fields from backend schema
  benefits?: string[] | string | null;
  requirements?: unknown | null;
  hasStipend?: boolean;
  stipend?: Record<string, any> | ProgramStipendItem[] | string | null;
  feeStructure?: unknown | null;
  insurance?: string | null;
  visaFee?: number | null;
  scoreRequirementsEnglish?: string | null;
  scoreRequirementsChinese?: string | null;
  applicationDocuments?: DocumentItem[] | string | null;
  additionalDocuments?: DocumentItem[] | string | null;
  locations?: Array<{
    id?: string;
    city?: string | null;
    province?: string | null;
    country?: string | null;
    requiredDocuments?: DocumentItem[] | any[] | null;
  }> | null;
  universityMajors?: Array<{ name: string; degree?: string; duration?: string }> | any[] | null;
  ageMin?: number | null;
  ageMax?: number | null;
  acceptedCountries?: string[] | null;
  chinaVisitPolicy?: string | null;
  acceptMinors?: boolean | null;
  currentLocationPolicy?: string | null;
  gpaMin?: number | null;
  ieltsScore?: number | null;
  toeflScore?: number | null;
  duolingoScore?: number | null;
  hskLevel?: number | null;
  universityFeeCurrency?: string | null;
  registrationFee?: string | null;
  nadoumiApplicationFee?: number | null;
  nadoumiServiceFee?: number | null;
  nadoumiFeeCurrency?: string | null;
  specialNotes?: string | null;
  scholarshipPolicy?: string | null;
  recommendationNotes?: string | null;
  applicantRequirements?: string | null;
  intake?: string | null;
  startDate?: string | null;
  scholarshipDuration?: number | null;
  scholarshipDurationText?: string | null;
  additionalFees?: string | null;
  scoreRequirements?: string | null;
  programSelection?: Array<{
    programType: ProgramType;
    majors?: string[];
    stipendAmount?: number | null;
    stipendUnit?: string | null;
  }> | null;

  createdAt: string;
  updatedAt: string;
}

export interface Student {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  passportNumber: string;
  phone?: string | null;
  profilePicture?: string | null;
  dateOfBirth?: string | null;
  nationality?: string | null;
  city?: string | null;
  gender?: Gender | null;
  isEmailVerified: boolean;
  profile?: {
    education?: Array<{
      degree?: string;
      institution?: string;
      field?: string;
      gpa?: string;
      gradYear?: string;
    }>;
    preferences?: {
      studyLevel?: string;
      desiredField?: string;
      preferredCities?: string[];
    };
  };
  createdAt: string;
  updatedAt: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  country?: string | null;
  profilePicture?: string | null;
  role: string;
  lastLoginAt?: string | null;
  createdAt: string;
}

export interface Application {
  id: string;
  applicationId: string;
  studentId: string;
  scholarshipId: string;
  status: ApplicationStatus;
  submittedAt: string;
  updatedAt: string;
  acceptedAt?: string | null;
  student?: Student;
  scholarship?: Scholarship;
  interviewDetails?: {
    date?: string | null;
    time?: string | null;
    videoCallPlatform?: string | null;
    videoCallLink?: string | null;
    notes?: string | null;
    scheduledAt?: string | null;
  } | null;
  admissionDocument?: {
    path: string;
    uploadedAt: string;
  } | null;
  jw202Document?: {
    path: string;
    uploadedAt: string;
  } | null;
  statusHistory?: Array<{
    status: ApplicationStatus;
    timestamp: string;
    note?: string | null;
  }> | null;
}

export interface Conversation {
  id: string;
  studentId: string;
  adminId?: string | null;
  lastMessage?: string | null;
  lastMessageAt: string;
  unreadCountAdmin: number;
  unreadCountStudent: number;
  student?: Student;
  admin?: Admin;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderRole: string;
  content: string;
  type: MessageType;
  fileUrl?: string | null;
  fileName?: string | null;
  fileSize?: string | null;
  status: MessageStatus;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  resource: string;
  resourceId: string;
  adminId: string;
  metadata?: Record<string, unknown> | null;
  ip?: string | null;
  createdAt: string;
}

//API Response Wrappers

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedData<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: PaginatedData<T>;
}

export interface DashboardStats {
  summary: {
    totalApplications: number;
    pendingReviews: number;
    activeUniversities: number;
    totalScholarships: number;
  };
  trends: Array<{ month: string; count: number }>;
  topUniversities: Array<{ name: string; count: number }>;
  recentSubmissions: Array<{
    id: string;
    studentName: string;
    university: string;
    scholarship: string;
    date: string;
    status: ApplicationStatus;
  }>;
}

//Auth Payloads

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  country: string;
  city: string;
  gender: string;
  passportNumber: string;
  phone?: string;
  dateOfBirth?: string;
  
  // Education Info
  currentLevel: string;
  university: string;
  major: string;
  gpa?: string;
  gradYear: string;

  // Scholarship Goals
  studyLevel: string;
  desiredField: string;
  preferredCities: string[];
  preferredLanguages?: string[];
}

export interface AuthResponse {
  student?: Student;
  admin?: Admin;
}

//Query Params
export interface ScholarshipFilters {
  search?: string;
  programCategory?: ProgramCategory;
  scholarshipCategory?: ScholarshipCategory;
  teachingLanguage?: TeachingLanguage;
  isTop?: boolean;
  isHot?: boolean;
  isRecommended?: boolean;
  status?: ScholarshipStatus;
  page?: number;
  limit?: number;
}

export interface UniversityFilters {
  search?: string;
  city?: string;
  province?: string;
  type?: UniversityType;
  isPartner?: boolean;
  isRecommended?: boolean;
  isTop?: boolean;
  page?: number;
  limit?: number;
}

export interface PartnerFilters {
  search?: string;
  city?: string;
  province?: string;
  status?: PartnerStatus;
  page?: number;
  limit?: number;
}

export interface ApplicationFilters {
  status?: ApplicationStatus;
  scholarshipId?: string;
  page?: number;
  limit?: number;
}
