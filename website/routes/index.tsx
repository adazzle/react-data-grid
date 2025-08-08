import { redirect } from '@tanstack/react-router';

export const Route = createFileRoute({
  beforeLoad() {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw redirect({ to: '/CommonFeatures' });
  }
});
