# Engauge

[![GitHub Release][releases-shield]][releases]
[![License][license-shield]](LICENSE)
[![Build][build-shield]][build]

Enguage is a circular gauge with icon card. The goal is to be a hot replacement for the build in gauge but with extra options and an icon.

## Installation

### HACS

Update hacs instructions...

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

### Severity

| Name     | Type   | Requirement  | Description                            |
| -------- | ------ | ------------ | -------------------------------------- |
| `green`  | number | **Required** | Value from which to start green color  |
| `yellow` | number | **Required** | Value from which to start yellow color |
| `red`    | number | **Required** | Value from which to start red color    |

### Segments

| Name              | Type   | Requirement  | Description                         |
| ----------------- | ------ | ------------ | ----------------------------------- |
| `from`            | number | **Required** | Value from which to start the color |
| `dialColor`       | number | **Optional** | Color of dial                       |
| `valueColor`      | number | **Optional** | Color of value                      |
| `backgroundColor` | number | **Optional** | Background Color                    |
| `icon`            | number | **Optional** | mdi:icon                            |
| `iconColor`       | number | **Optional** | Icon color                          |

[releases-shield]: https://img.shields.io/github/v/release/jacokok/engauge.svg?style=for-the-badge
[releases]: https://github.com/jacokok/engauge/releases
[license-shield]: https://img.shields.io/github/license/jacokok/engauge.svg?style=for-the-badge
[build]: https://github.com/jacokok/engauge/actions/workflows/build.yml
[build-shield]: https://img.shields.io/github/workflow/status/jacokok/engauge/Build?style=for-the-badge