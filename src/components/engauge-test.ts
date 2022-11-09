import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("engauge-test")
export class EngaugeTest extends LitElement {
  protected render(): TemplateResult {
    return html`<div>test</div>`;
  }
}
