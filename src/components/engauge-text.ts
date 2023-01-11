import { html, LitElement, TemplateResult } from "lit";
import { property, customElement } from "lit/decorators.js";
import { styleMap } from "lit-html/directives/style-map.js";

@customElement("engauge-text")
export class EngaugeText extends LitElement {
  @property() public primaryInfo?: string;
  @property() public primaryFontSize?: number = 14;
  @property() public secondaryInfo?: string;
  @property() public secondaryFontSize?: number = 12;
  @property() public unit?: string;
  @property() public unitFontSize?: number = 12;
  @property() public horizontal: boolean = false;

  protected render(): TemplateResult {
    return html` <div style=${this.allTextStyles()}>
      <div style=${this.primaryTextStyles()}>
        ${this.primaryInfo}
        <span style=${this.unitTextStyles()}>${this.unit}</span>
      </div>
      <div style=${this.secondaryTextStyles()}>${this.secondaryInfo}</div>
    </div>`;
  }

  private primaryTextStyles() {
    const styles = {
      fontSize: this.primaryFontSize + "px",
      color: "var(--primary-text-color)",
      fontWeight: "700",
    };
    return styleMap(styles);
  }

  private secondaryTextStyles() {
    const styles = {
      color: "var(--secondary-text-color)",
      fontWeight: "700",
      fontSize: this.secondaryFontSize + "px",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    };
    return styleMap(styles);
  }

  private unitTextStyles() {
    const styles = {
      fontSize: this.unitFontSize + "px",
      color: "var(--secondary-text-color)",
    };
    return styleMap(styles);
  }

  private allTextStyles() {
    const styles = {
      marginTop: this.horizontal ? "0px" : "5px",
      marginLeft: this.horizontal ? "10px" : "0px",
    };
    return styleMap(styles);
  }
}
