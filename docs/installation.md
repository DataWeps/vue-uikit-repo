# Installation

## Direct Download / CDN

https://unpkg.com/vue-uikit-repo/dist/vue-uikit-repo 

[unpkg.com](https://unpkg.com) provides NPM-based CDN links. The above link will always point to the latest release on NPM. You can also use a specific version/tag via URLs like https://unpkg.com/vue-uikit-repo@{{ $version }}/dist/vue-uikit-repo.js
 
Include vue-uikit-repo after Vue and it will install itself automatically:

```html
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue-uikit-repo/dist/vue-uikit-repo.js"></script>
```

## NPM

```sh
$ npm install vue-uikit-repo
```

## Yarn

```sh
$ yarn add vue-uikit-repo
```

When used with a module system, you must explicitly install the `vue-uikit-repo` via `Vue.use()`:

```javascript
import Vue from 'vue'
import vue-uikit-repo from 'vue-uikit-repo'

Vue.use(vue-uikit-repo)
```

You don't need to do this when using global script tags.

