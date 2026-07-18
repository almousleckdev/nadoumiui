import type { Application } from "@/types";
import Badge from "@/components/ui/Badge";

export function ApplicationStatusTimeline({ statusHistory }: { statusHistory: Application["statusHistory"] }) {
  if (!Array.isArray(statusHistory) || statusHistory.length === 0) {
    return <p className="text-xs text-gray-400 italic">No timeline recorded for this application.</p>;
  }

  return (
    <div className="relative border-l border-gray-200 pl-4 ml-2 space-y-5 py-1">
      {statusHistory.map((log, index) => {
        const logDate = new Date(log.timestamp).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        });

        return (
          <div key={index} className="relative">
            <div className="absolute -left-[21px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-orange-600" />
            <div>
              <div className="flex items-center gap-2">
                <Badge
                  size="sm"
                  variant={log.status === "accepted" ? "success" : log.status === "rejected" ? "danger" : "info"}
                >
                  {log.status.replace("_", " ")}
                </Badge>
                <span className="text-[10px] text-gray-400 font-mono">{logDate}</span>
              </div>
              {log.note && <p className="text-xs text-gray-500 mt-1 pl-1 italic">&ldquo;{log.note}&rdquo;</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
