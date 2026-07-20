export function formatDate(dateString: string | Date | undefined | null): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function formatDeadline(dateString: string | Date | undefined | null): string {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function getDaysRemaining(dateString: string | Date | undefined | null): number {
  if (!dateString) return 0;
  const deadline = new Date(dateString).getTime();
  if (isNaN(deadline)) return 0;
  const now = new Date().getTime();
  const diffTime = deadline - now;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function isDeadlineUrgent(daysLeft: number, threshold = 14): boolean {
  return daysLeft >= 0 && daysLeft <= threshold;
}

