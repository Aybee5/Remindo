<template>
  <v-app>
    <v-main>
      <NavBar v-if="notWelcome"> </NavBar>
      <router-view />
    </v-main>
    
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
export default {
  data(){
    return{
    }
  },
  computed:{
    notWelcome() {
      if (this.$route.path == "/welcome") {
        return false
      }
      else {
        return true
      }
    }
  },
  components:{
    NavBar,
  },
  watch: {
  },
  created() {
    
  }
}
</script>