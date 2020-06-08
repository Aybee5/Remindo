<template>
  
    <v-list three-line>
      <v-subheader>{{this.$route.params.id}} tasks</v-subheader>
      <v-divider inset></v-divider>
      <template v-for="item in getTodos">
        <v-list-item :key="item.refKey">
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
            <v-list-item-subtitle>{{item.description}}</v-list-item-subtitle>
            <small>Due {{moment().to(item.fullTime)}}</small>
          </v-list-item-content>
          <v-list-item-icon>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" v-if="!isComplete" @click="complete(item)" color="green">done</v-icon>
            </template>
            <span>Mark Done</span>
          </v-tooltip>
            <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" v-if="!isComplete" color="blue">edit</v-icon>
            </template>
            <span>Edit</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-icon v-on="on" @click="deleteTodo(item)" color="red">delete</v-icon>
            </template>
            <span>Delete</span>
          </v-tooltip>
          </v-list-item-icon>
        </v-list-item>
        <v-divider inset :key="item.refKey"></v-divider>
      </template>
    </v-list>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    methods: {
      complete(item) {
        this.$store.dispatch("complete", item)
      },
      deleteTodo(item) {
        this.$store.dispatch("deleteTodo", item)
      },
      checkTime() {
        // setTimeout({
        //   console.log("Hell"), 
        // }
        //   // this.dispatch("checkUpcomingTime"),
        //   1000)
        // setInterval(() => {
        //   console.log("Hello")
        //   this.$store.dispatch("checkUpcomingTime")
        // }, 600);
        // console.log("in check")
        // this.$workee()

      }
    },
    computed : {
      ...mapGetters({
        getNavId: "getNavId", 
       getTodos: "getTodos",
        getIcon:"getIcon", 
        isComplete: "isComplete", 
        getUpcomingTodoTime:"getUpcomingTodoTime"}),
      ...mapActions(["loadTodo", "checkUpcomingTime"]),
    },
    watch: {
      $route() {
        this.getTodos = this.$store.dispatch("loadTodo")
      },

      // getUpcomingTodoTime() {
      //   // this.checkTime()
      // }
    },
      mounted() {
        // console.log("mounted")
        // this.checkTime()
        this.getTodos = this.$store.dispatch("loadTodo")
      },
      updated() {
        // console.log("updated")
      }
  }
</script>