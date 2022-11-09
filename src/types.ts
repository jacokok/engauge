import { LovelaceCardConfig } from "custom-card-helpers";

export interface EnGaugeConfig extends LovelaceCardConfig, Partial<Options> {
  entity: string;
}

export interface Options {
  radius: number;
  startAngle: number;
  endAngle: number;
  max: number;
  min: number;
  valueDialClass: string;
  valueTextClass: string;
  dialClass: string;
  gaugeClass: string;
  viewBox: string;
  valueLabelClass: string;
  showValue: boolean;
  label: (val: number) => number;
  color?: (val: number) => string;
  styles?: {};
  attributes?: {};
}
