import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement, query } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";
import { colors } from "../colors";

@customElement("engauge-gauge")
export class EngaugeGauge extends LitElement {
  @property() public value: number = 0;
  @property() public size: number = 50;
  @property() public dialWidth?: number = 5;
  @property() public valueWidth?: number = 5;
  @property() public min: number = 0;
  @property() public max: number = 100;
  @property() public dialColor: string = colors.blue.background;
  @property() public valueColor: string = colors.blue.color;
  @property() public backgroundColor: string = colors.blue.background;
  @property() public backgroundRadius: number = 40;
  @property() public startAngle: number = 270;
  @property() public animationDuration: number = 0.7;
  @property() public rounded: boolean = true;

  @query("svg circle#value") private valueElement?: SVGGeometryElement;

  private oldValue: number = 0;

  firstUpdated() {
    this.updateGaugeAnimated();
  }

  protected render(): TemplateResult {
    this.updateGaugeAnimated();
    return html` <style>
        :host {
          height: ${this.size}px;
        }
      </style>
      <svg viewBox="0 0 100 100" class="gauge" style=${this.gaugeStyles()}>
        <circle
          fill=${this.backgroundColor}
          class="background"
          stroke="none"
          cx="50"
          cy="50"
          r=${this.backgroundRadius}
          style=${this.backgroundCircleStyles()}
        ></circle>
        <circle
          fill="none"
          class="dial"
          stroke=${this.dialColor}
          stroke-width=${this.dialWidth}
          cx="50"
          cy="50"
          r="40"
          style=${this.dialCircleStyles()}
        ></circle>
        <circle
          id="value"
          class="value"
          fill="none"
          stroke=${this.valueColor}
          stroke-width=${this.valueWidth}
          stroke-dasharray="251 251"
          stroke-dashoffset="251"
          cx="50"
          cy="50"
          r="40"
          style=${this.valueCircleStyles()}
        ></circle>
      </svg>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      svg.gauge {
        height: 100%;
      }
    `;
  }

  private gaugeStyles() {
    const gaugeStyles = {
      maxWidth: "250px",
      height: this.size + "px",
    };
    return styleMap(gaugeStyles);
  }

  private backgroundCircleStyles() {
    const styles = {
      transition: `fill ${this.animationDuration}s ease`,
    };
    return styleMap(styles);
  }

  private dialCircleStyles() {
    const styles = {
      transition: `stroke ${this.animationDuration}s ease`,
    };
    return styleMap(styles);
  }

  private valueCircleStyles() {
    const styles = {
      transition: `stroke-dashoffset ${this.animationDuration}s, stroke ${this.animationDuration}s 0s`,
      transformOrigin: "center",
      transform: `rotate(${this.startAngle}deg)`,
      strokeLinecap: this.rounded ? "round" : "unset",
    };
    return styleMap(styles);
  }

  private getValueInPercentage(value: number, min: number, max: number) {
    const newMax = max - min,
      newVal = value - min;
    const result = (100 * newVal) / newMax;
    return result > 100 ? 100 : result;
  }

  private updateGaugeAnimated() {
    if (!this.valueElement) return;
    const fromPercentage = this.getValueInPercentage(
      this.oldValue,
      this.min,
      this.max
    );
    const toPercentage = this.getValueInPercentage(
      this.value,
      this.min,
      this.max
    );
    const length = this.valueElement.getTotalLength();
    const newFromPercentage = (length / 100) * fromPercentage;
    const newToPercentage = (length / 100) * toPercentage;

    this.valueElement.style.transition = this.valueElement.style.transition =
      "none";
    this.valueElement.style.strokeDasharray = length + " " + length;
    this.valueElement.style.strokeDashoffset = (
      length - newFromPercentage
    ).toString();

    this.valueElement.getBoundingClientRect();

    this.valueElement.style.transition = `stroke-dashoffset ${this.animationDuration}s ease-in-out`;
    this.valueElement.style.strokeDashoffset = (
      length - newToPercentage
    ).toString();
    this.oldValue = this.value;
  }
}
