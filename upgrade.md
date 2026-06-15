# Upgrade project hooksdemo-client-side-solution to v1.23.0

Date: 6/15/2026

## Findings

Following is the list of steps required to upgrade your project to SharePoint Framework version 1.23.0. [Summary](#Summary) of the modifications is included at the end of the report.

### FN001001 @microsoft/sp-core-library | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-core-library

Execute the following command:

```sh
npm i -SE @microsoft/sp-core-library@1.23.0
```

File: [./package.json:20:5](./package.json)

### FN001002 @microsoft/sp-lodash-subset | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-lodash-subset

Execute the following command:

```sh
npm i -SE @microsoft/sp-lodash-subset@1.23.0
```

File: [./package.json:24:5](./package.json)

### FN001003 @microsoft/sp-office-ui-fabric-core | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-office-ui-fabric-core

Execute the following command:

```sh
npm i -SE @microsoft/sp-office-ui-fabric-core@1.23.0
```

File: [./package.json:25:5](./package.json)

### FN001004 @microsoft/sp-webpart-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-webpart-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-webpart-base@1.23.0
```

File: [./package.json:23:5](./package.json)

### FN001021 @microsoft/sp-property-pane | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-property-pane

Execute the following command:

```sh
npm i -SE @microsoft/sp-property-pane@1.23.0
```

File: [./package.json:22:5](./package.json)

### FN001023 @microsoft/sp-component-base | Required

Upgrade SharePoint Framework dependency package @microsoft/sp-component-base

Execute the following command:

```sh
npm i -SE @microsoft/sp-component-base@1.23.0
```

File: [./package.json:21:5](./package.json)

### FN002002 @microsoft/sp-module-interfaces | Required

Upgrade SharePoint Framework dev dependency package @microsoft/sp-module-interfaces

Execute the following command:

```sh
npm i -DE @microsoft/sp-module-interfaces@1.23.0
```

File: [./package.json:41:5](./package.json)

### FN002022 @microsoft/eslint-plugin-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-plugin-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-plugin-spfx@1.23.0
```

File: [./package.json:30:5](./package.json)

### FN002023 @microsoft/eslint-config-spfx | Required

Upgrade SharePoint Framework dev dependency package @microsoft/eslint-config-spfx

Execute the following command:

```sh
npm i -DE @microsoft/eslint-config-spfx@1.23.0
```

File: [./package.json:31:5](./package.json)

### FN002030 @microsoft/spfx-web-build-rig | Required

Install SharePoint Framework dev dependency package @microsoft/spfx-web-build-rig

Execute the following command:

```sh
npm i -DE @microsoft/spfx-web-build-rig@1.23.0
```

File: [./package.json:27:3](./package.json)

### FN002034 @microsoft/spfx-heft-plugins | Required

Install SharePoint Framework dev dependency package @microsoft/spfx-heft-plugins

Execute the following command:

```sh
npm i -DE @microsoft/spfx-heft-plugins@1.23.0
```

File: [./package.json:27:3](./package.json)

### FN010001 .yo-rc.json version | Recommended

Update version in .yo-rc.json

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.23.0"
  }
}
```

File: [./.yo-rc.json:12:5](./.yo-rc.json)

### FN002031 @rushstack/heft | Required

Install SharePoint Framework dev dependency package @rushstack/heft

Execute the following command:

```sh
npm i -DE @rushstack/heft@1.2.17
```

File: [./package.json:27:3](./package.json)

### FN027001 @rushstack/heft | Required

Install SharePoint Framework override dependency package @rushstack/heft

Execute the following command:

```sh
npm pkg set overrides.@rushstack/heft=1.2.17
```

File: [./package.json:1:1](./package.json)

### FN002025 eslint-plugin-react-hooks | Required

Upgrade SharePoint Framework dev dependency package eslint-plugin-react-hooks

Execute the following command:

```sh
npm i -DE eslint-plugin-react-hooks@5.2.0
```

File: [./package.json:40:5](./package.json)

### FN002024 eslint | Required

Upgrade SharePoint Framework dev dependency package eslint

Execute the following command:

```sh
npm i -DE eslint@9.37.0
```

File: [./package.json:35:5](./package.json)

### FN015016 eslint.config.js | Required

Add file eslint.config.js

Execute the following command:

```sh
@'
const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
'@ | Out-File -FilePath "eslint.config.js"
```

File: [eslint.config.js](eslint.config.js)

### FN015008 .eslintrc.js | Required

Remove file .eslintrc.js

Execute the following command:

```sh
Remove-Item ".eslintrc.js"
```

File: [.eslintrc.js](.eslintrc.js)

### FN002021 @rushstack/eslint-config | Required

Remove SharePoint Framework dev dependency package @rushstack/eslint-config

Execute the following command:

```sh
npm un -D @rushstack/eslint-config
```

File: [./package.json:29:5](./package.json)

### FN002036 @types/jest | Required

Install SharePoint Framework dev dependency package @types/jest

Execute the following command:

```sh
npm i -DE @types/jest@30.0.0
```

File: [./package.json:27:3](./package.json)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss](src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss)

### FN022001 Scss file import | Required

Remove scss file import

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss](src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss](src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss)

### FN022002 Scss file import | Optional

Add scss file import

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

File: [src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss](src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss)

### FN002001 @microsoft/sp-build-web | Required

Remove SharePoint Framework dev dependency package @microsoft/sp-build-web

Execute the following command:

```sh
npm un -D @microsoft/sp-build-web
```

File: [./package.json:32:5](./package.json)

### FN002004 gulp | Required

Remove SharePoint Framework dev dependency package gulp

Execute the following command:

```sh
npm un -D gulp
```

File: [./package.json:36:5](./package.json)

### FN002007 ajv | Required

Remove SharePoint Framework dev dependency package ajv

Execute the following command:

```sh
npm un -D ajv
```

File: [./package.json:34:5](./package.json)

### FN002026 typescript | Required

Upgrade SharePoint Framework dev dependency package typescript

Execute the following command:

```sh
npm i -DE typescript@~5.8.0
```

File: [./package.json:37:5](./package.json)

### FN002029 @microsoft/rush-stack-compiler-5.3 | Required

Remove SharePoint Framework dev dependency package @microsoft/rush-stack-compiler-5.3

Execute the following command:

```sh
npm un -D @microsoft/rush-stack-compiler-5.3
```

File: [./package.json:27:22](./package.json)

### FN002032 @typescript-eslint/parser | Required

Install SharePoint Framework dev dependency package @typescript-eslint/parser

Execute the following command:

```sh
npm i -DE @typescript-eslint/parser@8.46.2
```

File: [./package.json:27:3](./package.json)

### FN002033 css-loader | Required

Install SharePoint Framework dev dependency package css-loader

Execute the following command:

```sh
npm i -DE css-loader@7.1.2
```

File: [./package.json:27:3](./package.json)

### FN002035 @types/heft-jest | Required

Install SharePoint Framework dev dependency package @types/heft-jest

Execute the following command:

```sh
npm i -DE @types/heft-jest@1.0.2
```

File: [./package.json:27:3](./package.json)

### FN010011 .yo-rc.json useGulp | Recommended

Update useGulp property in .yo-rc.json

```json
{
    "useGulp": false
}
```

File: [./.yo-rc.json:2:38](./.yo-rc.json)

### FN015005 src\index.ts | Required

Remove file src\index.ts

Execute the following command:

```sh
Remove-Item "src\index.ts"
```

File: [src\index.ts](src\index.ts)

### FN015010 gulpfile.js | Required

Remove file gulpfile.js

Execute the following command:

```sh
Remove-Item "gulpfile.js"
```

File: [gulpfile.js](gulpfile.js)

### FN015011 tsconfig.json | Required

Add file tsconfig.json

Execute the following command:

```sh
@'
{
  "extends": "./node_modules/@microsoft/spfx-web-build-rig/profiles/default/tsconfig-base.json"
}

'@ | Out-File -FilePath "tsconfig.json"
```

File: [tsconfig.json](tsconfig.json)

### FN015014 config\rig.json | Required

Add file config\rig.json

Execute the following command:

```sh
@'
{
  // The "rig.json" file directs tools to look for their config files in an external package.
  // Documentation for this system: https://www.npmjs.com/package/@rushstack/rig-package
  "$schema": "https://developer.microsoft.com/json-schemas/rig-package/rig.schema.json",

  "rigPackageName": "@microsoft/spfx-web-build-rig"
}

'@ | Out-File -FilePath "config\rig.json"
```

File: [config\rig.json](config\rig.json)

### FN015015 config\typescript.json | Required

Add file config\typescript.json

Execute the following command:

```sh
@'
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/typescript.json",

  "staticAssetsToCopy": {
    "fileExtensions": [".resx", ".jpg", ".png", ".woff", ".eot", ".ttf", ".svg", ".gif"],

    "includeGlobs": ["webparts/*/loc/*.js"]
  }
}

'@ | Out-File -FilePath "config\typescript.json"
```

File: [config\typescript.json](config\typescript.json)

### FN020001 @types/react | Required

Add resolution for package @types/react

```json
{
  "resolutions": {
    "@types/react": "17.0.45"
  }
}
```

File: [./package.json:1:1](./package.json)

### FN021001 main | Required

Remove package.json property

```json
{
  "main": "undefined"
}
```

File: [./package.json:8:3](./package.json)

### FN021004 package.json scripts.build | Required

Update package.json scripts.build property

```json
{
  "scripts": {
    "build": "heft test --clean --production && heft package-solution --production"
  }
}
```

File: [./package.json:10:5](./package.json)

### FN021005 package.json scripts.test | Required

Remove package.json scripts.test property

```json
{
  "scripts": {
    "test": ""
  }
}
```

File: [./package.json:12:5](./package.json)

### FN021006 package.json scripts.clean | Required

Update package.json scripts.clean property

```json
{
  "scripts": {
    "clean": "heft clean"
  }
}
```

File: [./package.json:11:5](./package.json)

### FN021007 package.json scripts.start | Required

Update package.json scripts.start property

```json
{
  "scripts": {
    "start": "heft start --clean"
  }
}
```

File: [./package.json:9:14](./package.json)

### FN021008 package.json scripts.eject-webpack | Required

Update package.json scripts.eject-webpack property

```json
{
  "scripts": {
    "eject-webpack": "heft eject-webpack"
  }
}
```

File: [./package.json:9:14](./package.json)

### FN023003 .gitignore 'lib-dts' folder | Required

To .gitignore add the 'lib-dts' folder


File: [./.gitignore](./.gitignore)

### FN023004 .gitignore 'lib-commonjs' folder | Required

To .gitignore add the 'lib-commonjs' folder


File: [./.gitignore](./.gitignore)

### FN023005 .gitignore 'lib-esm' folder | Required

To .gitignore add the 'lib-esm' folder


File: [./.gitignore](./.gitignore)

### FN023006 .gitignore 'jest-output' folder | Required

To .gitignore add the 'jest-output' folder


File: [./.gitignore](./.gitignore)

### FN025002 .eslintrc.js override rule @rushstack/import-requires-chunk-name | Required

Add override rule @rushstack/import-requires-chunk-name in .eslintrc.js

```js
// Require chunk names for dynamic imports in SPFx projects. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/import-requires-chunk-name': 1,

```

File: [.eslintrc.js:14:7](.eslintrc.js)

### FN025003 .eslintrc.js override rule @rushstack/pair-react-dom-render-unmount | Required

Add override rule @rushstack/pair-react-dom-render-unmount in .eslintrc.js

```js
// Ensure that React components rendered with ReactDOM.render() are unmounted with ReactDOM.unmountComponentAtNode(). https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/pair-react-dom-render-unmount': 1,

```

File: [.eslintrc.js:14:7](.eslintrc.js)

### FN025004 .eslintrc.js override rule @microsoft/spfx/import-requires-chunk-name | Required

Remove override rule @microsoft/spfx/import-requires-chunk-name in .eslintrc.js

```js

```

File: [.eslintrc.js:291:9](.eslintrc.js)

### FN025005 .eslintrc.js override rule @microsoft/spfx/pair-react-dom-render-unmount | Required

Remove override rule @microsoft/spfx/pair-react-dom-render-unmount in .eslintrc.js

```js

```

File: [.eslintrc.js:293:9](.eslintrc.js)

### FN026001 sass.json schema | Required

Update sass.json schema URL

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/heft/v0/heft-sass-plugin.schema.json"
}
```

File: [./config/sass.json:2:3](./config/sass.json)

### FN026002 sass.json extends | Required

Update sass.json extends property

```json
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/sass.json"
}
```

File: [./config/sass.json:1:1](./config/sass.json)

### FN017001 Run npm dedupe | Optional

If, after upgrading npm packages, when building the project you have errors similar to: "error TS2345: Argument of type 'SPHttpClientConfiguration' is not assignable to parameter of type 'SPHttpClientConfiguration'", try running 'npm dedupe' to cleanup npm packages.

Execute the following command:

```sh
npm dedupe
```

File: [./package.json](./package.json)

## Summary

### Execute script

```sh
npm un -D @rushstack/eslint-config @microsoft/sp-build-web gulp ajv @microsoft/rush-stack-compiler-5.3
npm i -SE @microsoft/sp-core-library@1.23.0 @microsoft/sp-lodash-subset@1.23.0 @microsoft/sp-office-ui-fabric-core@1.23.0 @microsoft/sp-webpart-base@1.23.0 @microsoft/sp-property-pane@1.23.0 @microsoft/sp-component-base@1.23.0
npm i -DE @microsoft/sp-module-interfaces@1.23.0 @microsoft/eslint-plugin-spfx@1.23.0 @microsoft/eslint-config-spfx@1.23.0 @microsoft/spfx-web-build-rig@1.23.0 @microsoft/spfx-heft-plugins@1.23.0 @rushstack/heft@1.2.17 eslint-plugin-react-hooks@5.2.0 eslint@9.37.0 @types/jest@30.0.0 typescript@~5.8.0 @typescript-eslint/parser@8.46.2 css-loader@7.1.2 @types/heft-jest@1.0.2
npm pkg set overrides.@rushstack/heft=1.2.17
npm i
npm dedupe
@'
const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  }
];
'@ | Out-File -FilePath "eslint.config.js"
Remove-Item ".eslintrc.js"
Remove-Item "src\index.ts"
Remove-Item "gulpfile.js"
@'
{
  "extends": "./node_modules/@microsoft/spfx-web-build-rig/profiles/default/tsconfig-base.json"
}

'@ | Out-File -FilePath "tsconfig.json"
@'
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/typescript.json",

  "staticAssetsToCopy": {
    "fileExtensions": [".resx", ".jpg", ".png", ".woff", ".eot", ".ttf", ".svg", ".gif"],

    "includeGlobs": ["webparts/*/loc/*.js"]
  }
}

'@ | Out-File -FilePath "config\typescript.json"
```

### Modify files

#### [./.yo-rc.json](./.yo-rc.json)

Update version in .yo-rc.json:

```json
{
  "@microsoft/generator-sharepoint": {
    "version": "1.23.0"
  }
}
```

Update useGulp property in .yo-rc.json:

```json
{
    "useGulp": false
}
```

#### [src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss](src\webparts\helloWorldClassic\components\HelloWorldClassic.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss](src\webparts\helloWorldHooks\components\HelloWorldHooks.module.scss)

Remove scss file import:

```scss
@import '~@fluentui/react/dist/sass/References.scss'
```

Add scss file import:

```scss
@import 'pkg:@fluentui/react/dist/sass/References.scss'
```

#### [./package.json](./package.json)

Add resolution for package @types/react:

```json
{
  "resolutions": {
    "@types/react": "17.0.45"
  }
}
```

Remove package.json property:

```json
{
  "main": "undefined"
}
```

Update package.json scripts.build property:

```json
{
  "scripts": {
    "build": "heft test --clean --production && heft package-solution --production"
  }
}
```

Remove package.json scripts.test property:

```json
{
  "scripts": {
    "test": ""
  }
}
```

Update package.json scripts.clean property:

```json
{
  "scripts": {
    "clean": "heft clean"
  }
}
```

Update package.json scripts.start property:

```json
{
  "scripts": {
    "start": "heft start --clean"
  }
}
```

Update package.json scripts.eject-webpack property:

```json
{
  "scripts": {
    "eject-webpack": "heft eject-webpack"
  }
}
```

#### [./.gitignore](./.gitignore)

To .gitignore add the 'lib-dts' folder:

```text
lib-dts
```

To .gitignore add the 'lib-commonjs' folder:

```text
lib-commonjs
```

To .gitignore add the 'lib-esm' folder:

```text
lib-esm
```

To .gitignore add the 'jest-output' folder:

```text
jest-output
```

#### [.eslintrc.js](.eslintrc.js)

Add override rule @rushstack/import-requires-chunk-name in .eslintrc.js:

```js
// Require chunk names for dynamic imports in SPFx projects. https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/import-requires-chunk-name': 1,

```

Add override rule @rushstack/pair-react-dom-render-unmount in .eslintrc.js:

```js
// Ensure that React components rendered with ReactDOM.render() are unmounted with ReactDOM.unmountComponentAtNode(). https://www.npmjs.com/package/@rushstack/eslint-plugin
        '@rushstack/pair-react-dom-render-unmount': 1,

```

Remove override rule @microsoft/spfx/import-requires-chunk-name in .eslintrc.js:

```js

```

Remove override rule @microsoft/spfx/pair-react-dom-render-unmount in .eslintrc.js:

```js

```

#### [./config/sass.json](./config/sass.json)

Update sass.json schema URL:

```json
{
  "$schema": "https://developer.microsoft.com/json-schemas/heft/v0/heft-sass-plugin.schema.json"
}
```

Update sass.json extends property:

```json
{
  "extends": "@microsoft/spfx-web-build-rig/profiles/default/config/sass.json"
}
```
