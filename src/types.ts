import { LovelaceCardConfig } from "custom-card-helpers";

export interface EnGaugeConfig extends LovelaceCardConfig {
  entity: string;
  arc: number;
  another: number;
  styles?: {};
  attributes?: {};
}
