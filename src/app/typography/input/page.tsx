import { Input } from '@/shared/ui';

export default function InputPage() {
  return (
    <div>
      <h1>Input</h1>
      <div
        style={{
          maxWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <Input placeholder="Default" />
        <Input placeholder="Disabled" disabled />
      </div>
    </div>
  );
}
