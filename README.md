# eslint-plugin-fsd-rules-plugin
---

## 💿 Install

```
npm install --save-dev eslint-plugin-fsd-rules-plugin
```

## 📖 Rules

| Name                | Description                                                     |
| ------------------- | --------------------------------------------------------------- |
| [path-checker](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/docs/rules/path-checker.md)        | Checking file imports from a single module                      |
| [public-api-imports](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/docs/rules/public-api-imports.md)  | Absolute import is allowed only from the public api (index.ts)  |
| [layer-imports](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/docs/rules/layer-imports.md)  | A layer can only import the underlying layers  |

## [eslint.config.js](https://eslint.org/docs/latest/use/configure/configuration-files)

```
import fsdRules from "eslint-plugin-fsd-rules-plugin";

export default [
    {
        plugins: {
          "fsd-rules-plugin": fsdRules
        },
        rules: {
            "fsd-rules-plugin/path-checker": "error",
            "fsd-rules-plugin/public-api-imports": "error"
            "fsd-rules-plugin/layer-imports": "error"
        },
    }
]
```
## [.eslintrc](https://eslint.org/docs/latest/use/configure/configuration-files)

```
module.exports = {
    plugins: [
        "fsd-rules-plugin"
    ],
    rules: {
        "fsd-rules-plugin/path-checker": "error",
        'fsd-rules-plugin/public-api-imports': "error",
        'fsd-rules-plugin/layer-imports': "error",
    },
}

```

## ❤️ Contributing

Welcome contributing!

Please use GitHub's Issues/PRs.

### Development Tools

- `npm test` runs tests and measures coverage.
