import { html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("engauge-icon")
export class EngaugeIcon extends LitElement {
  @property() public icon: string = "mdi:information";
  @property() public color: string = "var(--primary-color)";
  @property() public size: number = 35;
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    return html`
      <style>
        :host {
          position: absolute;
          color: ${this.color};
          --mdc-icon-size: ${this.size}px;
          transition: color 0.7s;
        }
      </style>
      <ha-icon icon=${this.icon}></ha-icon>
    `;
  }
}
