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
}

interface Icon {
  name?: string;
  color?: string;
  size?: number;
}

export interface GaugeOptions {
  radius: number;
  startAngle: number;
  endAngle: number;
  max: number;
  min: number;
  label: (val: number) => number;
  backgroundColor: string;
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

export interface LevelDefinition {
  level: number;
  stroke: string;
  label?: string;
}
