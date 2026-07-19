export interface ApplicationStep {
  number: string;
  title: string;
  summary: string;
  detail: string;
  icon: "CreditCard" | "ClipboardCheck" | "Building2" | "Award" | "Wallet" | "ScrollText" | "PackageCheck" | "PartyPopper";
}

export const applicationSteps: ApplicationStep[] = [
  {
    number: "01",
    title: "Pay Application Fee",
    summary: "Submit your application fee to officially open your file with Nadoumi.",
    detail:
      "Once you've chosen a scholarship or program, you pay a one-time application fee to open your file. This covers our team's work preparing, translating, and reviewing your documents before submission — no application moves forward without this first step.",
    icon: "CreditCard",
  },
  {
    number: "02",
    title: "Primary Review",
    summary: "Our advisors check your documents and eligibility before anything is submitted.",
    detail:
      "Our admissions team reviews your transcripts, language certificates, and personal statement against the specific requirements of your target program. We flag anything missing or inconsistent early, so your application only goes to the university once it's fully ready.",
    icon: "ClipboardCheck",
  },
  {
    number: "03",
    title: "University Assessment",
    summary: "Your completed file is submitted and assessed directly by the university.",
    detail:
      "Your application is formally submitted to the university's admissions office (or the CSC system for government scholarships). The university reviews your academic record and, where required, may schedule an interview — we coordinate and prepare you for this every step of the way.",
    icon: "Building2",
  },
  {
    number: "04",
    title: "Admission Issued",
    summary: "The university confirms your place with an official Admission Notice.",
    detail:
      "Once approved, the university issues your official Admission Notice. This is the formal confirmation of your place and the document your visa application will be built around — we verify every detail on it before moving forward.",
    icon: "Award",
  },
  {
    number: "05",
    title: "Pay Project Fee",
    summary: "Settle the remaining service fee to unlock visa document processing.",
    detail:
      "With admission confirmed, you pay the remaining project/service fee. This unlocks the next stage — preparation and delivery of your official Chinese visa documents — and covers ongoing support through arrival and enrollment.",
    icon: "Wallet",
  },
  {
    number: "06",
    title: "JW202 Issued",
    summary: "Your official visa application form (JW201/JW202) is issued.",
    detail:
      "The university or the Chinese Scholarship Council issues your JW201 (government-funded) or JW202 (self-funded/university-funded) form — the official document required to apply for your student visa (X1/X2) at your local Chinese embassy or consulate.",
    icon: "ScrollText",
  },
  {
    number: "07",
    title: "Admission Docs Delivered",
    summary: "Your physical admission package is shipped straight to your door.",
    detail:
      "Your physical Admission Notice, JW form, and any supporting documents are couriered directly to your address. We track the shipment with you and confirm everything has arrived before you book your embassy appointment.",
    icon: "PackageCheck",
  },
  {
    number: "08",
    title: "Apply Successfully",
    summary: "You submit your visa application and prepare for departure.",
    detail:
      "With your documents in hand, you submit your student visa application at the embassy. From there, our team stays with you through pre-departure preparation, arrival logistics, and settling in at your new university.",
    icon: "PartyPopper",
  },
];
