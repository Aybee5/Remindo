<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <h4 class="mt-1">Create New Task</h4>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <form @submit.prevent="createNewTodo">
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-col cols="11" lg="12" sm="12">
                <v-text-field
                  v-model="newTodo.title"
                  label="Task Title*"
                  prepend-icon="event"
                  required
                ></v-text-field>
              </v-col>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-col cols="11" sm="12" lg="12">
                <v-textarea
                  label="Task Description"
                  v-model="newTodo.description"
                  prepend-icon="description"
                  rows="3"
                ></v-textarea>
              </v-col>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-col cols="11" sm="12" lg="6">
                <v-menu
                  v-model="forDate"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="newTodo.date"
                      label="Date(YYYY-MM-DD)"
                      prepend-icon="event"
                      required
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="newTodo.date"
                    @input="forDate = false"
                    :min="new Date().toISOString().split('T')[0]"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
              <v-col cols="11" sm="12" lg="6">
                <v-menu
                  ref="menu"
                  v-model="forTime"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  :return-value.sync="newTodo.time"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="newTodo.time"
                      label="Select Time(24 Hrs)"
                      required
                      prepend-icon="access_time"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker v-if="forTime" v-model="newTodo.time" full-width>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="forTime = false">Cancel</v-btn>
                    <v-btn text color="primary" @click="$refs.menu.save(newTodo.time)">OK</v-btn>
                  </v-time-picker>
                </v-menu>
              </v-col>
            </v-flex>
          </v-layout>
          <v-layout row>
            <v-flex xs12 md6 offset-sm3>
              <v-col>
                <v-btn
                  color="success"
                  class="mx-2"
                  @click="createNewTodo"
                  :disabled="!formIsValid"
                  id="tura"
                >Save Task</v-btn>
                <v-btn color="warning" @click="$back()">Cancel</v-btn>
              </v-col>
            </v-flex>
          </v-layout>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      forTime: false,
      forDate: false,
      newTodo: {
        title: null,
        description: null,
        date: null,
        time: null
      }
    };
  },
  methods: {
    createNewTodo() {
      if (!this.formIsValid) {
        return;
      }
      let payload = this.newTodo;
      payload.refKey = Date.now().toString(36);
      let fullTime = `${payload.date}T${payload.time}`;
      delete payload.date;
      delete payload.time;
      payload.fullTime = this.moment(fullTime).format();
      this.$store.dispatch("createNewTodo", payload);
      this.$router.push("/task/upcoming");
    }
  },
  computed: {
    formIsValid() {
      return (
        this.newTodo.title !== null &&
        this.newTodo.description !== null &&
        this.newTodo.date !== null &&
        this.newTodo.time !== null
      );
    }
  }
};
</script>>