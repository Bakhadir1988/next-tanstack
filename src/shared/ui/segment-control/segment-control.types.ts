export type SegmentControlValue = 'block' | 'list' | 'table';

export type SegmentControlProps = {
  value: SegmentControlValue;
  onValueChangeAction: (value: SegmentControlValue) => void;
};
