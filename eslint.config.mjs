// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

const MAX_LEN_OPTIONS = {
  code: 100,
  ignoreStrings: true,
  ignoreTemplateLiterals: true,
  ignoreUrls: true,
  ignoreComments: true,
}

export default withNuxt(
  {
    rules: {
      '@stylistic/max-len': ['error', MAX_LEN_OPTIONS],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    // Tailwind class 字串常超過行寬，template 屬性值不計入；script 仍受 100 字限制
    files: ['**/*.vue'],
    rules: {
      '@stylistic/max-len': 'off',
      'vue/max-len': ['error', { ...MAX_LEN_OPTIONS, ignoreHTMLAttributeValues: true }],
    },
  },
)
