import { LovelaceCardConfig } from "custom-card-helpers";

export interface EngaugeConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  unit?: string;
  icon?: Icon;
  severity?: Severity;
  gauge?: GaugeOptions;
  horizontal?: boolean;
  size?: number;
  level?: Array<Level>;
}

interface Icon {
  name?: string;
  color?: string;
  size?: number;
}

interface Severity {
  green: number;
  yellow: number;
  red: number;
}

export interface GaugeOptions {
  startAngle: number;
  endAngle: number;
  max: number;
  min: number;
  // label: (val: number) => number;
  backgroundColor: string;
  dialColor: string;
  dialWidth: number;
  dialRounded: boolean;
  gaugeColor: string;
  gaugeWidth: number;
  color?: (val: number) => string;
}

export interface AnimationOptions {
  start: number;
  end: number;
  duration: number;
  step: (val: number) => void;
  easing?: (pos: number) => number;
}

export interface Level {
  value: number;
  color: string;
}
