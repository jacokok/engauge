import { LitElement, html } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { EnGaugeConfig } from "./types";
import { HomeAssistant } from "custom-card-helpers";
import { Gauge } from "./gauge";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() private _config!: EnGaugeConfig;
  @property() private _helpers: any;

  @query("#engauge") private _element!: HTMLElement;

  static getStubConfig() {
    return {};
  }

  public setConfig(config: EnGaugeConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }

    const defaultConfig: EnGaugeConfig = {
      type: "engauge-card",
      arc: 3,
      another: 10,
    };

    this._config = { ...defaultConfig, ...config };

    // this._styles = {
    //   ...this._styles,
    //   ...this._config.styles,
    // };

    this.loadCardHelpers();
  }

  private async loadCardHelpers() {
    this._helpers = await (window as any).loadCardHelpers();
  }

  private createGauge() {
    console.log("gage");
    const w = new Gauge(this._element, {});
    w.setValue(40);
    w.setValueAnimated(90, 0.6);
  }

  render() {
    console.log(this._config);
    if (!this.hass || !this._config || !this._helpers) {
      return html`<div>Error</div>`;
    }

    return html`<div>tests ${this._config.arc}</div>
      <div
        id="engauge"
        class="gauge-container"
        style="width: 100px; height: 100px"
      ></div>`;
  }

  protected updated() {
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
