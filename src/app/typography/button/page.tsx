'use client';

import { HeartIcon } from '@radix-ui/react-icons';

import { Button } from '@/shared/ui/button';

export default function ButtonPage() {
  return (
    <div>
      <h1>Тестирование кнопок</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          alignItems: 'flex-start',
          marginTop: '20px',
        }}
      >
        <div>
          <h2>Основные варианты</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
          </div>
        </div>

        <div>
          <h2>Новые варианты: Ghost и Outline</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
          </div>
        </div>

        <div>
          <h2>Разные радиусы</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="primary" radius="sm">
              Radius SM
            </Button>
            <Button variant="primary" radius="md">
              Radius MD
            </Button>
            <Button variant="primary" radius="lg">
              Radius LG (Pill)
            </Button>
            <Button variant="primary" radius="xl">
              Radius XL
            </Button>
          </div>
        </div>

        <div>
          <h2>Кнопки с иконками</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="primary" icon={<HeartIcon />}>
              Icon Left
            </Button>
            <Button
              variant="primary"
              icon={<HeartIcon />}
              icon_position="right"
            >
              Icon Right
            </Button>
          </div>
        </div>

        <div>
          <h2>Кнопки только с иконкой (variant: icon)</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="icon" size="sm" icon={<HeartIcon />} />
            <Button variant="icon" size="md" icon={<HeartIcon />} radius="md" />
            <Button variant="icon" size="lg" icon={<HeartIcon />} radius="lg" />
          </div>
        </div>

        <div>
          <h2>Пример с asChild (кнопка-ссылка)</h2>
          <Button asChild>
            <a href="#">Я ссылка</a>
          </Button>
        </div>

        <div>
          <h2>Состояния</h2>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <Button variant="primary" disabled icon={<HeartIcon />}>
              Disabled
            </Button>
            <Button variant="primary" is_loading icon={<HeartIcon />}>
              Loading
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
