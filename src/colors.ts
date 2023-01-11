import { css, CSSResultGroup } from "lit";

interface ColorValues {
  color: string;
  background: string;
}

export interface Colors {
  red: ColorValues;
  pink: ColorValues;
  purple: ColorValues;
  deepPurple: ColorValues;
  indigo: ColorValues;
  blue: ColorValues;
  lightBlue: ColorValues;
  cyan: ColorValues;
  teal: ColorValues;
  green: ColorValues;
  lightGreen: ColorValues;
  lime: ColorValues;
  yellow: ColorValues;
  amber: ColorValues;
  orange: ColorValues;
  deepOrange: ColorValues;
  brown: ColorValues;
  grey: ColorValues;
  blueGrey: ColorValues;
  black: ColorValues;
  white: ColorValues;
  disabled: ColorValues;
}

export const colors: Colors = {
  red: { color: "var(--engauge-red)", background: "var(--engauge-red-b)" },
  pink: { color: "var(--engauge-pink)", background: "var(--engauge-pink-b)" },
  purple: {
    color: "var(--engauge-purple)",
    background: "var(--engauge-purple-b)",
  },
  deepPurple: {
    color: "var(--engauge-deep-purple)",
    background: "var(--engauge-deep-purple-b)",
  },
  indigo: {
    color: "var(--engauge-indigo)",
    background: "var(--engauge-indigo-b)",
  },
  blue: { color: "var(--engauge-blue)", background: "var(--engauge-blue-b)" },
  lightBlue: {
    color: "var(--engauge-light-blue)",
    background: "var(--engauge-light-blue-b)",
  },
  cyan: { color: "var(--engauge-cyan)", background: "var(--engauge-cyan-b)" },
  teal: { color: "var(--engauge-teal)", background: "var(--engauge-teal-b)" },
  green: {
    color: "var(--engauge-green)",
    background: "var(--engauge-green-b)",
  },
  lightGreen: {
    color: "var(--engauge-light-green)",
    background: "var(--engauge-light-green-b)",
  },
  lime: { color: "var(--engauge-lime)", background: "var(--engauge-lime-b)" },
  yellow: {
    color: "var(--engauge-yellow)",
    background: "var(--engauge-yellow-b)",
  },
  amber: {
    color: "var(--engauge-amber)",
    background: "var(--engauge-amber-b)",
  },
  orange: {
    color: "var(--engauge-orange)",
    background: "var(--engauge-orange-b)",
  },
  deepOrange: {
    color: "var(--engauge-deep-orange)",
    background: "var(--engauge-deep-orange-b)",
  },
  brown: {
    color: "var(--engauge-brown)",
    background: "var(--engauge-brown-b)",
  },
  grey: { color: "var(--engauge-grey)", background: "var(--engauge-grey-b)" },
  blueGrey: {
    color: "var(--engauge-blue-grey)",
    background: "var(--engauge-blue-grey-b)",
  },
  black: {
    color: "var(--engauge-black)",
    background: "var(--engauge-black-b)",
  },
  white: {
    color: "var(--engauge-white)",
    background: "var(--engauge-white-b)",
  },
  disabled: {
    color: "var(--engauge-disabled)",
    background: "var(--engauge-disabled-b)",
  },
};

export const defaultColorCss: CSSResultGroup = css`
  :host {
    --engauge-red: rgb(244, 67, 54);
    --engauge-pink: rgb(233, 30, 99);
    --engauge-purple: rgb(156, 39, 176);
    --engauge-deep-purple: rgb(103, 58, 183);
    --engauge-indigo: rgb(63, 81, 181);
    --engauge-blue: rgb(33, 150, 243);
    --engauge-light-blue: rgb(3, 169, 244);
    --engauge-cyan: rgb(0, 188, 212);
    --engauge-teal: rgb(0, 150, 136);
    --engauge-green: rgb(76, 175, 80);
    --engauge-light-green: rgb(139, 195, 74);
    --engauge-lime: rgb(205, 220, 57);
    --engauge-yellow: rgb(255, 235, 59);
    --engauge-amber: rgb(255, 193, 7);
    --engauge-orange: rgb(255, 152, 0);
    --engauge-deep-orange: rgb(255, 87, 34);
    --engauge-brown: rgb(121, 85, 72);
    --engauge-grey: rgb(158, 158, 158);
    --engauge-blue-grey: rgb(96, 125, 139);
    --engauge-black: rgb(0, 0, 0);
    --engauge-white: rgb(255, 255, 255);
    --engauge-disabled: rgb(189, 189, 189);

    --engauge-red-b: rgba(244, 67, 54, 0.2);
    --engauge-pink-b: rgba(233, 30, 99, 0.2);
    --engauge-purple-b: rgba(156, 39, 176, 0.2);
    --engauge-deep-purple-b: rgba(103, 58, 183, 0.2);
    --engauge-indigo-b: rgba(63, 81, 181, 0.2);
    --engauge-blue-b: rgba(33, 150, 243, 0.2);
    --engauge-light-blue-b: rgba(3, 169, 244, 0.2);
    --engauge-cyan-b: rgba(0, 188, 212, 0.2);
    --engauge-teal-b: rgba(0, 150, 136, 0.2);
    --engauge-green-b: rgba(76, 175, 80, 0.2);
    --engauge-light-green-b: rgba(139, 195, 74, 0.2);
    --engauge-lime-b: rgba(205, 220, 57, 0.2);
    --engauge-yellow-b: rgba(255, 235, 59, 0.2);
    --engauge-amber-b: rgba(255, 193, 7, 0.2);
    --engauge-orange-b: rgba(255, 152, 0, 0.2);
    --engauge-deep-orange-b: rgba(255, 87, 34, 0.2);
    --engauge-brown-b: rgba(121, 85, 72, 0.2);
    --engauge-grey-b: rgba(158, 158, 158, 0.2);
    --engauge-blue-grey-b: rgba(96, 125, 139, 0.2);
    --engauge-black-b: rgba(0, 0, 0, 0.2);
    --engauge-white-b: rgba(255, 255, 255, 0.2);
    --engauge-disabled-b: rgba(189, 189, 189, 0.2);
  }
  :host([dark-mode]) {
    --engauge-disabled: rgb(111, 111, 111);
    --engauge-disabled-b: rgba(111, 111, 111, 0.2);
  }
`;
