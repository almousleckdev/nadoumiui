import Modal from "@/components/ui/Modal";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import type { StudentData } from "./AdminStudentColumns";

interface StudentProfileModalProps {
  student: StudentData | null;
  onClose: () => void;
  onStartChat: () => void;
  isStartingChat: boolean;
}

export function StudentProfileModal({ student, onClose, onStartChat, isStartingChat }: StudentProfileModalProps) {
  return (
    <Modal isOpen={Boolean(student)} onClose={onClose} title="Student Profile Details" size="md">
      {student && (
        <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-1">
          <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
            <div className="w-14 h-14 rounded-full bg-orange-950/30 border border-orange-900/50 text-orange-500 flex items-center justify-center font-bold text-xl font-heading shrink-0">
              {student.firstName[0]}
              {student.lastName[0]}
            </div>
            <div className="min-w-0">
              <h3 className="text-lg font-bold text-gray-900 font-heading truncate">
                {student.firstName} {student.lastName}
              </h3>
              <p className="text-sm text-gray-500 truncate">{student.email}</p>
              <span className="text-[10px] text-gray-400 font-mono block truncate mt-0.5">UUID: {student.id}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-y-4 gap-x-4 text-sm border-b border-gray-200 pb-6">
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Citizenship</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">{student.country}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Passport Number</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block font-mono">
                {student.passportNumber || "N/A"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Phone Number</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">{student.phone || "N/A"}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Date of Birth</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">
                {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Gender</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">{student.gender || "N/A"}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Registered Date</span>
              <span className="text-sm font-semibold text-gray-800 mt-1 block">
                {new Date(student.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">
              Submitted Applications
            </span>
            {!student.applications || student.applications.length === 0 ? (
              <p className="text-xs text-gray-400 italic">No applications submitted by this student yet.</p>
            ) : (
              <div className="space-y-2">
                {student.applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-3 bg-white/50 border border-gray-200 rounded-lg flex items-center justify-between gap-4"
                  >
                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold text-gray-900 block truncate leading-tight">
                        {app.scholarship?.title || "Unknown Scholarship"}
                      </span>
                      <div className="flex flex-col mt-1 space-y-0.5">
                        <span className="text-[10px] text-gray-500 font-mono block truncate">
                          App ID: {app.applicationId}
                        </span>
                        <span className="text-[10px] text-gray-500 block truncate">
                          <span className="font-semibold text-gray-700">Type:</span> {app.scholarship?.type || "N/A"}
                        </span>
                        <span className="text-[10px] text-gray-500 block truncate">
                          <span className="font-semibold text-gray-700">University:</span>{" "}
                          {app.scholarship?.universities?.[0]?.name || "N/A"}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        app.status === "accepted"
                          ? "success"
                          : app.status === "rejected" || app.status === "revoked"
                            ? "danger"
                            : "warning"
                      }
                      className="shrink-0"
                    >
                      {app.status.replace("_", " ")}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={onStartChat}
              isLoading={isStartingChat}
              className="border-orange-500/30 text-orange-500 hover:bg-orange-500/10"
            >
              Message Student
            </Button>
            <Button variant="primary" onClick={onClose}>
              Close Details
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
