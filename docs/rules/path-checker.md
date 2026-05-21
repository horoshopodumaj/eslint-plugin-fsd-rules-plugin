# fsd-rules-plugin/path-checker

📝 Checking file imports from a single module.

Within a single component, all entities that are created and used in this component should be imported from this folder, not from the public api.

## 📖 Rule Details

This rule applies when importing.

This rule has options.

### Options

```js
{
  "fsd-rules-plugin/path-checker": ["error",
    {
      alias: '@'
    }
  ]
}
```

- `alias` is indicated if you use alias in your project, you must specify which alias you are using, for example, '@'.

### 🔎 Implementation

- [Rule source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/lib/rules/path-checker.js)
- [Test source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/tests/lib/rules/path-checker.js)
