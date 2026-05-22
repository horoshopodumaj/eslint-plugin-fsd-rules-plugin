const rule = require("../../../lib/rules/layer-imports.js"),
    RuleTester = require("eslint").RuleTester;

const aliasOptions = [
  {
    alias: '@'
  }
]
const ruleTester = new RuleTester();
ruleTester.run("layer-imports", rule, {
  valid: [
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/shared/Button.tsx'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\features\\Article',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/entities/Article'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\widgets\\pages',
      code: "import { useLocation } from 'react-router-dom'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\app\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from 'redux'",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\index.tsx',
      code: "import { StoreProvider } from '@/app/providers/StoreProvider';",
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\entities\\Article.tsx',
      code: "import { StateSchema } from '@/app/providers/StoreProvider'",
      options: [
        {
          alias: '@',
          ignoreImportPatterns: ['**/StoreProvider']
        }
      ],
    },
  ],

  invalid: [
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/features/Article'",
      errors: [{ message: "A layer can only import the underlying layers (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\features\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "A layer can only import the underlying layers (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
    {
      filename: 'C:\\Users\\horoshopodumaj\\Desktop\\javascript\\production_project\\src\\entities\\providers',
      code: "import { addCommentFormActions, addCommentFormReducer } from '@/widgets/Article'",
      errors: [{ message: "A layer can only import the underlying layers (shared, entities, features, widgets, pages, app)"}],
      options: aliasOptions,
    },
  ],
});
