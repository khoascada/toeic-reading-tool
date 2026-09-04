'use client';

import Link from 'next/link';
import { Button, Typography } from '@components/ui';

export default function ForbiddenPage() {
  return (
    <div className="flex h-full min-h-screen items-center justify-center">
      <div className="mx-4 flex flex-col gap-4 text-center">
        <Typography variant="h1" className="text-error">
          403
        </Typography>
        <Typography variant="body1">You do not have permission to access this page.</Typography>
        <Button color="primary" asChild>
          <Link href="/">Back to home</Link>
        </Button>
      </div>
    </div>
  );
}
