<template>
  <v-app>
    <main>
      <NavBar v-if="notWelcome"></NavBar>
      <router-view />
    </main>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar";
export default {
  computed: {
    notWelcome() {
      if (this.$route.path == "/welcome") {
        return false;
      } else {
        return true;
      }
    }
  },
  components: {
    NavBar
  }
};
</script>

<style>
  html {
    overscroll-behavior: none;
  }
</style>