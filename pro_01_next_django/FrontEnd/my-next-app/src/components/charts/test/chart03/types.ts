export interface ChartData {
  label: string;
  value: number;
  icon?: string;
}

export interface ChartConfig {
  data: ChartData[];
  backgroundColor?: string[];
  borderColor?: string[];
}