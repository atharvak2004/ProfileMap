import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-lg mx-auto">
        <div className="mb-8">
          <span className="material-icons text-slate-400 text-9xl">sentiment_dissatisfied</span>
        </div>
        
        <h1 className="text-4xl font-bold text-slate-900 mb-6">Page Not Found</h1>
        
        <p className="text-slate-600 mb-8 text-lg">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link href="/">
          <Button className="mx-auto">
            <span className="material-icons mr-2">home</span>
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}