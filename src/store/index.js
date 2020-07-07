import Vue from 'vue'
import Vuex from 'vuex'
import Moment from 'moment'
import { extendMoment } from "moment-range"
const moment = extendMoment(Moment)
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isComplete: true,
    upcoming: [],
    overDue: [],
    completed: [],
    todos: []
  },
  getters: {
    getNavId(state) {
      return state.route.params.id
    },
    isComplete(state) {
      return state.isComplete
    },
    getTodos(state) {
      return state.todos
    },
    getUpcomingTodoTime(state) {
      return state.upcoming
    },
    checkOverDue(state) {
      let overDueLength = state.overDue.length
      if (overDueLength > 0) {
        return overDueLength
      }
      return false
    }
  },
  actions: {
    loadTodo(context) {
      let id = context.getters.getNavId
      context.commit('loadTodo', id)
    },
    checkLeastUpcomingTime(context) {
      let current = context.getters.getUpcomingTodoTime
      let upComingTodosTime = []
      current.forEach(todo => {
        let todoTime = todo.fullTime
        if (moment(todoTime).isSameOrBefore(moment())) {
          let itemIndex = context.state.upcoming.indexOf(todo)
          let item = context.state.upcoming.splice(itemIndex, 1)[0]
          context.state.overDue.push(item)
        }
        else {
          upComingTodosTime.push(new Date(todoTime))
        }
      })
      if (upComingTodosTime.length > 0) {
        let minDate = upComingTodosTime.reduce(function (a, b) {
          return a < b ? a : b;
        });
        let leastTask = current.find(todo=> new Date(todo.fullTime) == minDate.toString())
        let now = moment()
        let milliSecondsDiff = moment().range(now, minDate).diff()
        if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
          navigator.serviceWorker.controller.postMessage({ time: milliSecondsDiff, title: leastTask.title })
        }
      }
    },
    complete(context, payload) {
      context.commit("complete", { item: payload, navId: context.getters.getNavId })
    },
    deleteTodo(context, payload) {
      context.commit("deleteTodo", payload)
    },
    createNewTodo(context, payload) {
      context.commit("createNewTodo", payload)
    }
  },
  mutations: {
    deleteTodo(state, payload) {
      let itemIndex = state.todos.indexOf(payload)
      state.todos.splice(itemIndex, 1)
    },
    checkUpcomingTime() {

      // upComingTime
      // console.log(upComingTime)

    },
    complete(state, payload) {
      let navId = payload.navId

      if (navId === "upcoming") {
        let itemIndex = state.upcoming.indexOf(payload.item)
        let item = state.upcoming.splice(itemIndex, 1)[0]
        state.completed.push(item)
      }
      else if (navId === "overdue") {
        let itemIndex = state.overDue.indexOf(payload.item)
        let item = state.overDue.splice(itemIndex, 1)[0]
        state.completed.push(item)
      }
    },
    loadTodo(state, payload) {
      let id = payload
      if (id === 'upcoming') {
        state.isComplete = false
        state.todos = state.upcoming
      }
      else if (id === 'completed') {
        state.isComplete = true
        state.todos = state.completed
      }
      else {
        state.isComplete = false
        state.todos = state.overDue
      }
      return state.todos
    },
    createNewTodo(state, payload) {
      state.upcoming.push(payload)
    }
  },
  modules: {
  },
  plugins: [vuexLocalStorage.plugin]
})
