import Link from 'next/link';
import { Button, Typography } from '@components/ui';

export default function NotFoundPage() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="mx-4 flex flex-col gap-6 text-center">
        <Typography variant="h3" className="text-error">
          404
        </Typography>
        <Typography variant="body1">The page you are looking for could not be found.</Typography>
        <Button asChild>
          <Link
            className="bg-primary hover:bg-primary-hover hover:shadow-primary/30 flex transform items-stretch justify-center gap-2 rounded-full font-bold text-white shadow-lg transition-all hover:scale-105"
            href="/"
          >
            Back to home
          </Link>
        </Button>
      </div>
    </div>
  );
}
