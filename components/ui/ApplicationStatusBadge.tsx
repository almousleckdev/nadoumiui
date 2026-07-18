import Badge from "@/components/ui/Badge";

interface ApplicationStatusBadgeProps {
  status: string;
}

export function ApplicationStatusBadge({ status }: ApplicationStatusBadgeProps) {
  const variant =
    status === "accepted" || status === "interview_passed"
      ? "success"
      : status === "rejected" ||
        status === "interview_failed" ||
        status === "revoked"
      ? "danger"
      : status === "interview" ||
        status === "under_review" ||
        status === "received"
      ? "info"
      : "warning";

  return <Badge variant={variant}>{status.replace(/_/g, " ")}</Badge>;
}
