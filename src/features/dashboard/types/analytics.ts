export interface LineDataPoint {
  name: string;
  volume: number;
  profit: number;
  [key: string]: string | number;
}

export interface PieDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}
