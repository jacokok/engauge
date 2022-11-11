import { css, CSSResultGroup, html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";

@customElement("engauge-text")
export class EngaugeText extends LitElement {
  @property() public primaryInfo?: string;
  @property() public secondaryInfo?: string;
  @property() public unit?: string;

  protected render(): TemplateResult {
    return html` <div class="text">
      <div class="value">
        ${this.primaryInfo}
        <span class="measurement">${this.unit}</span>
      </div>
      <div class="name">${this.secondaryInfo}</div>
    </div>`;
  }

  static get styles(): CSSResultGroup {
    return css`
      .value {
        font-size: 28px;
        margin-right: 4px;
        margin-top: 6px;
        color: var(--primary-text-color);
      }

      .measurement {
        font-size: 18px;
        color: var(--secondary-text-color);
      }

      .name {
        color: var(--secondary-text-color);
        font-weight: 500;
        font-size: 16px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .text {
        margin-top: 5px;
        margin-left: 10px;
      }
    `;
  }
}
