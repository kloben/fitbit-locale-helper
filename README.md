# Fitbit locale helper

The goal of this library is to make easier the localization of Fitbit apps & clockfaces by generating .po files 
instead of bundling all translations in .js files [Fitbit Guide](https://dev.fitbit.com/build/guides/localization/) 

## Features

- Generate date strings (Month & Weekdays) using [date-fns](https://www.npmjs.com/package/date-fns)
- Merge extra .po files (For example, the ones from [Kiezel Pay](https://www.kiezelpay.com/))

## Installation

Install the library with `npm i fitbit-locale-helper` or `yarn add fitbit-locale-helper`

## How to generate

Create a `fitbitLocaleHelper.json` in the root of your project.

| **Attribute** | **Description** | **Default** |  
| --- | --- | --- |
| **srcRootFolder** | If you have a custom build, set where your app, companion and/or settings are (in relation from where the script is executed) | '' |
| **languages** | List of languages you want to generate | If this value is not set, will generate all 17 currently supported languages  |

###### Example
```json
{
  "srcRootFolder": "",
  "languages": ["es-ES", "en-US", "fr-FR"]
}
```

#### If you need dates
Set `dateTimes` array in the configuration file. Add as many settings as you need for your app.

| **Attribute** | **Description** | **Values** | **Required** |  
| --- | --- | --- | --- |
| **folder** | Section where you need the translations | app, settings, companion | true |
| **type** | Date type | weekDay, month | true |
| **format** | date-fns format to generate | See [Date-fns docs](https://date-fns.org/v2.16.1/docs/format) | true |
| **prefix, suffix** | How you want the keys to be generated | Anything you like | false |

> **prefix** & **suffix** are optional. If NONE of them are set, will default to {prefix='week', suffix=''} or {prefix='month', suffix=''}
> If any of the values are set, those will be used instead.
> The keys will be generated like: 'prefix' + number + 'suffix' so you can retrieve the key like: 'prefix' + date.getMonth() + 'suffix'

###### Example
```json
{
  "srcRootFolder": "",
  "languages": ["es-ES", "en-US", "fr-FR"],
  "dateTimes": [
    {
      "folder": "app",
      "type": "weekDay",
      "format": "EEE",
      "prefix": "week"
    },
    {
      "folder": "app",
      "type": "month",
      "format": "MMMM",
      "prefix": "month"
    }
  ]
}
```

###### Output example
```
week0 => "Sun" 
week1 => "Mon"
week2 => "Tue"  
week3 => "Wed"
week4 => "Thu"
week5 => "Fri" 
week6 => "Sat" 
month0 => "January"
month1 => "February"
month2 => "March"
month3 => "April"
month4 => "May"
month5 => "June"
month6 => "July"
month7 => "August"
month8 => "September"
month9 => "October"
month10 => "November"
month11 => "December"
```

#### If you have any existing .po files

Set `localesFolder` in the configuration file. Create the folder and add the extra .po files in the required subfolders.

Create required subfolders (`locales/app`, `locales/companion`, `locales/settings`) and add the .po files to them with the language set in the name.

###### Example
```json
{
  "srcRootFolder": "",
  "languages": ["es-ES", "en-US", "fr-FR"],
  "dateTimes": [],
  "localesFolder": "locales"
}
```

```
root
└── fitbitLocaleHelper.json
└── locales
|   └── app
|       └── en-US.po
|       └── es-ES.po
|   └── settings
|       └── en-US.po
|       └── es-ES.po
└── app
    └── index.js
```

## Usage
After generating the translations, you will have the new .po files inside a `i18n` subfolder inside your `app`, `settings` or `companion` folders.
To use them you will have to use the [i18n API](https://dev.fitbit.com/build/reference/device-api/i18n/) provided by Fitbit

##### App or Companion usage example
```typescript
import {gettext} from "i18n";

const weekElement = document.getElementById("weekElement");
const monthElement = document.getElementById("monthElement");

const now = new Date(); // Better use clock API

weekElement.text = gettext(`week${now.getDay()}`);
monthElement.text = gettext(`month${now.getMonth()}`);
```

##### Settings usage example
```jsx
import { gettext } from "i18n";

function Settings() {
  return (
    <Page>
      <Section
        title={<Text bold align="center">{'Show like: ' + gettext('week3')}</Text>}>
        <Toggle
          settingsKey="toggleExample"
          label={gettext('toggleLabel')}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(Settings);
```
