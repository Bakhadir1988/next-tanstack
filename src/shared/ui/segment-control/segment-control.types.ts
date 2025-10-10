export type SegmentControlValue = 'block' | 'row' | 'table';

export type SegmentControlProps = {
  value: SegmentControlValue;
  onValueChangeAction: (value: SegmentControlValue) => void;
};
