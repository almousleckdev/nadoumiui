import Badge from "@/components/ui/Badge";

interface ApplicationStatusBadgeProps {
  status: string;
  size?: "sm" | "md";
}

export function ApplicationStatusBadge({ status, size = "md" }: ApplicationStatusBadgeProps) {
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

  return (
    <Badge variant={variant} size={size}>
      {status.replace(/_/g, " ")}
    </Badge>
  );
}
