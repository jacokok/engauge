import { html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("engauge-icon")
export class EngaugeIcon extends LitElement {
  @property() public icon?: string;
  @property() public color?: string;
  @property() public size?: number;
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    return html`
      <style>
        :host {
          position: absolute;
          color: ${this.color};
          --mdc-icon-size: ${this.size ?? 35}px;
        }
      </style>
      <ha-icon icon=${this.icon ?? "mdi:information"}></ha-icon>
    `;
  }
}
