<template>
  <v-app>
    <NavBar />
    <router-view />
  </v-app>
</template>

<script>
import NavBar from './components/NavBar'
import { mapActions, mapGetters } from "vuex";
export default {
  data(){
    return{
      sideNav: false
    }
  },
  computed:{
    ...mapActions(["checkUpcomingTime"]),
    ...mapGetters(["getUpcomingTodoTime"])
  },
  components:{
    NavBar,
  },
  watch: {
    // getUpcomingTodoTime() {
    // this.$store.dispatch("checkUpcomingTime")
      
    // }
  },
  mounted() {
    // this.$store.dispatch("checkUpcomingTime")
  },
  updated() {
    
  }
}
</script>>