<template>
  <div id="app">
    <screen></screen>
  </div>
</template>

<script>
import Screen from './components/screen.vue'

export default {
  name: 'app',
  components: {
    Screen
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
