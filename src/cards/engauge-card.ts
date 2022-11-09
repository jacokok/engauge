import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { EnGaugeConfig } from "../types";
import { HomeAssistant } from "custom-card-helpers";
import { Gauge } from "../lib/gauge";
import { styleMap } from "lit-html/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() private _config!: EnGaugeConfig;

  @query("#engauge") private _element!: HTMLElement;

  private _state?: string;
  private _gauge?: Gauge;
  private _name?: string;
  private _measurement?: string;
  private _icon?: string;

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
      horizontal: false,
      icon: {},
    };

    this._config = { ...defaultConfig, ...config };
    this.createGauge(true);
  }

  private createGauge(forceReload?: boolean) {
    const entityId = this._config?.entity;
    const entity = this.hass?.states[entityId!];
    const friendly_name = entity?.attributes.friendly_name;
    const measurement = entity?.attributes.unit_of_measurement;
    const icon = entity?.attributes.icon;
    this._state = entity?.state;
    this._name = this._config.name ?? friendly_name;
    this._measurement = this._config.measurement ?? measurement;
    this._icon = this._config.icon?.name ?? icon;

    if (!this._element) {
      return;
    }
    if (forceReload) {
      this._gauge = new Gauge(this._element, this._config.gauge ?? {});
    }

    if (!this._gauge) {
      this._gauge = new Gauge(this._element, this._config.gauge ?? {});
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    } else {
      this._gauge.setValueAnimated(parseInt(this._state ?? "0"), 1);
    }
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Error</div>`;
    }

    this.createGauge();

    let styles = {
      textAlign: this._config.horizontal ? "left" : "center",
      flexDirection: this._config.horizontal ? "row" : "column",
      justifyContent: this._config.horizontal ? "start" : "center",
    };

    let engaugeStyles = {
      maxWidth: "250px",
      height: this._config.size ? this._config.size + "px" : "100px",
    };

    return html`
      <ha-card @click=${this.clickHandler} style=${styleMap(styles)}>
        <div class="gauge-container">
          ${this.renderIcon()}
          <div id="engauge" style=${styleMap(engaugeStyles)}></div>
        </div>
        <div class="text">
          <div class="value">
            ${this._state}
            <span class="measurement">${this._measurement}</span>
          </div>
          <div class="name">${this._name}</div>
        </div>
      </ha-card>
    `;
  }

  renderIcon() {
    return html`<engauge-icon
      icon=${this._icon ?? "mdi:information-outline"}
      color=${ifDefined(this._config.icon?.color)}
      size=${ifDefined(this._config.icon?.size)}
    ></engauge-icon>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      ha-card {
        height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        cursor: pointer;
      }

      .gauge-container {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
      }

      svg.gauge {
        height: 100%;
      }

      .value {
        font-size: 28px;
        margin-right: 4px;
        margin-top: 4px;
        color: var(--primary-text-color);
      }

      .measurement {
        font-size: 18px;
        color: var(--secondary-text-color);
      }

      .name {
        color: var(--secondary-text-color);
        font-weight: 500;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 4px;
      }

      .text {
        margin-top: 5px;
        margin-left: 10px;
      }
    `;
  }

  protected updated() {
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
