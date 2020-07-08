<template>
  <div>
    <v-layout row class="ml-1">
      <v-flex xs12 md6>
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
                    <v-icon v-on="on" @click="deleteTodo(item)" color="red">delete</v-icon>
                  </template>
                  <span>Delete</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>
            <v-divider inset :key="item.refKey"></v-divider>
          </template>
        </v-list>
      </v-flex>
    </v-layout>
    <!-- dialog start -->
    <v-row justify="center">
      <v-dialog v-model="dialog" persistent max-width="290">
        <v-card>
          <v-card-title class="headline">Accept Notification</v-card-title>
          <v-card-text>For the application to work correctly, Notification must be enable. After closing this modal, please accept notification and don't forget to Add to Home Screen</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="notify">Ok</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- dialog End -->

    <!-- snackBar Start -->
    <v-snackbar v-model="snackbar" timeout="2000">
      {{ text }}
      <template v-slot:action="{ attrs }">
        <v-btn color="success" text v-bind="attrs" @click="snackbar = false">Ok</v-btn>
      </template>
    </v-snackbar>
    <!-- snackBar End -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      dialog: false,
      snackbar: false,
      text: null,
      installPromptEvent: null
    };
  },
  /* 
    const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  onOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

Toast.fire({
  icon: 'success',
  title: 'Signed in successfully'
})
    */
  methods: {
    notify() {
      this.dialog = false;
      Notification.requestPermission().then(result => {
        if (result === "granted") {
          console.log(this.installPromptEvent, "in methods before valuating");
          this.installPromptEvent.prompt();
          this.installPromptEvent.userChoice.then(choice => {
            choice.outcome === "accepted"
              ? this.installPromptEvent === null
              : console.log(this.installPromptEvent);
          });
          console.log("notification on");
        }
      });
    },
    complete(item) {
      this.$store.dispatch("complete", item);
      this.text = "Congratulation, you completed a task";
      this.snackbar = true;
    },
    deleteTodo(item) {
      this.$store.dispatch("deleteTodo", item);
      this.text = "Deleted successfully";
      this.snackbar = true;
    }
  },
  computed: {
    ...mapGetters({
      getNavId: "getNavId",
      getTodos: "getTodos",
      getIcon: "getIcon",
      isComplete: "isComplete",
      getUpcomingTodoTime: "getUpcomingTodoTime"
    }),
    ...mapActions(["loadTodo", "checkUpcomingTime", "checkLeastUpcomingTime"])
  },
  watch: {
    $route() {
      this.getTodos = this.$store.dispatch("loadTodo");
    },
    getUpcomingTodoTime() {
      this.$store.dispatch("checkLeastUpcomingTime");
    }
    // getUpcomingTodoTime() {
    //   // this.checkTime()
    // }
  },
  mounted() {
    // console.log("mounted")
    // this.checkTime()
    this.getTodos = this.$store.dispatch("loadTodo");
    this.$store.dispatch("checkLeastUpcomingTime");
    console.log("mounted again ");
  },
  updated() {
    // console.log("updated")
  },
  created() {
    console.log("created");
    window.addEventListener("beforeinstallprompt", event => {
      console.log(event, "before install");
      event.preventDefault();
      this.installPromptEvent = event;
      console.log("install prompt", this.installPromptEvent);
    });
    if (
      "Notification" in window &&
      Notification.permission !== "denied" &&
      Notification.permission !== "granted"
    ) {
      this.dialog = true;
    }
  }
};
</script>