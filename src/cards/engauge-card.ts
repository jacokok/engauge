import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { EngaugeConfig } from "../types";
import { HomeAssistant } from "custom-card-helpers";
import { Gauge } from "../lib/gauge";
import { styleMap } from "lit-html/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() private _config!: EngaugeConfig;

  @query("#engauge") private _element!: HTMLElement;

  private _state: number = 0;
  private _gauge?: Gauge;
  private _name?: string;
  private _unit?: string;
  private _icon?: string;

  static getStubConfig() {
    return {};
  }

  public setConfig(config: EngaugeConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }

    const defaultConfig: EngaugeConfig = {
      entity: "number.large_range",
      type: "engauge-card",
      horizontal: false,
      icon: {},
      level: [],
    };

    this._config = { ...defaultConfig, ...config };

    if (this._config.level && this._config.level.length > 0) {
      const l = this._config.level;
      const colorFn = (val: number): string => {
        const ll = l.slice().sort((a, b) => (a.value > b.value ? -1 : 1));

        for (const i of ll) {
          if (val >= i.value) {
            return i.color;
          }
        }
        return l[0].color;
      };

      this._config.gauge = Object.assign({}, this._config.gauge, {
        color: colorFn,
      });
    }

    this.createGauge(true);
  }

  private createGauge(forceReload?: boolean) {
    const entityId = this._config?.entity;
    const entity = this.hass?.states[entityId!];
    const friendly_name = entity?.attributes.friendly_name;
    const unit = entity?.attributes.unit_of_measurement;
    const icon = entity?.attributes.icon;
    this._state = entity?.state ? +entity.state : 0;
    this._name = this._config.name ?? friendly_name;
    this._unit = this._config.measurement ?? unit;
    this._icon = this._config.icon?.name ?? icon;

    if (!this._element) {
      return;
    }
    if (forceReload) {
      this._gauge = new Gauge(this._element, this._config.gauge ?? {});
    }

    if (!this._gauge) {
      this._gauge = new Gauge(this._element, this._config.gauge ?? {});
      this._gauge.setValueAnimated(this._state, 1);
    } else {
      this._gauge.setValueAnimated(this._state, 1);
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
        <engauge-gauge
          value=${this._state}
          dialWidth="12"
          valueWidth="12"
          dialColor="red"
          valueColor="blue"
          size=${this._config.size ?? 100}
          min="0"
          max="200"
          backgroundColor=${this._config.gauge?.backgroundColor ?? "red"}
        ></engauge-gauge>
        <engauge-text
          primaryInfo=${ifDefined(this._state)}
          secondaryInfo=${ifDefined(this._name)}
          unit=${ifDefined(this._unit)}
        >
        </engauge-text>
      </ha-card>
    `;
  }

  renderIcon() {
    return html`<engauge-icon
      icon=${this._icon ?? "mdi:information-outline"}
      color=${ifDefined(
        this._config.icon?.color ?? this._config.gauge?.dialColor
      )}
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
