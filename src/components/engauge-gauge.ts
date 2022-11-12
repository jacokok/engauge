import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement, query } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";

@customElement("engauge-gauge")
export class EngaugeGauge extends LitElement {
  @property() public value: number = 0;
  @property() public size: number = 100;
  @property() public dialWidth?: number = 12;
  @property() public valueWidth?: number = 12;
  @property() public min: number = 0;
  @property() public max: number = 100;
  @property() public dialColor: string = "var(--primary-background-color)";
  @property() public valueColor: string = "var(--primary-color)";
  @property() public backgroundColor: string = "none";
  @property() public startAngle: number = 270;
  @property() public animationDuration: number = 0.7;

  @query("svg circle#value") private valueElement?: SVGGeometryElement;

  private oldValue: number = 0;

  firstUpdated() {
    this.updateGaugeAnimated();
  }

  protected render(): TemplateResult {
    this.updateGaugeAnimated();
    return html` <svg
      viewBox="0 0 100 100"
      class="gauge"
      style=${this.gaugeStyles()}
    >
      <circle
        fill=${this.backgroundColor}
        class="background"
        stroke="none"
        cx="50"
        cy="50"
        r="40"
        style=${this.backgroundCircleStyles()}
      ></circle>
      <circle
        fill="none"
        class="dial"
        stroke=${this.dialColor}
        stroke-width=${this.dialWidth}
        stroke-linecap="round"
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
        stroke-linecap="round"
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
      transition: `fill ${this.animationDuration}s ease`,
    };
    return styleMap(styles);
  }

  private valueCircleStyles() {
    const styles = {
      transition: `fill ${this.animationDuration}s ease`,
      transformOrigin: "center",
      transform: `rotate(${this.startAngle}deg)`,
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
