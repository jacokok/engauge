import { HassEntity } from "home-assistant-js-websocket";

export const computeDomain = (entityId: string): string =>
  entityId.substring(0, entityId.indexOf("."));

const DEFAULT_DOMAIN_ICON = "mdi:bookmark";

const FIXED_DOMAIN_ICONS: Record<string, string> = {
  alert: "mdi:alert",
  air_quality: "mdi:air-filter",
  automation: "mdi:robot",
  calendar: "mdi:calendar",
  camera: "mdi:video",
  climate: "mdi:thermostat",
  configurator: "mdi:cog",
  conversation: "mdi:text-to-speech",
  counter: "mdi:counter",
  fan: "mdi:fan",
  google_assistant: "mdi:google-assistant",
  group: "mdi:google-circles-communities",
  homeassistant: "mdi:home-assistant",
  homekit: "mdi:home-automation",
  image_processing: "mdi:image-filter-frames",
  input_button: "mdi:gesture-tap-button",
  input_datetime: "mdi:calendar-clock",
  input_number: "mdi:ray-vertex",
  input_select: "mdi:format-list-bulleted",
  input_text: "mdi:form-textbox",
  light: "mdi:lightbulb",
  mailbox: "mdi:mailbox",
  notify: "mdi:comment-alert",
  number: "mdi:ray-vertex",
  persistent_notification: "mdi:bell",
  person: "mdi:account",
  plant: "mdi:flower",
  proximity: "mdi:apple-safari",
  remote: "mdi:remote",
  scene: "mdi:palette",
  script: "mdi:script-text",
  select: "mdi:format-list-bulleted",
  sensor: "mdi:eye",
  siren: "mdi:bullhorn",
  simple_alarm: "mdi:bell",
  sun: "mdi:white-balance-sunny",
  timer: "mdi:timer-outline",
  updater: "mdi:cloud-upload",
  vacuum: "mdi:robot-vacuum",
  water_heater: "mdi:thermometer",
  zone: "mdi:map-marker-radius",
};

export function domainIcon(
  domain: string,
  stateObj?: HassEntity,
  state?: string
): string {
  const compareState = state !== undefined ? state : stateObj?.state;

  switch (domain) {
    case "alarm_control_panel":
      return alarmPanelIcon(compareState);

    case "binary_sensor":
      return binarySensorIcon(compareState, stateObj);

    case "button":
      switch (stateObj?.attributes.device_class) {
        case "restart":
          return "mdi:restart";
        case "update":
          return "mdi:package-up";
        default:
          return "mdi:gesture-tap-button";
      }

    case "cover":
      return coverIcon(compareState, stateObj);

    case "device_tracker":
      if (stateObj?.attributes.source_type === "router") {
        return compareState === "home"
          ? "mdi:lan-connect"
          : "mdi:lan-disconnect";
      }
      if (
        ["bluetooth", "bluetooth_le"].includes(stateObj?.attributes.source_type)
      ) {
        return compareState === "home"
          ? "mdi:bluetooth-connect"
          : "mdi:bluetooth";
      }
      return compareState === "not_home"
        ? "mdi:account-arrow-right"
        : "mdi:account";

    case "humidifier":
      return compareState && compareState === "off"
        ? "mdi:air-humidifier-off"
        : "mdi:air-humidifier";

    case "input_boolean":
      return compareState === "on"
        ? "mdi:check-circle-outline"
        : "mdi:close-circle-outline";

    case "input_datetime":
      if (!stateObj?.attributes.has_date) {
        return "mdi:clock";
      }
      if (!stateObj.attributes.has_time) {
        return "mdi:calendar";
      }
      break;

    case "lock":
      switch (compareState) {
        case "unlocked":
          return "mdi:lock-open";
        case "jammed":
          return "mdi:lock-alert";
        case "locking":
        case "unlocking":
          return "mdi:lock-clock";
        default:
          return "mdi:lock";
      }

    case "media_player":
      switch (stateObj?.attributes.device_class) {
        case "speaker":
          switch (compareState) {
            case "playing":
              return "mdi:speaker-play";
            case "paused":
              return "mdi:speaker-pause";
            case "off":
              return "mdi:speaker-off";
            default:
              return "mdi:speaker";
          }
        case "tv":
          switch (compareState) {
            case "playing":
              return "mdi:television-play";
            case "paused":
              return "mdi:television-pause";
            case "off":
              return "mdi:television-off";
            default:
              return "mdi:television";
          }
        case "receiver":
          switch (compareState) {
            case "off":
              return "mdi:audio-video-off";
            default:
              return "mdi:audio-video";
          }
        default:
          switch (compareState) {
            case "playing":
            case "paused":
              return "mdi:cast-connected";
            case "off":
              return "mdi:cast-off";
            default:
              return "mdi:cast";
          }
      }

    case "person":
      return compareState === "not_home"
        ? "mdi:account-arrow-right"
        : "mdi:account";

    case "switch":
      switch (stateObj?.attributes.device_class) {
        case "outlet":
          return compareState === "on"
            ? "mdi:power-plug"
            : "mdi:power-plug-off";
        case "switch":
          return compareState === "on"
            ? "mdi:toggle-switch-variant"
            : "mdi:toggle-switch-variant-off";
        default:
          return "mdi:toggle-switch-variant";
      }

    case "sensor": {
      const icon = sensorIcon(stateObj);
      if (icon) {
        return icon;
      }

      break;
    }

    case "sun":
      return stateObj?.state === "above_horizon"
        ? FIXED_DOMAIN_ICONS[domain]
        : "mdi:weather-night";

    case "switch_as_x":
      return "mdi:swap-horizontal";

    case "threshold":
      return "mdi:chart-sankey";

    case "weather":
      return weatherIcon(stateObj?.state);
  }

  if (domain in FIXED_DOMAIN_ICONS) {
    return FIXED_DOMAIN_ICONS[domain];
  }

  return DEFAULT_DOMAIN_ICON;
}

const alarmPanelIcon = (state?: string) => {
  switch (state) {
    case "armed_away":
      return "mdi:shield-lock";
    case "armed_vacation":
      return "mdi:shield-airplane";
    case "armed_home":
      return "mdi:shield-home";
    case "armed_night":
      return "mdi:shield-moon";
    case "armed_custom_bypass":
      return "mdi:security";
    case "pending":
    case "arming":
      return "mdi:shield-sync";
    case "triggered":
      return "mdi:bell-ring";
    case "disarmed":
      return "mdi:shield-off";
    default:
      return "mdi:shield";
  }
};

const binarySensorIcon = (state?: string, stateObj?: HassEntity) => {
  const isOff = state === "off";
  switch (stateObj?.attributes.device_class) {
    case "battery":
      return isOff ? "mdi:battery" : "mdi:battery-outline";
    case "battery_charging":
      return isOff ? "mdi:battery" : "mdi:battery-charging";
    case "carbon_monoxide":
      return isOff ? "mdi:smoke-detector" : "mdi:smoke-detector-alert";
    case "cold":
      return isOff ? "mdi:thermometer" : "mdi:snowflake";
    case "connectivity":
      return isOff ? "mdi:close-network-outline" : "mdi:check-network-outline";
    case "door":
      return isOff ? "mdi:door-closed" : "mdi:door-open";
    case "garage_door":
      return isOff ? "mdi:garage" : "mdi:garage-open";
    case "power":
      return isOff ? "mdi:power-plug-off" : "mdi:power-plug";
    case "gas":
    case "problem":
    case "safety":
    case "tamper":
      return isOff ? "mdi:check-circle" : "mdi:alert-circle";
    case "smoke":
      return isOff
        ? "mdi:smoke-detector-variant"
        : "mdi:smoke-detector-variant-alert";
    case "heat":
      return isOff ? "mdi:thermometer" : "mdi:fire";
    case "light":
      return isOff ? "mdi:brightness-5" : "mdi:brightness-7";
    case "lock":
      return isOff ? "mdi:lock" : "mdi:lock-open";
    case "moisture":
      return isOff ? "mdi:water-off" : "mdi:water";
    case "motion":
      return isOff ? "mdi:motion-sensor-off" : "mdi:motion-sensor";
    case "occupancy":
      return isOff ? "mdi:home-outline" : "mdi:home";
    case "opening":
      return isOff ? "mdi:square" : "mdi:square-outline";
    case "plug":
      return isOff ? "mdi:power-plug-off" : "mdi:power-plug";
    case "presence":
      return isOff ? "mdi:home-outline" : "mdi:home";
    case "running":
      return isOff ? "mdi:stop" : "mdi:play";
    case "sound":
      return isOff ? "mdi:music-note-off" : "mdi:music-note";
    case "update":
      return isOff ? "mdi:package" : "mdi:package-up";
    case "vibration":
      return isOff ? "mdi:crop-portrait" : "mdi:vibrate";
    case "window":
      return isOff ? "mdi:window-closed" : "mdi:window-open";
    default:
      return isOff ? "mdi:radiobox-blank" : "mdi:checkbox-marked-circle";
  }
};

export const coverIcon = (state?: string, stateObj?: HassEntity): string => {
  const open = state !== "closed";

  switch (stateObj?.attributes.device_class) {
    case "garage":
      switch (state) {
        case "opening":
          return "mdi:arrow-up-box";
        case "closing":
          return "mdi:arrow-down-box";
        case "closed":
          return "mdi:garage";
        default:
          return "mdi:garage-open";
      }
    case "gate":
      switch (state) {
        case "opening":
        case "closing":
          return "mdi:gate-arrow-right";
        case "closed":
          return "mdi:gate";
        default:
          return "mdi:gate-open";
      }
    case "door":
      return open ? "mdi:door-open" : "mdi:door-closed";
    case "damper":
      return open ? "mdi:circle" : "mdi:circle-slice-8";
    case "shutter":
      switch (state) {
        case "opening":
          return "mdi:arrow-up-box";
        case "closing":
          return "mdi:arrow-down-box";
        case "closed":
          return "mdi:window-shutter";
        default:
          return "mdi:window-shutter-open";
      }
    case "curtain":
      switch (state) {
        case "opening":
          return "mdi:arrow-split-vertical";
        case "closing":
          return "mdi:arrow-collapse-horizontal";
        case "closed":
          return "mdi:curtains-closed";
        default:
          return "mdi:curtains";
      }
    case "blind":
      switch (state) {
        case "opening":
          return "mdi:arrow-up-box";
        case "closing":
          return "mdi:arrow-down-box";
        case "closed":
          return "mdi:blinds-horizontal-closed";
        default:
          return "mdi:blinds-horizontal";
      }
    case "shade":
      switch (state) {
        case "opening":
          return "mdi:arrow-up-box";
        case "closing":
          return "mdi:arrow-down-box";
        case "closed":
          return "mdi:roller-shade-closed";
        default:
          return "mdi:roller-shade";
      }
    case "window":
      switch (state) {
        case "opening":
          return "mdi:arrow-up-box";
        case "closing":
          return "mdi:arrow-down-box";
        case "closed":
          return "mdi:window-closed";
        default:
          return "mdi:window-open";
      }
  }

  switch (state) {
    case "opening":
      return "mdi:arrow-up-box";
    case "closing":
      return "mdi:arrow-down-box";
    case "closed":
      return "mdi:window-closed";
    default:
      return "mdi:window-open";
  }
};

export const computeOpenIcon = (stateObj: HassEntity): string => {
  switch (stateObj.attributes.device_class) {
    case "awning":
    case "curtain":
    case "door":
    case "gate":
      return "mdi:arrow-expand-horizontal";
    default:
      return "mdi:arrow-up";
  }
};

export const computeCloseIcon = (stateObj: HassEntity): string => {
  switch (stateObj.attributes.device_class) {
    case "awning":
    case "curtain":
    case "door":
    case "gate":
      return "mdi:arrow-collapse-horizontal";
    default:
      return "mdi:arrow-down";
  }
};

const FIXED_DEVICE_CLASS_ICONS: Record<string, string> = {
  apparent_power: "mdi:flash",
  aqi: "mdi:air-filter",
  atmospheric_pressure: "mdi:thermometer-lines",
  // battery: "mdi:battery", => not included by design since `sensorIcon()` will dynamically determine the icon
  carbon_dioxide: "mdi:molecule-co2",
  carbon_monoxide: "mdi:molecule-co",
  current: "mdi:current-ac",
  data_rate: "mdi:transmission-tower",
  data_size: "mdi:database",
  date: "mdi:calendar",
  distance: "mdi:arrow-left-right",
  duration: "mdi:progress-clock",
  energy: "mdi:lightning-bolt",
  frequency: "mdi:sine-wave",
  gas: "mdi:meter-gas",
  humidity: "mdi:water-percent",
  illuminance: "mdi:brightness-5",
  irradiance: "mdi:sun-wireless",
  moisture: "mdi:water-percent",
  monetary: "mdi:cash",
  nitrogen_dioxide: "mdi:molecule",
  nitrogen_monoxide: "mdi:molecule",
  nitrous_oxide: "mdi:molecule",
  ozone: "mdi:molecule",
  pm1: "mdi:molecule",
  pm10: "mdi:molecule",
  pm25: "mdi:molecule",
  power: "mdi:flash",
  power_factor: "mdi:angle-acute",
  precipitation: "mdi:weather-rainy",
  precipitation_intensity: "mdi:weather-pouring",
  pressure: "mdi:gauge",
  reactive_power: "mdi:flash",
  signal_strength: "mdi:wifi",
  sound_pressure: "mdi:ear-hearing",
  speed: "mdi:speedometer",
  sulphur_dioxide: "mdi:molecule",
  temperature: "mdi:thermometer",
  timestamp: "mdi:clock",
  volatile_organic_compounds: "mdi:molecule",
  voltage: "mdi:sine-wave",
  volume: "mdi:car-coolant-level",
  water: "mdi:water",
  weight: "mdi:weight",
  wind_speed: "mdi:weather-windy",
};

const SENSOR_DEVICE_CLASS_BATTERY = "battery";

const BATTERY_ICONS: Record<string, string> = {
  10: "mdi:battery-10",
  20: "mdi:battery-20",
  30: "mdi:battery-30",
  40: "mdi:battery-40",
  50: "mdi:battery-50",
  60: "mdi:battery-60",
  70: "mdi:battery-70",
  80: "mdi:battery-80",
  90: "mdi:battery-90",
  100: "mdi:battery",
};
const BATTERY_CHARGING_ICONS: Record<string, string> = {
  10: "mdi:battery-charging-10",
  20: "mdi:battery-charging-20",
  30: "mdi:battery-charging-30",
  40: "mdi:battery-charging-40",
  50: "mdi:battery-charging-50",
  60: "mdi:battery-charging-60",
  70: "mdi:battery-charging-70",
  80: "mdi:battery-charging-80",
  90: "mdi:battery-charging-90",
  100: "mdi:battery-charging",
};

export const UNIT_C = "°C";
export const UNIT_F = "°F";

const batteryStateIcon = (
  batteryEntity: HassEntity,
  batteryChargingEntity?: HassEntity
) => {
  const battery = batteryEntity.state;
  const batteryCharging = batteryChargingEntity?.state === "on";

  return batteryIcon(battery, batteryCharging);
};

export const batteryIcon = (
  batteryState: number | string,
  batteryCharging?: boolean
) => {
  const batteryValue = Number(batteryState);
  if (isNaN(batteryValue)) {
    if (batteryState === "off") {
      return "mdi:battery";
    }
    if (batteryState === "on") {
      return "mdi:battery-alert";
    }
    return "mdi:battery-unknown";
  }

  const batteryRound = Math.round(batteryValue / 10) * 10;
  if (batteryCharging && batteryValue >= 10) {
    return BATTERY_CHARGING_ICONS[batteryRound];
  }
  if (batteryCharging) {
    return "mdi:battery-charging-outline";
  }
  if (batteryValue <= 5) {
    return "mdi:battery-alert-variant-outline";
  }
  return BATTERY_ICONS[batteryRound];
};

export const sensorIcon = (entity?: HassEntity): string | undefined => {
  const dclass = entity?.attributes.device_class;

  if (dclass && dclass in FIXED_DEVICE_CLASS_ICONS) {
    return FIXED_DEVICE_CLASS_ICONS[dclass];
  }

  if (dclass === SENSOR_DEVICE_CLASS_BATTERY) {
    return entity ? batteryStateIcon(entity) : "mdi:battery";
  }

  const unit = entity?.attributes.unit_of_measurement;
  if (unit === UNIT_C || unit === UNIT_F) {
    return "mdi:thermometer";
  }

  return undefined;
};

const weatherIcons: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

export const weatherIcon = (state?: string, nightTime?: boolean): string =>
  !state
    ? "mdi:information"
    : nightTime && state === "partlycloudy"
    ? "mdiWeatherNightPartlyCloudy"
    : weatherIcons[state];
