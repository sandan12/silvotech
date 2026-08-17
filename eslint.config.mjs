import js from '@eslint/js'
import next from '@next/eslint-plugin-next'
import ts from 'typescript-eslint'

export default ts.config(
  js.configs.recommended,
  ...ts.configs.recommended,
  {
    plugins: { '@next/next': next },
    rules: {
      ...next.configs['core-web-vitals'].rules,
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': 'error',
      'no-console': ['warn', { allow: ['error', 'warn'] }],
    },
  },
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'] },
)
