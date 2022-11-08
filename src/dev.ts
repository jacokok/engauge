import { Gauge } from "./gauge";

const element = document.getElementById("engauge") as HTMLElement;

const w = new Gauge(element, {});

w.setValue(40);
w.setValueAnimated(90, 0.6);

// import "./svg-gauge/gauge.js";
// import { GaugeType } from "gauge";

// Create a new Gauge
// let s = document.getElementById("cpuSpeed") as HTMLElement;

// let Gauge: GaugeType = window.Gauge;

// var cpuGauge = Gauge(s, {
//   max: 100,
//   // custom label renderer
//   label: function (value: any) {
//     return Math.round(value) + "/" + this.max;
//   },
//   // value: 50,
//   // Custom dial colors (Optional)
//   color: function (value: any) {
//     if (value < 20) {
//       return "#5ee432"; // green
//     } else if (value < 40) {
//       return "#fffa50"; // yellow
//     } else if (value < 60) {
//       return "#f7aa38"; // orange
//     } else {
//       return "#ef4655"; // red
//     }
//   },
// });

// cpuGauge.setValue(75);
// cpuGauge.setValueAnimated(90, 1);
