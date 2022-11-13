# Engauge

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)
[![Build][build-shield]][build]

Enguage is a circular gauge with icon card. The goal is to be a hot replacement for the build in gauge but with extra options and an icon.

## Installation

### HACS

Mushroom is available in [HACS][hacs] (Home Assistant Community Store).

1. Install HACS if you don't have it already
2. Open HACS in Home Assistant
3. Go to "Frontend" section
4. Click button with "+" icon
5. Search for "Mushroom"

### Preview

![preview](images/preview.svg)

## Options

| Name                | Type    | Requirement  | Description                                                   | Default                         |
| ------------------- | ------- | ------------ | ------------------------------------------------------------- | ------------------------------- |
| `type`              | string  | **Required** | `custom:engauge-card`                                         |                                 |
| `entity`            | string  | **Required** | entity_id                                                     |                                 |
| `name`              | string  | **Optional** | Name                                                          | From Entity                     |
| `horizontal`        | boolean | **Optional** | Horizontal layout                                             | false                           |
| `unit`              | string  | **Optional** | The unit of measure                                           | From Entity                     |
| `icon`              | string  | **Optional** | mdi:icon                                                      | From Entity                     |
| `iconColor`         | string  | **Optional** | Icon color. Severity or segment will override this            |                                 |
| `iconSize`          | number  | **Optional** | Icon size                                                     | 35                              |
| `min`               | number  | **Optional** | Minimum gauge value                                           | 0                               |
| `max`               | number  | **Optional** | Maximum gauge value                                           | 100                             |
| `size`              | number  | **Optional** | Size of gauge                                                 | 100                             |
| `dialColor`         | string  | **Optional** | Color of dial                                                 | var(--primary-background-color) |
| `dialWidth`         | number  | **Optional** | Stroke width of dial                                          | 12                              |
| `valueColor`        | string  | **Optional** | Color of value                                                | var(--primary-color)            |
| `valueWidth`        | number  | **Optional** | Stroke width of value                                         | 12                              |
| `backgroundColor`   | string  | **Optional** | Background Color                                              | none                            |
| `backgroundRadius`  | number  | **Optional** | Background Radius                                             | 40                              |
| `startAngle`        | number  | **Optional** | Start Angle                                                   | 270                             |
| `animationDuration` | number  | **Optional** | Animation Time                                                | 0.7                             |
| `rounded`           | boolean | **Optional** | Strike Cap Rounded                                            | true                            |
| `hideText`          | boolean | **Optional** | Hide all text                                                 | false                           |
| `severity`          | map     | **Optional** | Allows setting of colors for different numbers.               |                                 |
| `segments`          | list    | **Optional** | List of colors and start values. Segments will override this. |                                 |

## Todo

- [x] Update animation from javascript to css
- [ ] Test all options
- [ ] Document all options
- [ ] Create Editor
- [ ] Color animations
- [ ] Color overrides for icon and rest based on severity and segments.
- [x] Add eslint
- [x] Add prettier
- [ ] Add husky
- [x] Fix all hacs issues github action

[releases-shield]: https://img.shields.io/github/v/release/jacokok/engauge.svg?style=for-the-badge
[releases]: https://github.com/jacokok/engauge/releases
[license-shield]: https://img.shields.io/github/license/jacokok/engauge.svg?style=for-the-badge
[build]: https://github.com/jacokok/engauge/actions/workflows/build.yml
[build-shield]: https://img.shields.io/github/workflow/status/jacokok/engauge/Build?style=for-the-badge