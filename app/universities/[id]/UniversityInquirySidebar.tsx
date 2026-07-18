import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export function UniversityInquirySidebar({ universityName }: { universityName: string }) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="sticky top-24">
        <div className="pb-8 border-b border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Interested?</h3>
          <p className="text-gray-500 mb-8">
            Discover your opportunities and start the application process for {universityName}.
          </p>

          <div className="flex flex-col gap-3">
            <Button
              variant="primary"
              className="shadow-md shadow-blue-500/20"
              onClick={() => router.push(`/scholarships?search=${encodeURIComponent(universityName)}`)}
            >
              Find Scholarships
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-200 hover:border-gray-300"
              onClick={() => router.push("/contact")}
            >
              Contact Advisor
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <a href="/contact" className="text-blue-600 font-semibold hover:underline">
                Speak to our experts
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
