<template>
  <div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="css">
  * {
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100vh;
    width: 100vw;
  }

  body {
    min-width: 100%;
    min-height: 100%;
  }
  #app {
    height: inherit;
    width: inherit
  }
</style>
