"use strict";

const path = require('path');
const { isPathRelative } = require('../helpers');
const micromatch = require('micromatch')

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "custom plugin for fsd public api imports",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [{
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          },
          testFilesPatterns: {
            type: 'array'
          }
        }
      }], // Add a schema if the rule has options
    messages: {}, // Add messageId and message
  },

  create(context) {
   const {alias ='', testFilesPatterns = []} = context.options[0] ?? {};

   const checkingLayers = {
    'entities': 'entities',
    'features': 'features',
    'pages': 'pages',
    'widgets': 'widgets',
  }

    return {
      ImportDeclaration(node) {
        const value = node.source?.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value ;

        if(isPathRelative(importTo)) return;

        //[entities, artciles, model, types]
        const segments = importTo.split('/');
        const layer = segments[0];

        //excluding libraries and the shared layer
        if(!checkingLayers[layer]) return;

        const isImportNotFromPublicApi = segments.length > 2;
        //[entities, artciles, testing]
        const isTestingPublicApi = segments[2] === 'testing' && segments.length < 4;

        if(isImportNotFromPublicApi && !isTestingPublicApi) {
          context.report(node, "Absolute import is allowed only from the public api (index.ts)")
        }

        if(isTestingPublicApi) {
          const currentFilePath = context.filename;
          const normalizedPath = path.toNamespacedPath(currentFilePath);

          const isCurrentFileTesting = testFilesPatterns.some(pattern => micromatch.isMatch(normalizedPath, pattern));


          if(!isCurrentFileTesting) {
            context.report(node, "The test data must be imported from the publicApi/testing.ts")
          }

        }

      }
    };
  },
};
