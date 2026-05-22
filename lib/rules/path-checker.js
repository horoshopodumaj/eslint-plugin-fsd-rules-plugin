"use strict";

/** @type {import('eslint').Rule.RuleModule} */

const path = require('path');
const { isPathRelative } = require('../helpers')

module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: "custom plugin for fsd path checker",
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        properties: {
          alias: {
            type: 'string'
          }
        }
      }], // Add a schema if the rule has options
    messages: {}, // Add messageId and message
  },

  create(context) {
    const alias = context.options[0]?.alias || '';

    return {
      ImportDeclaration(node) {
        const value = node.source?.value
        const importTo = alias ? value.replace(`${alias}/`, '') : value ;

        const fromFilename = context.filename;

        if(shouldBeRelative(fromFilename, importTo)) {
          context.report(node, "Within a single slice, all paths must be relative")
        }

      }
    };
  },
};


const layers = {
  'entities': 'entities',
  'features': 'features',
  'shared': 'shared',
  'pages': 'pages',
  'widgets': 'widgets',
}

function shouldBeRelative(from, to) {
  if(isPathRelative(to)) return false;
  //entities/Article
  const toArray = to.split('/');
  const toLayer = toArray[0] //entities
  const toSlice = toArray[1] //Article

  if(!toLayer || !toSlice || !layers[toLayer]) return false;


  const normalizePath = path.toNamespacedPath(from);
  const projectFrom = normalizePath?.split('src')[1];
  const fromArray = projectFrom?.split('\\');

  const fromLayer = fromArray[1] //entities
  const fromSlice = fromArray[2] //Article

  if(!fromLayer || !fromSlice || !layers[fromLayer]) return false;


  return  fromSlice === toSlice && fromLayer === toLayer;

}
