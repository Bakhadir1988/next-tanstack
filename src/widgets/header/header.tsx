// src/widgets/header/header.tsx (теперь это Серверный Компонент)

import { cookies } from 'next/headers';

import { favoritesApi } from '@/shared/api/list.api';
import { HeaderView } from '@/views/catalog-view/header/header-view';

export const Header = async () => {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session_id')?.value;

  let count = 0;

  if (sessionId) {
    const data = await favoritesApi.get(sessionId);
    if (typeof data === 'object' && data.items) {
      count = data.items.length;
    }
  }

  // Серверный компонент рендерит клиентский и передает ему данные как пропс
  return <HeaderView initialCount={count} />;
};
