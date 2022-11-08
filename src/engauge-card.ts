import { LitElement, html, PropertyValueMap, PropertyValues, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { EnGaugeConfig } from "./types";
import { HomeAssistant, hasConfigOrEntityChanged } from "custom-card-helpers";
import { Gauge } from "./gauge";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() private _config!: EnGaugeConfig;
  // @property() private _helpers: any;

  @query("#engauge") private _element!: HTMLElement;

  private _state?: string;
  private _gauge?: Gauge;

  static getStubConfig() {
    return {};
  }

  public setConfig(config: EnGaugeConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }

    const defaultConfig: EnGaugeConfig = {
      entity: "number.large_range",
      type: "engauge-card",
      arc: 3,
      another: 10,
    };

    this._config = { ...defaultConfig, ...config };

    // this._styles = {
    //   ...this._styles,
    //   ...this._config.styles,
    // };

    // this.loadCardHelpers();
  }

  // private async loadCardHelpers() {
  //   this._helpers = await (window as any).loadCardHelpers();
  // }

  private createGauge() {
    const entityId = this._config?.entity;
    this._state = this.hass?.states[entityId!].state;
    if (!this._gauge) {
      this._gauge = new Gauge(this._element, {});
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    } else {
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    }
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Error</div>`;
    }

    return html` <style>
        ha-card {
          height: 100%;
          overflow: hidden;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          box-sizing: border-box;
          cursor: pointer;
        }

        #engauge {
          max-width: 250px;
          height: 150px;
          min-height: 100px;
        }

        svg.gauge {
          height: 100%;
        }
      </style>
      <ha-card>
        <div
          id="engauge"
          class="gauge-container"
          style="max-width: 250px;"
        ></div>
      </ha-card>`;
  }

  // protected shouldUpdate(changedProps: PropertyValues): boolean {
  //   return hasConfigOrEntityChanged(this, changedProps, false);
  // }

  // protected firstUpdated() {
  //   // let entityId = this._config?.entity;
  //   // console.log(entityId);
  // }

  // protected shouldUpdate(changedProps: PropertyValues): boolean {
  //   return true;
  //   // return hasConfigOrEntityChanged(this, changedProps, false);
  // }

  protected updated() {
    const entityId = this._config?.entity;
    this._state = this.hass?.states[entityId!].state;
    this.createGauge();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "engauge-card": EngaugeCard;
  }
}

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "engauge-card",
  name: "Engauge Card",
  description: "A gauge I wanted",
});
