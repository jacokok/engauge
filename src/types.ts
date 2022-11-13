import { LovelaceCardConfig } from "custom-card-helpers";

export interface EngaugeConfig extends LovelaceCardConfig {
  entity: string;
  name?: string;
  horizontal?: boolean;
  unit?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: string;
  min?: number;
  max?: number;
  size?: number;
  dialColor?: string;
  dialWidth?: number;
  valueColor?: number;
  valueWidth?: number;
  backgroundColor?: number;
  backgroundRadius?: number;
  startAngle?: number;
  animationDuration?: number;
  rounded?: boolean;
  hideText?: boolean;
  severity?: Severity;
  segments?: Array<Segment>;
}

interface Severity {
  green: number;
  yellow: number;
  red: number;
}

interface Segment {
  from: number;
  dialColor?: number;
  valueColor?: string;
  backgroundColor?: string;
  iconColor?: string;
}
