<template>
  <div id="app">
    <router-view />
    <!-- <footer>I am footer</footer> -->
  </div>
</template>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // background-color: #2c3e50;
}

footer {
  font-weight: bold;
  box-shadow: 0px -2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 30px;
  line-height: 20px;
  font-size: 12px;
}
</style>
