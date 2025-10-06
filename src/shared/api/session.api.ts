export function getSessionId(): string {
  if (typeof document === 'undefined') return '';
  const NAME = 'session_id';
  const cookie = document.cookie
    .split('; ')
    .find((r) => r.startsWith(NAME + '='));
  if (cookie) return decodeURIComponent(cookie.split('=')[1]);

  const sid =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID().replace(/-/g, '')
      : 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
          const r = (Math.random() * 16) | 0;
          const v = c === 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
  document.cookie = `${NAME}=${encodeURIComponent(sid)}; Path=/; SameSite=Lax`;
  return sid;
}
