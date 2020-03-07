module.exports = {
  plugins: [
    require('./plugin.js')
  ],
  locales: {
    '/': {
      lang: 'en-US',
      title: 'VueUikitRepo',
      description: 'VueUikitRepo for Vue.js'
    }
  },
  themeConfig: {
    repo: 'Martin Kravec/vue-uikit-repo',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [{
          text: 'Release Notes',
          link: 'https://github.com/Martin Kravec/vue-uikit-repo/releases'
        }],
        sidebar: [
          '/installation.md',
          '/started.md',
        ]
      }
    }
  }
}
