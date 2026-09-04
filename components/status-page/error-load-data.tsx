'use client';

import Link from 'next/link';
import { Button, Typography } from '@components/ui';

export default function ErrorLoadData() {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className="flex h-full min-h-[400px] items-center justify-center">
      <div className="mx-4 flex flex-col items-center gap-4 text-center">
        <Typography variant="h2" className="text-destructive">
          Something went wrong
        </Typography>
        <Typography variant="body1" className="text-muted-foreground max-w-md">
          We could not load this content. Please try again.
        </Typography>
        <div className="flex gap-4">
          <Button color="primary" asChild>
            <Link href="/">Back to home</Link>
          </Button>
          <Button onClick={handleReload} variant="outline">
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
