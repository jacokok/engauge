import { GaugeOptions, AnimationOptions } from "../types";

export class Gauge {
  private options: GaugeOptions;
  private requestAnimationFrame: (callback: FrameRequestCallback) => number;

  private value: number = 0;
  private gaugeValuePath: SVGElement;

  private defaultOptions: GaugeOptions = {
    startAngle: 271,
    endAngle: 270,
    max: 100,
    min: 0,
    backgroundColor: "none",
    dialColor: "var(--primary-color)",
    gaugeColor: "var(--primary-background-color)",
    dialRounded: true,
    dialWidth: 12,
    gaugeWidth: 12,
  };

  constructor(elem: HTMLElement, options: Partial<GaugeOptions>) {
    this.options = { ...this.defaultOptions, ...options };

    this.requestAnimationFrame = window.requestAnimationFrame;

    if (this.options.startAngle < this.options.endAngle) {
      let tmp = this.options.startAngle;
      this.options.startAngle = this.options.endAngle;
      this.options.endAngle = tmp;
    }

    // const gaugeValueElem = this.renderSVG("text", {
    //   x: "50",
    //   y: "50",
    //   class: "text",
    //   fill: "var(--primary-text-color)",
    //   "font-size": "100%",
    //   "font-family": "sans-serif",
    //   "font-weight": "normal",
    //   "text-anchor": "middle",
    //   "alignment-baseline": "middle",
    //   "dominant-baseline": "central",
    // });
    // const gaugeTextElem = this.renderSVG("text", {
    //   x: "50",
    //   y: "65",
    //   class: "text-value",
    //   fill: "var(--primary-text-color)",
    //   "font-size": "70%",
    //   "font-family": "sans-serif",
    //   "font-weight": "normal",
    //   "text-anchor": "middle",
    //   "alignment-baseline": "middle",
    //   "dominant-baseline": "central",
    // });
    this.gaugeValuePath = this.renderSVG("path", {
      class: "value",
      fill: "none",
      stroke: this.options.dialColor,
      "stroke-linecap": this.options.dialRounded ? "round" : "unset",
      "stroke-width": this.options.dialWidth.toString(),
      d: this.pathString(
        40,
        this.options.startAngle,
        this.options.startAngle
      ).toString(),
    });

    const backgroundCircle = this.renderSVG("circle", {
      fill: this.options.backgroundColor,
      class: "background",
      stroke: "none",
      cx: "50",
      cy: "50",
      r: "30",
    });

    var angle = this.getAngle(
      100,
      360 - Math.abs(this.options.startAngle - this.options.endAngle)
    );
    var flag = angle <= 180 ? 0 : 1;
    var gaugeElement = this.renderSVG(
      "svg",
      {
        viewBox: "0 0 100 100",
        class: "gauge",
      },
      [
        backgroundCircle,
        this.renderSVG("path", {
          class: "dial",
          fill: "none",
          stroke: this.options.gaugeColor,
          "stroke-width": this.options.gaugeWidth.toString(),
          "stroke-linecap": this.options.dialRounded ? "round" : "unset",
          d: this.pathString(
            40,
            this.options.startAngle,
            this.options.endAngle,
            flag
          ),
        }),
        // this.renderSVG("g", { class: "text-value-container" }, [
        //   gaugeValueElem,
        // ]),
        // this.renderSVG("g", { class: "text-container" }, [gaugeTextElem]),
        this.gaugeValuePath,
      ]
    );
    elem.textContent = "";
    elem.appendChild(gaugeElement);
  }

  private renderSVG(
    name: string,
    attrs: Record<string, string>,
    children?: any
  ) {
    var elem = document.createElementNS("http://www.w3.org/2000/svg", name);
    for (var attrName in attrs) {
      elem.setAttribute(attrName, attrs[attrName]);
    }

    if (children) {
      children.forEach(function (c: any) {
        elem.appendChild(c);
      });
    }
    return elem;
  }

  private getAngle(percentage: number, gaugeSpanAngle: number) {
    return (percentage * gaugeSpanAngle) / 100;
  }

  private normalize(value: number, min: number, limit: number) {
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
    var coords = this.getDialCoords(radius, startAngle, endAngle),
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
    this.value = theValue;
    const val = this.getValueInPercentage(
      theValue,
      this.options.min,
      this.options.max
    );
    const angle = this.getAngle(
      val,
      360 - Math.abs(this.options.startAngle - this.options.endAngle)
    );
    const flag = angle <= 180 ? 0 : 1;

    this.gaugeValuePath.setAttribute(
      "d",
      this.pathString(
        40,
        this.options.startAngle,
        angle + this.options.startAngle,
        flag
      )
    );
  }

  private setGaugeColor(value: number, duration: number) {
    const color = this.options.color?.call(this.options, value);
    const dur = duration * 1000;
    const pathTransition = "stroke " + dur + "ms ease";
    this.gaugeValuePath.style.stroke = color ?? this.options.dialColor;
    this.gaugeValuePath.style.transition = pathTransition;
  }

  public setMaxValue(max: number) {
    this.options.max = max;
  }

  public setValue(value: number) {
    value = this.normalize(value, this.options.min, this.options.max);
    this.setGaugeColor(value, 0);
    this.updateGauge(value);
  }

  public setValueAnimated(value: number, duration: number) {
    value = this.normalize(value, this.options.min, this.options.max);

    if (this.value === value) {
      return;
    }
    this.setGaugeColor(value, duration);

    const step = (val: number) => {
      this.updateGauge(val);
    };

    this.animate({
      start: this.value || 0,
      end: value,
      duration: duration || 1,
      step: step,
    });
  }

  public getValue() {
    return this.value;
  }

  private animate(options: AnimationOptions) {
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
