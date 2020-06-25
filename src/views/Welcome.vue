<template>
 <v-row justify="center" style="margin-top: 30px;">
        <v-col cols="12" sm="10" md="8" lg="6">
  <v-container>
    <v-layout
      text-center
      wrap
      justify-center
      align-center
    >
    <v-flex xs12 sm10 md8>
      <v-card flat style="margin: 5px;" class="transparent elevation-0">
      <v-card-title>
            <v-flex xs12>
                <v-img
                class="my-3"
                contain
                height="200"
                @click="$router.go('/')"
                ></v-img>
            </v-flex>
       </v-card-title>

    <v-card-text>
                <v-flex mb-4>
                    <h1 class="headline text-uppercase mb-3 black--text">
                <span class="font-weight-light green--text"> Remindo</span>
                </h1>
            </v-flex>
      <v-flex mb-5 xs12 >
        <h3 class=" font-weight-light">
            Remindo is an interactive task management application that helps you in managing your todos
        </h3>
        <div> &nbsp; </div>
        <v-btn outlined color="green lighten-1" large @click="$router.push('/task/upcoming')"> Get started  </v-btn>
      </v-flex>
    </v-card-text>

    <v-card-actions> 
    <v-layout justify="center">
    <v-flex mb-5 xs12 >
        <div class="text--primary">
            <h6 class="font-weight-light">
            <v-icon small>mdi-phone</v-icon> 
            +2348139349336 &nbsp;   
            <v-icon small>mdi-email</v-icon>
            ibrahiimaa05@gmail.com &nbsp;&nbsp; &copy; {{ new Date().getFullYear() }}</h6>
            
        </div>
        </v-flex>
        </v-layout>
    </v-card-actions>


  </v-card>
    </v-flex>
    </v-layout>
  </v-container>
  </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
        inumber: null,
        started: false
    }
  },
  methods: {
    requestPremium() {
        if(!this.inumber){
            this.$router.push('/')
        }
    }
  }
};
</script>