import { Textarea } from '@/shared/ui';

export default function TextareaPage() {
  return (
    <div>
      <h1>Textarea</h1>
      <div
        style={{
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Textarea placeholder="Default" />
        <Textarea placeholder="Disabled" disabled />
      </div>
    </div>
  );
}
