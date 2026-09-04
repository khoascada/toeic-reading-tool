import { devInfo } from '@lib/utils/logger';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    devInfo('[Instrumentation] TOEIC Reading Tool server initialized.');
  }
}

