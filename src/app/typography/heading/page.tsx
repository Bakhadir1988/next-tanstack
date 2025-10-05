import Link from 'next/link';

import { Heading } from '@/shared/ui';

export default function HeadingPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <h1>Heading Component</h1>

      <div>
        <h2>Размеры (size)</h2>
        <p>Размер по умолчанию: 3 (24px)</p>
        <Heading>Default size</Heading>
        <hr style={{ margin: '1rem 0' }} />
        <Heading as="h1" size="1">
          Size 6 (--font-size-h1)
        </Heading>
        <Heading as="h2" size="2">
          Size 5 (--font-size-h2)
        </Heading>
        <Heading as="h3" size="3">
          Size 4 (--font-size-h3)
        </Heading>
        <Heading as="h4" size="4">
          Size 3 (--font-size-h4)
        </Heading>
        <Heading as="h5" size="5">
          Size 2 (--font-size-h5)
        </Heading>
        <Heading as="h6" size="6">
          Size 1 (--font-size-h6)
        </Heading>
      </div>

      <div>
        <h2>Начертание (weight)</h2>
        <Heading size="4" weight="light">
          Light
        </Heading>
        <Heading size="4" weight="regular">
          Regular
        </Heading>
        <Heading size="4" weight="medium">
          Medium
        </Heading>
        <Heading size="4" weight="semibold">
          Semibold
        </Heading>
        <Heading size="4" weight="bold">
          Bold
        </Heading>
      </div>

      <div>
        <h2>Выравнивание (align)</h2>
        <Heading size="3" align="left">
          Align Left
        </Heading>
        <Heading size="3" align="center">
          Align Center
        </Heading>
        <Heading size="3" align="right">
          Align Right
        </Heading>
      </div>

      <div>
        <h2>Усечение (truncate)</h2>
        <Heading size="3" truncate style={{ maxWidth: '300px' }}>
          This is a very long heading that will be truncated
        </Heading>
      </div>

      <div>
        <h2>Цвета (color)</h2>
        <Heading size="4" color="gray">
          Gray
        </Heading>
        <Heading size="4" color="blue">
          Blue
        </Heading>
        <Heading size="4" color="green">
          Green
        </Heading>
        <Heading size="4" color="red">
          Red
        </Heading>
      </div>

      <div>
        <h2>asChild</h2>
        <Heading size="4" asChild>
          <Link href="#">Я ссылка</Link>
        </Heading>
      </div>
    </div>
  );
}
