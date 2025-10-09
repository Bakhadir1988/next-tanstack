'use client';

import { useToast } from '@/shared/ui/toast';

export default function Home() {
  const { addToast } = useToast();

  return (
    <main>
      <h1>Главная страница</h1>
      <button
        onClick={() => {
          addToast({ title: 'Hello', description: 'This is a toast' });
        }}
      >
        Add toast
      </button>
    </main>
  );
}
