const errorRules = {
  'no-unused-vars': ['error', {
    ignoreRestSiblings: true
  }],
  indent: ['error', 2, {
    ignoredNodes: ['TemplateLiteral'] // https://github.com/babel/babel-eslint/issues/681
  }],

  'linebreak-style': ['error', 'unix'],
  quotes: ['error', 'single', {
    avoidEscape: true
  }],
  semi: ['error', 'never'],
  'no-use-before-define': ['error', {
    functions: true,
    classes: true,
    variables: true
  }],
  // AirBnb variables.js
  'implicit-arrow-linebreak': ['error', 'beside'],
  // AirBnb styles.js
  'no-multi-spaces': ['error', {
    ignoreEOLComments: false
  }],
  // AirBnb best_practices.js
  'no-multiple-empty-lines': ['error', {
    max: 1,
    maxBOF: 0,
    maxEOF: 0
  }],
  // AirBnb styles.js
  'eol-last': ['error', 'always'],
  // AirBnb styles.js

  'import/no-duplicates': 'error',
  // AirBnb import.js
  'import/order': ['error', {
    groups: [['builtin', 'external', 'internal']],
    'newlines-between': 'always',
    pathGroups: [{
      pattern: '*.module.scss',
      patternOptions: {
        matchBase: true
      },
      group: 'unknown',
      position: 'after'
    }, {
      pattern: '@/**',
      group: 'parent',
      position: 'before'
    }]
  }],
  // AirBnb import.js
  'import/no-cycle': ['error', {
    maxDepth: '∞'
  }] // AirBnb import.js
};

const warningRules = {
  'react/prop-types': 'warn',
  'react-hooks/exhaustive-deps': 'warn',
  'max-len': ['warn', {
    code: 100,
    ignoreUrls: true,
    ignoreStrings: true,
    ignoreTemplateLiterals: true,
    ignoreRegExpLiterals: true,
    ignoreComments: false,
    ignoreTrailingComments: true
  }],
  'react/function-component-definition': ['warn', {
    namedComponents: 'arrow-function',
    unnamedComponents: 'arrow-function'
  }],
  // spacing rules (error by default in AirBnb styleguide)
  'array-bracket-spacing': ['warn', 'never'],
  // AirBnb styles.js
  'block-spacing': ['warn', 'always'],
  // AirBnb styles.js
  'comma-spacing': ['warn', {
    before: false,
    after: true
  }],
  // AirBnb styles.js
  'func-call-spacing': ['warn', 'never'],
  // AirBnb styles.js
  'key-spacing': ['warn', {
    beforeColon: false,
    afterColon: true
  }],
  // AirBnb styles.js
  'no-trailing-spaces': ['warn', {
    skipBlankLines: false,
    ignoreComments: false
  }],
  // AirBnb styles.js
  'object-curly-spacing': ['warn', 'always'],
  // AirBnb styles.js
  'space-in-parens': ['warn', 'never'],
  // AirBnb styles.js
  'arrow-spacing': ['warn', {
    before: true,
    after: true
  }],
  // AirBnb es6.js
  'template-curly-spacing': 'warn' // AirBnb es6.js
};

const unwantedRules = {
  'react/react-in-jsx-scope': 'off',
  // The following rule is off since Next.js doesn't require explicit React imports
  'react/display-name': 'off',
  // TODO: gradually remove these 'testing-library' rule overrides and fix resulting errors
  'testing-library/no-container': 'off',
  'testing-library/no-node-access': 'off',
  'testing-library/no-render-in-setup': 'off',
  'testing-library/no-wait-for-multiple-assertions': 'off',
  'testing-library/prefer-presence-queries': 'off',
  'testing-library/prefer-screen-queries': 'off',
  'testing-library/render-result-naming-convention': 'off'
};
const airBnbRules = {
  // STYLE.js
  // 'no-nested-ternary': 'error', // OK but questionable
  // 'brace-style': ['error', '1tbs', { allowSingleLine: true }],
  // 'comma-dangle': ['error', {
  //   arrays: 'always-multiline',
  //   objects: 'always-multiline',
  //   imports: 'always-multiline',
  //   exports: 'always-multiline',
  //   functions: 'always-multiline',
  // }],
  // 'no-mixed-operators': ['error', { allowSamePrecedence: false }], // OK but questionable
  // 'operator-linebreak': ['error', 'before', { overrides: { '=': 'none' } }],
  // 'quote-props': ['error', 'as-needed', { keywords: false, unnecessary: true, numbers: false }],

  // ES6.js
  // 'arrow-parens': ['warn', 'as-needed'], // OK
  // 'prefer-destructuring': ['error', {
  //   VariableDeclarator: {
  //     array: false,
  //     object: true,
  //   },
  //   AssignmentExpression: {
  //     array: true,
  //     object: false,
  //   },
  // }, {
  //   enforceForRenamedProperties: false,
  // }],

  // BEST PRACTICES.js
  // curly: ['error', 'multi-line'],
  // 'dot-notation': ['error', { allowKeywords: true }],
  // 'no-return-assign': ['error', 'always'],
  // 'no-return-await': 'error', // OK
  // 'no-sequences': 'error',

  // react
  // 'react/destructuring-assignment': 'error', // OK
  // 'react/no-array-index-key': 'error', // OK
  // 'react/no-unstable-nested-components': 'error', // OK
  // 'react/jsx-props-no-spreading': 'error', // like it
  // 'react/jsx-no-constructed-context-values': 'error', // OK
  // 'react/no-unused-prop-types': 'error', // ok
  // 'react/self-closing-comp': 'error'
  // 'react-hooks/rules-of-hooks': 'error',
};
module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  extends: ['eslint:recommended', 'plugin:react/recommended', 'plugin:storybook/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'react-hooks', 'import'],
  rules: {
    ...errorRules,
    ...warningRules,
    ...unwantedRules,
    ...airBnbRules
  }
};