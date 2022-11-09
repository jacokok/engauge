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
  showValue: boolean;
  label: (val: number) => number;
  showText: boolean;
  showPercentage?: boolean;
  name?: string;
  color?: (val: number) => string;
  styles?: {};
  attributes?: {};
}

export interface AnimationOptions {
  start: number;
  end: number;
  duration: number;
  step: (val: number, frame: number) => void;
  easing?: (pos: number) => number;
}
