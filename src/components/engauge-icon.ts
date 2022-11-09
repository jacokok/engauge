import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("engauge-icon")
export class EngaugeIcon extends LitElement {
  @property() public icon?: string;
  @property() public disabled: boolean = false;

  protected render(): TemplateResult {
    return html`<ha-icon icon=${this.icon ?? "mdi:information"}></ha-icon>`;
  }
}
