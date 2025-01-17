module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig.eslint.json',
    tsconfigRootDir: __dirname,
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  settings: {
    react: {
      version: 'detect', // React 버전을 자동 감지
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // React import가 불필요하도록 설정
    'no-undef': 'off', // 'module' 관련 에러 방지
    'react/jsx-no-useless-fragment': 'off', // React Fragment (<></>)가 단일 자식을 감쌀 때도 허용
    'import/no-extraneous-dependencies': 'off',
    'react/no-array-index-key': 'off', // index key 이용
    'react/function-component-definition': [
      'off',
      {
        namedComponents: 'arrow-function',
      },
    ], // 화살표 함수 이용
    'react/require-default-props': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        some: ['nesting', 'id'],
      },
    ],
    'no-param-reassign': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      // 인터페이스 이름은 PascalCase를 사용하되, 'I'로 시작하지 않아야 함
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false,
        },
      },

      // 타입 별칭은 PascalCase를 사용해야 함
      {
        selector: 'typeAlias',
        format: ['PascalCase'],
      },
    ],
  },
};
