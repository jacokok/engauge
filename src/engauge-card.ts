import { LitElement, html } from "lit";
import { customElement, state, property } from "lit/decorators.js";
import { EnGaugeConfig } from "./types";
import { HomeAssistant } from "custom-card-helpers";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property({ attribute: false }) public hass!: HomeAssistant;
  @state() private _config!: EnGaugeConfig;
  @property() private _helpers: any;

  static getStubConfig() {
    return {
      options: {},
      tabs: [{ label: "Sun", card: { type: "entity", entity: "sun.sun" } }],
    };
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

  render() {
    console.log(this._config);
    if (!this.hass || !this._config || !this._helpers) {
      return html`<div>Error</div>`;
    }

    return html` <div>tests ${this._config.arc}</div> `;
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
