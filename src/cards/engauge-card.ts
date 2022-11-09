import { LitElement, html, PropertyValueMap, PropertyValues, css } from "lit";
import { customElement, state, property, query } from "lit/decorators.js";
import { EnGaugeConfig } from "../types";
import { HomeAssistant, hasConfigOrEntityChanged } from "custom-card-helpers";
import { Gauge } from "../lib/gauge";

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
    };

    this._config = { ...defaultConfig, ...config };
  }

  private createGauge() {
    const entityId = this._config?.entity;
    const entity = this.hass?.states[entityId!];
    const friendly_name = entity?.attributes.friendly_name;
    this._state = entity?.state;
    this._config.name = friendly_name;
    if (!this._gauge) {
      this._gauge = new Gauge(this._element, this._config);
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    } else {
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    }
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Error</div>`;
    }

    return html`
      <style>
        ha-card {
          /* height: 100%;
          overflow: hidden;
          padding: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          box-sizing: border-box;
          cursor: pointer; */
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

      <ha-card @click=${this.clickHandler}>
        ${this.renderIcon("mdi:information")}
        <div
          id="engauge"
          class="gauge-container"
          style="max-width: 250px;"
        ></div>
      </ha-card>
    `;
  }

  renderIcon(icon: string) {
    return html`<engauge-icon icon=${icon}></engauge-icon>`;
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

  clickHandler() {
    this._haInfo({ entityId: this._config?.entity });
  }

  _haInfo(detail: { entityId: string }) {
    var event = new Event("hass-more-info", {
      bubbles: true,
      cancelable: false,
      composed: true,
    }) as any;

    event.detail = detail || {};
    this.shadowRoot?.dispatchEvent(event);
    return event;
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
