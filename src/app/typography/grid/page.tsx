'use client';

import { Grid } from '@/shared/ui/grid';

const Box = ({
  children,
  span,
  className,
}: {
  children: React.ReactNode;
  span?: number;
  className?: string;
}) => (
  <div
    className={className}
    style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-inverse)',
      padding: '20px',
      borderRadius: 'var(--radius-sm)',
      textAlign: 'center',
      gridColumn: span ? `span ${span}` : undefined,
    }}
  >
    {children}
  </div>
);

export default function GridPage() {
  return (
    <div>
      {/* Added for demonstration of @container */}
      <style jsx global>{`
        @container grid (min-width: 350px) {
          .adaptive_box {
            background-color: var(--color-danger) !important;
            border: 2px solid var(--color-text) !important;
          }
        }
      `}</style>

      <h1>Grid Component</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h2>3 колонки с отступом</h2>
          <Grid columns="repeat(3, 1fr)" gap="md">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
            <Box>5</Box>
            <Box>6</Box>
          </Grid>
        </div>

        <div>
          <h2>Адаптивные дочерние элементы (@container)</h2>
          <p>Блоки станут красными, когда их ширина превысит 350px.</p>
          <Grid
            columns="repeat(auto-fit, minmax(200px, 1fr))"
            gap="md"
            isContainer
          >
            <Box className="adaptive_box">min 200px</Box>
            <Box className="adaptive_box">min 200px</Box>
            <Box className="adaptive_box">min 200px</Box>
            <Box className="adaptive_box">min 200px</Box>
          </Grid>
        </div>

        <div>
          <h2>12-колоночная сетка</h2>
          <Grid columns="repeat(12, 1fr)" gap="sm">
            <Box span={12}>Header</Box>
            <Box span={4}>Sidebar</Box>
            <Box span={8}>Content</Box>
            <Box span={12}>Footer</Box>
          </Grid>
        </div>

        <div>
          <h2>Разные отступы</h2>
          <Grid columns="repeat(2, 1fr)" gap="lg" gapY="sm">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
            <Box>4</Box>
          </Grid>
        </div>
      </div>
    </div>
  );
}
