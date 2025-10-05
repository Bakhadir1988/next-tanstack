import { Button, Flex, Grid, Heading, Tooltip } from '@/shared/ui';

export default function TooltipPage() {
  return (
    <Flex direction="column" gap="xl">
      <Heading as="h1">Tooltip Component</Heading>

      <Flex direction="column" gap="md">
        <Heading as="h2" size="4">
          Sides
        </Heading>
        <Grid
          columns="4"
          gap="lg"
          style={{ placeItems: 'center', height: '200px' }}
        >
          <Tooltip content="Tooltip on top" side="top">
            <Button>Top</Button>
          </Tooltip>
          <Tooltip content="Tooltip on right" side="right">
            <Button>Right</Button>
          </Tooltip>
          <Tooltip content="Tooltip on bottom" side="bottom">
            <Button>Bottom</Button>
          </Tooltip>
          <Tooltip content="Tooltip on left" side="left">
            <Button>Left</Button>
          </Tooltip>
        </Grid>
      </Flex>

      <Flex direction="column" gap="md">
        <Heading as="h2" size="4">
          Align
        </Heading>
        <Grid
          columns="3"
          gap="lg"
          style={{ placeItems: 'center', height: '150px' }}
        >
          <Tooltip content="Align Start" side="bottom" align="start">
            <Button>Align Start</Button>
          </Tooltip>
          <Tooltip content="Align Center" side="bottom" align="center">
            <Button>Align Center</Button>
          </Tooltip>
          <Tooltip content="Align End" side="bottom" align="end">
            <Button>Align End</Button>
          </Tooltip>
        </Grid>
      </Flex>

      <Flex direction="column" gap="md">
        <Heading as="h2" size="4">
          Long Content
        </Heading>
        <Tooltip content="This is a much longer piece of content to demonstrate how the tooltip handles wrapping and size.">
          <Button>Hover for long content</Button>
        </Tooltip>
      </Flex>
    </Flex>
  );
}
