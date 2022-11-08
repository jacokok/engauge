interface Options {
  radius: number;
  startAngle: number;
  endAngle: number;
  value: number;
  max: number;
  min: number;
  valueDialClass: string;
  valueTextClass: string;
  dialClass: string;
  gaugeClass: string;
  viewBox: string;
  valueLabelClass: string;
  showValue: boolean;
  color: (val: number) => string;
  label: (val: number) => number;
}

interface AnimationOptions {
  start: number;
  end: number;
  duration: number;
  step: (val: number, frame: number) => void;
  easing?: (pos: number) => number;
}

export class Gauge {
  private gaugeContainer: HTMLElement;
  private options: Options;
  private requestAnimationFrame: (callback: FrameRequestCallback) => number;
  private gaugeDefaults = {
    centerX: 50,
    centerY: 50,
  };

  private defaultOptions: Options = {
    radius: 40,
    startAngle: 135,
    endAngle: 45,
    value: 0,
    max: 100,
    min: 0,
    valueDialClass: "value",
    valueTextClass: "value-text",
    dialClass: "dial",
    gaugeClass: "gauge",
    viewBox: "0 0 100 100",
    valueLabelClass: "valueLabelClass",
    showValue: true,
    color: function (val: number) {
      return "red";
    },
    label: function (val: number) {
      return Math.round(val);
    },
  };

  private gaugeValueElem: SVGElement;
  private gaugeValuePath: SVGElement;

  constructor(elem: HTMLElement, options: Partial<Options>) {
    this.gaugeContainer = elem;
    this.options = { ...this.defaultOptions, ...options };

    this.requestAnimationFrame = window.requestAnimationFrame;

    if (this.options.startAngle < this.options.endAngle) {
      console.log("WARN! startAngle < endAngle, Swapping");
      let tmp = this.options.startAngle;
      this.options.startAngle = this.options.endAngle;
      this.options.endAngle = tmp;
    }

    this.gaugeValueElem = this.renderSVG("text", {
      x: "50",
      y: "50",
      fill: "#999",
      "font-size": "100%",
      "font-family": "sans-serif",
      "font-weight": "normal",
      "text-anchor": "middle",
      "alignment-baseline": "middle",
      "dominant-baseline": "central",
    });
    this.gaugeValuePath = this.renderSVG("path", {
      class: this.options.valueDialClass,
      fill: "none",
      stroke: "#666",
      "stroke-width": "2.5",
      d: this.pathString(
        this.options.radius,
        this.options.startAngle,
        this.options.startAngle
      ).toString(),
    });

    var angle = this.getAngle(
      100,
      360 - Math.abs(this.options.startAngle - this.options.endAngle)
    );
    var flag = angle <= 180 ? 0 : 1;
    var gaugeElement = this.renderSVG(
      "svg",
      {
        viewBox: this.options.viewBox || "0 0 100 100",
        class: this.options.gaugeClass,
      },
      [
        this.renderSVG("path", {
          class: this.options.dialClass,
          fill: "none",
          stroke: "#eee",
          "stroke-width": "2",
          d: this.pathString(
            this.options.radius,
            this.options.startAngle,
            this.options.endAngle,
            flag
          ),
        }),
        this.renderSVG("g", { class: "text-container" }, [this.gaugeValueElem]),
        this.gaugeValuePath,
      ]
    );

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
    var cx = this.gaugeDefaults.centerX,
      cy = this.gaugeDefaults.centerY;
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

  private updateGauge(theValue: number, frame?: number) {
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
    if (this.options.showValue) {
      this.gaugeValueElem.textContent = this.options.label
        .call(this.options, theValue)
        .toString();
    }
    this.gaugeValuePath.setAttribute(
      "d",
      this.pathString(
        this.options.radius,
        this.options.startAngle,
        angle + this.options.startAngle,
        flag
      )
    );
  }

  private setGaugeColor(value: number, duration: number) {
    const color = this.options.color.call(this.options, value);
    const dur = duration * 1000;
    const pathTransition = "stroke " + dur + "ms ease";
    this.gaugeValuePath.style.stroke = color;
    this.gaugeValuePath.style.transition = pathTransition;
  }

  public setMaxValue(max: number) {
    this.options.max = max;
  }

  public setValue(value: number) {
    value = this.normalize(value, this.options.min, this.options.max);
    // if (this.options.color) {
    this.setGaugeColor(value, 0);
    // }
    this.updateGauge(value);
  }

  public setValueAnimated(value: number, duration: number) {
    value = this.normalize(value, this.options.min, this.options.max);

    if (this.options.value === value) {
      return;
    }
    this.updateGauge(value);
    this.setGaugeColor(value, duration);

    const step = (val: number, frame: number) => {
      this.updateGauge(val, frame);
    };

    this.animate({
      start: this.options.value || 0,
      end: value,
      duration: duration || 1,
      step: step,
    });

    this.updateGauge(value);
  }

  public getValue() {
    return this.options.value;
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
      step(value, currentIteration);
      currentIteration += 1;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }
    // start!
    requestAnimationFrame(animate);
  }
}
