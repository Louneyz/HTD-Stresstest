import { Suspense } from 'react';
import { StressTest } from '@/components/StressTest';

export default function Home() {
  return (
    <Suspense>
      <StressTest />
    </Suspense>
  );
}
