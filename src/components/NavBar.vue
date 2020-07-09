<template>
  <div class="mb-10">
    <v-navigation-drawer v-model="sideNav" absolute temporary>
      <v-list-item>
        <v-list-item-avatar>
          <v-img>
            <!--user image here-->
          </v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>
            <!--user's name here-->
            User
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item v-for="item in items" :key="item.title" link router-link :to="item.link">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon color="red" v-if="isOverDue">{{ item.postIcon }}</v-icon>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar dense fixed>
      <v-app-bar-nav-icon @click="sideNav = !sideNav" class="hidden-sm-and-up"></v-app-bar-nav-icon>
      <v-avatar tile router-link to="/welcome">
        <v-img :src="require('../assets/remindo.png')"></v-img>
      </v-avatar>
      <v-toolbar-title class="mr-6" router-link to="/welcome">ReminDo</v-toolbar-title>
      <v-toolbar-items v-for="item in items" :key="item.title" class="hidden-xs-only">
        <v-btn depressed router-link :to="item.link">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
          <v-icon right color="red" v-if="isOverDue">{{item.postIcon}}</v-icon>
        </v-btn>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-icon left color="red" class="hidden-sm-and-up" v-if="isOverDue" @click="toOverDue">warning</v-icon>
      <v-toolbar-items>
        <v-btn depressed color="#15c39a" router-link to="/new">
          <v-icon left>alarm_add</v-icon>Add a Task
        </v-btn>

        <v-btn depressed class="hidden-xs-only">
          <v-icon left>person</v-icon>Profile
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sideNav: false,
      time: null,
      dialog: false,
      items: [
        { title: "Upcoming", icon: "event_note", link: "/task/upcoming" },
        {
          title: "Over Due",
          icon: "event_busy",
          link: "/task/overdue",
          postIcon: "warning"
        },
        { title: "Completed", icon: "event_available", link: "/task/completed" }
      ]
    };
  },
  methods: {
    toOverDue() {
      this.$router.push("/task/overdue");
    }
  },
  computed: {
    isOverDue() {
      return this.$store.getters.checkOverDue;
    }
  }
};
</script>>