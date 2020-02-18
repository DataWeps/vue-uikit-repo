<template>
  <div id="app" class="uk-container">
    <nav class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <ul class="uk-navbar-nav">
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/demos">Demos</router-link></li>
        </ul>
      </div>
    </nav>
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