# fsd-rules-plugin/layer-imports

📝 The rule checks whether only the underlying layers (shared, entities, features, widgets, pages, app) are imported into the layer.

A layer can only import the underlying layers (shared, entities, features, widgets, pages, app).

## 📖 Rule Details

This rule applies when importing.

This rule has options.

### Options

```js
{
  "fsd-rules-plugin/layer-imports": ["error",
    {
      alias: '@',
      ignoreImportPatterns: ['**/StoreProvider', '**/testing']
    }
  ]
}
```

- `alias` is indicated if you use alias in your project, you must specify which alias you are using, for example, '@'.
- `ignoreImportPatterns` contains an array of regular expressions with extensions or file names that should be ignored.

### 🔎 Implementation

- [Rule source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/lib/rules/layer-imports.js)
- [Test source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/tests/lib/rules/layer-imports.js)
