import { Train, Smartphone, Bike, QrCode, PartyPopper, Moon, Flag, Sailboat, type LucideIcon } from "lucide-react";

export interface TransportOption {
  icon: LucideIcon;
  label: string;
}

export const TRANSPORT_OPTIONS: TransportOption[] = [
  { icon: Train, label: "Metro & High-Speed Rail" },
  { icon: Smartphone, label: "Didi (Ride-Hailing)" },
  { icon: Bike, label: "Shared Bikes (Meituan/Hello)" },
  { icon: QrCode, label: "QR-Code Payment on Transit" },
];

export interface FestivalItem {
  icon: LucideIcon;
  name: string;
  timing: string;
  description: string;
}

export const FESTIVALS: FestivalItem[] = [
  {
    icon: PartyPopper,
    name: "Spring Festival",
    timing: "Late Jan – Feb",
    description:
      "China's biggest holiday. Most campuses close for 2–4 weeks and the whole country travels home — book early or explore while it's quiet.",
  },
  {
    icon: Moon,
    name: "Mid-Autumn Festival",
    timing: "September / October",
    description: "A family reunion holiday centered on mooncakes and moon-viewing — many campuses host their own celebrations.",
  },
  {
    icon: Flag,
    name: "National Day (Golden Week)",
    timing: "Oct 1 – Oct 7",
    description: "A week-long national holiday — one of the best windows for students to travel domestically.",
  },
  {
    icon: Sailboat,
    name: "Dragon Boat Festival",
    timing: "May / June",
    description: "Marked by dragon boat races and sticky rice dumplings (zongzi) — a fun, low-key campus tradition.",
  },
];
