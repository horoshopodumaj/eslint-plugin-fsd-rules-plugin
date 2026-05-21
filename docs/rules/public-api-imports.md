# fsd-rules-plugin/public-api-imports

📝 The rule checks whether absolute imports are applied correctly in the component.

Absolute import is allowed only from the public api (index.ts).

## 📖 Rule Details

This rule applies when importing.

This rule has options.

### Options

```js
{
  "fsd-rules-plugin/public-api-imports": ["error",
    {
      alias: '@',
      testFilesPatterns: ['**/*.test.*', '**/*.stories.*', '**/StoreDecorators.tsx']
    }
  ]
}
```

- `alias` is indicated if you use alias in your project, you must specify which alias you are using, for example, '@'.
- `testFilesPatterns` contains an array of regular expressions with the test file extension, in which it is necessary to verify the correctness of the import from the test api.

### 🔎 Implementation

- [Rule source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/lib/rules/public-api-imports.js)
- [Test source](https://github.com/horoshopodumaj/eslint-plugin-fsd-rules-plugin/blob/master/tests/lib/rules/public-api-imports.js)
