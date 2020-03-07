# @dataweps/vue-uikit-repo
Components and functions based on Vue 3 and UIKit 3

## Project setup
```
npm install
```

## Development
### Compiles and hot-reloads for development
```
./watch
// or
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

## Demo
Demo can be run with standard ``./watch`` or separately:
```
npm run demo Demo.vue
```
The demonstration SFC specified with demo command of CLI Service must specify the demo directory as the base.

## Documentation
Serve documentation
```
npm run docs
```
Build documentation
```
npm run docs:build
```

## Deploy to NPM repository
```
// change version in package.json and then
npm run build
git add .
git commit -m 'Production build'
git push origin master
npm publish
```

## Install / Production Usage
```
import VueUIKitRepo from 'vue-uikit-repo
Vue.use(VueUIKitRepo)
```

## Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

See [Plugin configuration (vue-cli-plugin-p11n)](https://medium.com/@kazu_pon/vue-cli-plugin-p11n-a51195ff7d3e).

