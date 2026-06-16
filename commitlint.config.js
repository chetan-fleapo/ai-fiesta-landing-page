/** @type {import('@commitlint/types').UserConfig} */
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // Allowed commit types
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'spike',
        'chore',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'revert',
        'ci',
        'build'
      ]
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-empty': [2, 'never'],
    'subject-case': [0] // disable default subject-case rule
  }
};
