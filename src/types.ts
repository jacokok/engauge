import { LovelaceCardConfig } from "custom-card-helpers";

export interface EnGaugeConfig
  extends LovelaceCardConfig,
    Partial<GaugeOptions> {
  entity: string;
  icon: Icon;
  gauge?: GaugeOptions;
  name?: string;
  measurement?: string;
  horizontal?: boolean;
  size?: number;
  level?: Array<Level>;
}

interface Icon {
  name?: string;
  color?: string;
  size?: number;
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
  step: (val: number, frame: number) => void;
  easing?: (pos: number) => number;
}

export interface Level {
  value: number;
  color: string;
}
