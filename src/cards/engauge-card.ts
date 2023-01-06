import { LitElement, html, css, CSSResultGroup } from "lit";
import { customElement, property } from "lit/decorators.js";
import { EngaugeConfig, Segment } from "../types";
import { HomeAssistant } from "custom-card-helpers";
import { styleMap } from "lit-html/directives/style-map.js";
import { ifDefined } from "lit/directives/if-defined.js";

@customElement("engauge-card")
export class EngaugeCard extends LitElement {
  @property() public hass?: HomeAssistant;
  @property() private _config!: EngaugeConfig;

  private _state: number = 0;
  private _name?: string;
  private _unit?: string;
  private _icon?: string;
  private _iconColor?: string;

  private _dialColor?: string;
  private _valueColor?: string;
  private _backgroundColor?: string;

  static getStubConfig() {
    return {};
  }

  public setConfig(config: EngaugeConfig) {
    if (!config) {
      throw new Error("No configuration.");
    }
    const defaultConfig: EngaugeConfig = {
      entity: "",
      type: "engauge-card",
    };

    this._config = { ...defaultConfig, ...config };
    this.initGauge();
  }

  private initGauge() {
    const entityId = this._config?.entity;
    const entity = this.hass?.states[entityId!];
    const friendly_name = entity?.attributes.friendly_name;
    const unit = entity?.attributes.unit_of_measurement;
    const icon = entity?.attributes.icon;

    this._icon = this._config.icon ?? icon;
    this._state = entity?.state ? +entity.state : 0;
    this._name = this._config.name ?? friendly_name;
    this._unit = this._config.unit ?? unit;
    this._dialColor = this._config.dialColor;
    this._valueColor = this._config.valueColor;
    this._backgroundColor = this._config.backgroundColor;
    this._iconColor = this._config.iconColor ?? this._config?.dialColor;

    this.initColors();
  }

  private initColors() {
    if (this._config.segments) {
      this.segments(this._config.segments);
    } else if (this._config.severity) {
      this.severity();
    }
  }

  private severity() {
    if (this._config.severity) {
      const segments: Array<Segment> = [];
      segments.push({
        from: this._config.severity?.green,
        valueColor: "var(--success-color)",
        iconColor: "var(--success-color)",
      });
      segments.push({
        from: this._config.severity?.yellow,
        valueColor: "var(--warning-color)",
        iconColor: "var(--warning-color)",
      });
      segments.push({
        from: this._config.severity?.red,
        valueColor: "var(--error-color)",
        iconColor: "var(--error-color)",
      });
      this.segments(segments);
    }
  }
  private segments(segments: Array<Segment>) {
    const sortedSegments = segments
      .slice()
      .sort((a, b) => (a.from > b.from ? 1 : -1));
    let isSet = false;
    for (const segment of sortedSegments) {
      if (this._state >= segment.from) {
        this.setSegmentColors(segment);
        isSet = true;
      }
    }
    if (!isSet) {
      this.setSegmentColors(sortedSegments[0]);
    }
  }

  private setSegmentColors(segment: Segment) {
    this._dialColor = segment.dialColor ?? this._dialColor;
    this._valueColor = segment.valueColor ?? this._valueColor;
    this._backgroundColor = segment.backgroundColor ?? this._backgroundColor;
    this._icon = segment.icon ?? this._icon;
    this._iconColor = segment.iconColor ?? this._iconColor;
  }

  render() {
    if (!this.hass || !this._config) {
      return html`<div>Error</div>`;
    }

    this.initGauge();

    let styles = {
      textAlign: this._config.horizontal ? "left" : "center",
      flexDirection: this._config.horizontal ? "row" : "column",
      justifyContent: this._config.horizontal ? "start" : "center",
    };

    return html`
      <ha-card @click=${this.clickHandler} style=${styleMap(styles)}>
        <div class="gauge-container">
          ${this.renderIcon()} ${this.renderGauge()}
        </div>
        ${this.renderText()}
      </ha-card>
    `;
  }

  renderText() {
    if (this._config.hideText) return;
    return html`
      <engauge-text
        primaryInfo=${ifDefined(this._state)}
        secondaryInfo=${ifDefined(this._name)}
        primaryFontSize=${ifDefined(this._config.primaryFontSize)}
        secondaryFontSize=${ifDefined(this._config.secondaryFontSize)}
        unitFontSize=${ifDefined(this._config.unitFontSize)}
        unit=${ifDefined(this._unit)}
        horizontal=${ifDefined(this._config.horizontal)}
      >
      </engauge-text>
    `;
  }

  renderGauge() {
    return html`
      <engauge-gauge
        value=${this._state}
        size=${this._config.size ?? 100}
        dialWidth=${this._config.dialWidth ?? 12}
        valueWidth=${this._config.valueWidth ?? 12}
        min=${this._config.min ?? 0}
        max=${this._config.max ?? 100}
        dialColor=${ifDefined(this._dialColor)}
        valueColor=${ifDefined(this._valueColor)}
        backgroundColor=${ifDefined(this._backgroundColor)}
        backgroundRadius=${ifDefined(this._config.backgroundRadius)}
        startAngle=${this._config.startAngle ?? 270}
        animationDuration=${this._config.animationDuration ?? 0.7}
        rounded=${this._config.rounded ?? true}
      ></engauge-gauge>
    `;
  }

  renderIcon() {
    return html`<engauge-icon
      icon=${ifDefined(this._icon)}
      color=${ifDefined(this._iconColor)}
      size=${ifDefined(this._config.iconSize)}
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
    this.initGauge();
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

(window as any).customCards = (window as any).customCards || [];
(window as any).customCards.push({
  type: "engauge-card",
  name: "Engauge Card",
  description: "A gauge I wanted",
});
