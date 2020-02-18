<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/test-component-demo">Test component Demo</router-link>
    </div>
    <router-view />
  </div>
</template>

<style src="../node_modules/uikit/dist/css/uikit.min.css" lang="css"></style>
<style src="@/assets/styles/app.sass" lang="sass"></style>

<script>
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
UIkit.use(Icons);

export default {
  name: 'App',
};
</script>