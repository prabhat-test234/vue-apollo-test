<template>
  <div class="flex pa1 justify-between nowrap orange">
    <div class="flex flex-fixed black">
      <div class="fw7 mr1">Vue App</div>
      <router-link to="/" class="ml1 no-underline black">new</router-link>
      <div class="ml1">|</div>
      <router-link to="/search" class="ml1 no-underline black">search</router-link>
      <div class="ml1">|</div>
      <router-link to="/create" class="ml1 no-underline black">submit</router-link>
    </div>
     <div class="flex flex-fixed">
      <div v-if="userId" class="ml1 pointer black" @click="logout()">logout</div>
      <router-link v-else to="/login" class="ml1 no-underline black">login</router-link>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'

  export default {
    name: 'AppHeader',
    computed: {
      ...mapState(['loggedIn']),
      userId () {
        console.log(this.loggedIn)
        return this.loggedIn
      }
    },
    methods: {
      logout () {
        this.$store.dispatch('logout')
        localStorage.clear()
      }
    }
  }
</script>