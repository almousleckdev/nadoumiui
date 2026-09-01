import Link from "next/link";
import { Compass, Home, Search } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-16">
      <div className="max-w-md w-full text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-6">
        <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto border border-orange-100">
          <Compass className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">404 Error</span>
          <h1 className="text-2xl font-bold text-gray-900">Page Not Found</h1>
          <p className="text-sm text-gray-600 leading-relaxed">
            The page you are looking for doesn&apos;t exist or may have been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="primary" className="w-full">
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
          <Link href="/scholarships" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Search className="w-4 h-4 mr-2" />
              Find Scholarships
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
