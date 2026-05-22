"use strict";

const path = require('path');
const { isPathRelative } = require('../helpers');
const micromatch = require('micromatch')

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: ".../.../",
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
          ignoreImportPatterns: {
            type: 'array'
          }
        }
      }], // Add a schema if the rule has options
    messages: {}, // Add messageId and message
  },

  create(context) {
    const layers = {
      'app': ['pages', 'widgets', 'features', 'shared', 'entities'],
      'pages': ['widgets', 'features', 'shared', 'entities'],
      'widgets': ['features', 'shared', 'entities'],
      'features': ['shared', 'entities'],
      'entities': ['shared', 'entities'],
      'shared': ['shared'],
    }

    const availableLayers = {
      'app': 'app',
      'entities': 'entities',
      'features': 'features',
      'shared': 'shared',
      'pages': 'pages',
      'widgets': 'widgets',
    }

    const { alias='', ignoreImportPatterns=[]} = context.options[0] ?? {};

    const getCurrentFileLayer = () => {
      const currentFilePath = context.filename;

      const normalizePath = path.toNamespacedPath(currentFilePath);
      const projectPath = normalizePath?.split('src')[1];
      const segments = projectPath?.split('\\');


      return segments?.[1];
    }

    const getImportLayer = (value) => {
      const importPath = alias ? value.replace(`${alias}/`, '') : value;

      const segments = importPath.split('/');

      return segments?.[0]
    }


    return {
      ImportDeclaration(node) {
        const importPath = node.source?.value;
        const currentFileLayer = getCurrentFileLayer(importPath);

        const importLayer = getImportLayer(importPath);

        if(isPathRelative(importPath)) return;

        //excluding libraries
        if(!availableLayers[importLayer] || !availableLayers[currentFileLayer]) return;
        

        const isIgnored = ignoreImportPatterns.some((pattern)=> {
          return micromatch.isMatch(importPath, pattern)
        })

        if(isIgnored) return;

        if(!layers[currentFileLayer]?.includes(importLayer)) {
          context.report(node, "A layer can only import the underlying layers (shared, entities, features, widgets, pages, app)")
        }


      }
    };
  },
};
