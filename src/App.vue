<template>
  <v-app>
    <v-main>
      <NavBar />
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