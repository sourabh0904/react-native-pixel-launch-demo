export type AppItem = {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
  type: "dashboard" | "orders" | "reports" | "profile" | "notifications" | "payments" | "schedule" | "documents" | "support";
};

export const APPS: AppItem[] = [
  {
    id: "1",
    label: "Dashboard",
    icon: "◈",
    color: "#6C63FF",
    bgColor: "#EEF0FF",
    type: "dashboard",
  },
  {
    id: "2",
    label: "Orders",
    icon: "⬡",
    color: "#00C9A7",
    bgColor: "#E6FAF7",
    type: "orders",
  },
  {
    id: "3",
    label: "Reports",
    icon: "▦",
    color: "#FF6584",
    bgColor: "#FFF0F3",
    type: "reports",
  },
  {
    id: "4",
    label: "Profile",
    icon: "◉",
    color: "#F5A623",
    bgColor: "#FFF8EC",
    type: "profile",
  },
  {
    id: "5",
    label: "Alerts",
    icon: "△",
    color: "#4299E1",
    bgColor: "#EBF5FF",
    type: "notifications",
  },
  {
    id: "6",
    label: "Payments",
    icon: "◇",
    color: "#38A169",
    bgColor: "#F0FFF4",
    type: "payments",
  },
  {
    id: "7",
    label: "Schedule",
    icon: "▣",
    color: "#DD6B20",
    bgColor: "#FFFAF0",
    type: "schedule",
  },
  {
    id: "8",
    label: "Documents",
    icon: "▤",
    color: "#805AD5",
    bgColor: "#FAF5FF",
    type: "documents",
  },
  {
    id: "9",
    label: "Support",
    icon: "✦",
    color: "#718096",
    bgColor: "#F7F8FA",
    type: "support",
  },
];
