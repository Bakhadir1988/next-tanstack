import { Flex } from '@/shared/ui/flex';

const Box = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      backgroundColor: 'var(--color-primary)',
      color: 'var(--color-text-inverse)',
      padding: '20px',
      borderRadius: 'var(--radius-sm)',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

export default function FlexPage() {
  return (
    <div>
      <h1>Flex Component</h1>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div>
          <h2>Direction: row (default)</h2>
          <Flex gap="md">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div>
          <h2>Direction: column</h2>
          <Flex direction="column" gap="sm">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div>
          <h2>Justify: center</h2>
          <Flex justify="center" gap="md">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div>
          <h2>Justify: between</h2>
          <Flex justify="between">
            <Box>1</Box>
            <Box>2</Box>
            <Box>3</Box>
          </Flex>
        </div>

        <div>
          <h2>Align: center</h2>
          <Flex
            align="center"
            gap="md"
            style={{
              height: '150px',
              backgroundColor: 'var(--color-surface-hover)',
            }}
          >
            <Box>1</Box>
            <Box>Tall</Box>
            <Box>3</Box>
          </Flex>
        </div>
      </div>
    </div>
  );
}
