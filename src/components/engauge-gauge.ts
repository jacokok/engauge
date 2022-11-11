import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement, query } from "lit/decorators.js";
import { AnimationOptions } from "../types";
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

  @query("svg path#value") private valueElement?: HTMLElement;

  private oldValue: number = 0;
  private radius: number = 40;
  private startAngle: number = 271;
  private endAngle: number = 270;
  private animationDuration: number = 1;
  private requestAnimationFrame = window.requestAnimationFrame;

  firstUpdated() {
    this.setValueAnim();
  }

  protected render(): TemplateResult {
    const gaugeStyles = {
      maxWidth: "250px",
      height: this.size + "px",
    };
    this.setValueAnim();
    return html` <svg
      viewBox="0 0 100 100"
      class="gauge"
      style=${styleMap(gaugeStyles)}
    >
      <circle
        fill=${this.backgroundColor}
        class="background"
        stroke="none"
        cx="50"
        cy="50"
        r="30"
      ></circle>
      <path
        class="dial"
        fill="none"
        stroke=${this.dialColor}
        stroke-width=${this.dialWidth}
        stroke-linecap="round"
        d=${this.pathString(this.radius, this.startAngle, this.endAngle)}
      ></path>
      <path
        id="value"
        class="value"
        fill="none"
        stroke=${this.valueColor}
        stroke-linecap="round"
        stroke-width=${this.valueWidth}
        d=""
        style="transition: stroke 1000ms ease 0s;"
      ></path>
    </svg>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      /* :host {
        max-width: 250px;
        height: 100px;
      } */
      svg.gauge {
        height: 100%;
      }
    `;
  }

  private dynamicStyles() {
    const gaugeStyles = {
      maxWidth: "250px",
      height: this.size + "px",
    };
  }

  private getAngle(percentage: number, gaugeSpanAngle: number) {
    return (percentage * gaugeSpanAngle) / 100;
  }

  private normalizeAnim(value: number, min: number, limit: number) {
    var val = Number(value);
    if (val > limit) return limit;
    if (val < min) return min;
    return val;
  }

  private getValueInPercentage(value: number, min: number, max: number) {
    var newMax = max - min,
      newVal = value - min;
    return (100 * newVal) / newMax;
  }

  private getCartesian(cx: number, cy: number, radius: number, angle: number) {
    var rad = (angle * Math.PI) / 180;
    return {
      x: Math.round((cx + radius * Math.cos(rad)) * 1000) / 1000,
      y: Math.round((cy + radius * Math.sin(rad)) * 1000) / 1000,
    };
  }

  private getDialCoords(radius: number, startAngle: number, endAngle: number) {
    var cx = 50,
      cy = 50;
    return {
      end: this.getCartesian(cx, cy, radius, endAngle),
      start: this.getCartesian(cx, cy, radius, startAngle),
    };
  }

  private pathString(
    radius: number,
    startAngle: number,
    endAngle: number,
    largeArc?: number
  ) {
    const coords = this.getDialCoords(radius, startAngle, endAngle),
      start = coords.start,
      end = coords.end,
      largeArcFlag = typeof largeArc === "undefined" ? 1 : largeArc;

    return [
      "M",
      start.x,
      start.y,
      "A",
      radius,
      radius,
      0,
      largeArcFlag,
      1,
      end.x,
      end.y,
    ].join(" ");
  }

  private updateGauge(theValue: number) {
    const val = this.getValueInPercentage(theValue, this.min, this.max);
    const angle = this.getAngle(
      val,
      360 - Math.abs(this.startAngle - this.endAngle)
    );
    const flag = angle <= 180 ? 0 : 1;

    if (this.valueElement) {
      this.valueElement.setAttribute(
        "d",
        this.pathString(
          this.radius,
          this.startAngle,
          angle + this.startAngle,
          flag
        )
      );
    }
  }

  private setGaugeColor(color: string) {
    console.log(color);
  }

  public setValue() {
    const value = this.normalizeAnim(this.value, this.min, this.max);
    this.oldValue = this.value;
    this.value = value;
    // this.setGaugeColor(value, 0);
    this.updateGauge(value);
  }

  public setValueAnim() {
    const value = this.normalizeAnim(this.value, this.min, this.max);
    if (this.value === this.oldValue) {
      return;
    }

    // this.setGaugeColor(value, this.animationDuration);
    const step = (val: number) => {
      this.updateGauge(val);
    };

    this.anim({
      start: this.oldValue,
      end: value,
      duration: this.animationDuration,
      step: step,
    });
    this.oldValue = this.value;
  }

  private anim(options: AnimationOptions) {
    let currentIteration = 1;
    const duration = options.duration,
      iterations = 60 * duration,
      start = options.start || 0,
      end = options.end,
      change = end - start,
      step = options.step,
      easing =
        options.easing ||
        function easeInOutCubic(pos: number) {
          // https://github.com/danro/easing-js/blob/master/easing.js
          if ((pos /= 0.5) < 1) return 0.5 * Math.pow(pos, 3);
          return 0.5 * (Math.pow(pos - 2, 3) + 2);
        };

    const requestAnimationFrame = this.requestAnimationFrame;

    function animate() {
      var progress = currentIteration / iterations,
        value = change * easing(progress) + start;
      step(value);
      currentIteration += 1;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    // start!
    requestAnimationFrame(animate);
  }
}
