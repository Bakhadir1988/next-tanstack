import { QuantityCounter } from '@/shared/ui';

export default function QuantityCounterPage() {
  return (
    <div>
      <h1>QuantityCounter</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <QuantityCounter />
      </div>
    </div>
  );
}
