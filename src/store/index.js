import Vue from 'vue'
import Vuex from 'vuex'
import Moment from 'moment'
import localforage from "localforage";
import {extendMoment} from "moment-range"
const moment = extendMoment(Moment)
import VuexPersist from "vuex-persist";

const vuexLocalStorage = new VuexPersist({
  key: 'vuex', // The key to store the state on in the storage provider.
  storage: window.localStorage, // or window.sessionStorage or localForage
  // Function that passes the state and returns the state with only the objects you want to store.
  // reducer: state => state,
  // Function that passes a mutation and lets you decide if it should update the state in localStorage.
  // filter: mutation => (true)
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isComplete: true,
    upcoming: [
      { refKey: 1,
        fullTime: "2020-06-08T11:33:55.354Z",
        title: 'Brunch this weekend?1',
        subtitle: "<span class='text--primary'>Ali C1onnors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      { refKey:2,
        fullTime: "2020-06-09T11:33:55.354Z",
        title: 'Summer BBQ1 <span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to 1Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      { refKey:3,
        fullTime: "2020-06-10T11:33:55.354Z",
        title: 'Brunch this1 weekend?',
        subtitle: "<span class='text--primary'>Ali Con2nors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      { refKey:4,
        fullTime: "2020-06-11T11:33:55.354Z",
        title: 'Summer BBQ 2<span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, 4Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
      { refKey:5,
        fullTime: "2020-06-12T11:33:55.354Z",
        title: 'Brunch this 3weekend?',
        subtitle: "<span class='text--primary'>Ali Conn5ors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
      },
      { refKey:6,
        fullTime: "2020-06-13T11:33:55.354Z",
        title: 'Summer BBQ 3<span class="grey--text text--lighten-1">4</span>',
        subtitle: "<span class='text--primary'>to Alex, Sco7tt, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
      },
    ],
    overDue: [
      { refKey:7,
        title: 'Recipe t1o try1',
        subtitle: "<span class='text--primary'>Britt8a Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:8,
        title: 'Recipe to try2',
        subtitle: "<span class='text--primary'>Brit2ta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:9,
        title: 'Recipe to try3',
        subtitle: "<span class='text--primary'>Br9itta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:10,
        title: 'Recipe to try4',
        subtitle: "<span class='text--primary'>Brit0ta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:11,
        title: 'Recipe to try5',
        subtitle: "<span class='text--primary'>Bri6tta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:12,
        title: 'Recipe to try6',
        subtitle: "<span class='text--primary'>Brit5ta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      },
      { refKey:13,
        title: 'Recipe to try7',
        subtitle: "<span class='text--primary'>Britthha Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
      }
    ],
    completed: [
      { refKey:14,
        title: 'Oui oui 1',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      { refKey:15,
        title: 'Birthday2 gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday? Lorem",
      },
      { refKey:16,
        title: 'Oui oui3',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      { refKey:17,
        title: 'Birthday5 gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      },
      { refKey:18,
        title: 'Oui oui4',
        subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
      },
      { refKey:19,
        title: 'Birthday6 gift',
        subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
      } 
    ],
    todos:[]
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
      if ( overDueLength > 0) {
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
      if (upComingTodosTime.length > 0){
        let minDate = upComingTodosTime.reduce(function (a, b) { 
          return a < b ? a : b;  
        });
        let now = moment()
        let milliSecondsDiff = moment().range(now,minDate).diff()
        localforage.setItem("time", milliSecondsDiff).then(()=>{
          if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
            navigator.serviceWorker.controller.postMessage({type: "FETCH_LT"})
          }
        })
      }
      
      // let minDate = upComingTodosTime[0]
      // let minDateObj = new Date(upComingTodosTime[0])
      // upComingTodosTime.forEach((date, index)=>{
      //   if (new Date(date) < minDateObj) {
      //     minDate = date
      //     minDateObj = new Date(date)
      //   }
      //   return
      // })

      //var max_dt = all_dates[0],
      // max_dtObj = new Date(all_dates[0]);
      // all_dates.forEach(function(dt, index)
      //   {
      //     if ( new Date( dt ) > max_dtObj)
      //   {
      //     max_dt = dt;
      //     max_dtObj = new Date(dt);
      //   }
      //   });
      // return max_dt;
      // localforage.setItem("upcoming", context.state.upcoming)
      //     .then((data)=>{
      //       console.log("Saved", data)
      //       context.commit("checkUpcomingTime", upComingTime)
      //     })
      //     .catch(err => console.log(err))
        
        
      //     localforage.setItem("upcoming", context.state.upcoming)
      //     .then((data)=>{
      //       console.log("Saved", data)
      //       // context.commit("checkUpcomingTime", upComingTime)
      //     })
      //     .catch(err => console.log(err))
      //     localforage.setItem("upcomingsss", context.state.upcoming)
      //     .then((data)=>{
      //       console.log("Saved", data)
      //       // context.commit("checkUpcomingTime", upComingTime)
      //     })
      //     .catch(err => console.log(err))
    },
    complete(context, payload) {
      context.commit("complete", {item:payload, navId: context.getters.getNavId})
    },
    deleteTodo(context, payload) {
      context.commit("deleteTodo", payload)
    },
    createNewTodo(context, payload) {
      context.commit("createNewTodo", payload)
    }
  },
  mutations: {
    deleteTodo(state,payload) {
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
