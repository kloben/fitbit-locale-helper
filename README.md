# Fitbit locale helper

The goal of this library is to make easier the localization of Fitbit apps & clockfaces by generating .po files 
instead of bundling all languages [Fitbit Guide](https://dev.fitbit.com/build/guides/localization/) 

## Features

- Generate date strings (Month & Weekdays) using [date-fns](https://www.npmjs.com/package/date-fns)
- Merge extra .po files (For example, the ones from [Kiezel Pay](https://www.kiezelpay.com/))
- Merge from other custom files (For example, csv)

## Installation

Install the library with `npm i fitbit-locale-helper` or `yarn add fitbit-locale-helper`

## How to generate

Create a `fitbitLocaleHelper.json` in the root of your project.

#### If you need dates
Set `app`, `companion`, and/or `settings` in the configuration JSON file.
Set `weekDayCfg` and/or `monthConfig` for each of them. Only specified values will be generated. 

#### If you have any existing .po files
Create a `languages` folder in the root of your project (or any other folder set in the config)
Create required subfolders (`languages/app`, `languages/companion`, `languages/settings`) and add the .po files to them.

## Usage

Using the [i18n API](https://dev.fitbit.com/build/reference/device-api/i18n/) you can access the translations

```javascript

const textElement = document.getElementById("someElement") 
textElement.text = gettext('week_0')
```


## Configuration

```javascript
export default {
  localesFolder: "languages",
  languages: ["es-ES", "en-US", "de-DE"],
  app: {
    weekDayCfg: {
      format: "E",
      prefix: "week_",
      suffix: ""
    },
    monthCfg: {
      format: "MMM",
      prefix: "month_",
      suffix: ""
    }
  },
  settings: { /* Same structure as app */ },
  companion: { /* Same structure as app */ },
}
```

| Attribute | Description | Default |
| --- | --- | --- |
| localesFolder | Folder where are located your extra .po files | "languages"
| languages | List of languages to generate | All 17 supported languages |
| app, companion, settings | Which project folders needs to be generated | |


