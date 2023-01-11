// import { LovelaceCardConfig } from "custom-card-helpers";

export interface EngaugeConfig {
  type: string;
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
  valueColor?: string;
  valueWidth?: number;
  backgroundColor?: string;
  backgroundRadius?: number;
  startAngle?: number;
  animationDuration?: number;
  rounded?: boolean;
  hideText?: boolean;
  primaryFontSize?: number;
  secondaryFontSize?: number;
  unitFontSize?: number;
  severity?: Severity;
  segments?: Array<Segment>;
}

export interface Severity {
  red?: number;
  pink?: number;
  purple?: number;
  "deep-purple"?: number;
  indigo?: number;
  blue?: number;
  "light-blue"?: number;
  cyan?: number;
  teal?: number;
  green?: number;
  "light-green"?: number;
  lime?: number;
  yellow?: number;
  amber?: number;
  orange?: number;
  "deep-orange"?: number;
  brown?: number;
  grey?: number;
  "blue-grey"?: number;
  black?: number;
  white?: number;
  disabled?: number;
}

export interface Segment {
  from: number;
  dialColor?: string;
  valueColor?: string;
  backgroundColor?: string;
  icon?: string;
  iconColor?: string;
}
