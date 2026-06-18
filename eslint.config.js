const spfxProfile = require('@microsoft/eslint-config-spfx/lib/flat-profiles/react');

module.exports = [
  ...spfxProfile,
  {
    // Main solution code is type-checked against the SPFx build tsconfig.
    files: ['src/**/*.ts', 'src/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './tsconfig.json'
      }
    }
  },
  {
    // Presentation samples are linted against their own standalone tsconfig so
    // they get full type-aware linting without being part of the SPFx build.
    files: ['presentation/samples/**/*.ts', 'presentation/samples/**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: './presentation/samples/tsconfig.json'
      }
    }
  }
];
