import { VueConstructor, PluginObject } from 'vue'

import VueCompositionApi from '@vue/composition-api'

import TestComponent from './components/TestComponent.vue';
import Avatar from './components/Avatar.vue';

declare global {
  interface Window {
    Vue: VueConstructor
  }
}

const version = '__VERSION__'

const install = (Vue: VueConstructor): void => {

  Vue.use(VueCompositionApi)
  /*
   * NOTE:
   *   if you need to extend Vue contstructor, you can extend it in here.
   */

  Vue.prototype.$add = (a: number, b: number): number => {
    return a + b
  }

  Vue.component('TestComponent', TestComponent)
  Vue.component('Avatar', Avatar)

  // Usage:
  // {{ $add(1, 1) }}

  /*
   * NOTE:
   *  somthing implementation here ...
   */
}

const plugin: PluginObject<VueConstructor> = {
  install,
  version
}
export default plugin

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}
