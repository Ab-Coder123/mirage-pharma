import Link from 'next/link';
import { Button } from '@mirage/ui';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-[#F8FAFC]">
      <div className="max-w-md space-y-4">
        <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-slate-200 text-slate-700">
          ERROR 404
        </span>
        <h1 className="text-3xl font-bold text-[#023368]">Page Not Found</h1>
        <p className="text-slate-600 text-sm">
          The requested pharmaceutical documentation or portal route does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Button variant="primary" asChild>
            <Link href="/">Return to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
