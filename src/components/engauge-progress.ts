import { html, LitElement, TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("engauge-progress")
export class EngaugeProgress extends LitElement {
  protected render(): TemplateResult {
    return html` <style>
        :host {
          color: white;
        }
      </style>
      <div>test this is it</div>`;
  }
}
