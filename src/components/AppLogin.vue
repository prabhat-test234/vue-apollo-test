<template>
  <div>
    <h4 class='mv3'>{{login ? 'Login' : 'Sign Up'}}</h4>
    <div class='flex flex-column'>
      <input
        v-show="!login"
        v-model="name"
        type="text"
        placeholder="Your name">
      <input
        v-model="email"
        type="text"
        placeholder="Your email address">
      <input
        v-model="password"
        type="password"
        placeholder="Password">
    </div>
    <div class='flex mt3'>
      <button
        type="button"
        class='pointer mr2 button'
        @click="confirm()">
        {{login ? 'login' : 'create account'}}
      </button>
      <button
        type="button"
        class='pointer button'
        @click="login = !login">
        {{login ? 'need to create an account?' : 'already have an account?'}}
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
  import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants/settings'

  export default {
    name: 'AppLogin',
    data () {
      return {
        email: '',
        login: true,
        name: '',
        password: ''
      }
    },
    methods: {
      confirm () {
        // console.log(this.$data.email)
        if(this.$data.login) {
           this.$store.dispatch('login', {
        email: this.$data.email,
        password: this.$data.password
      })
        } else {
          this.$store.dispatch('signup', {
        name: this.$data.name,
        email: this.$data.email,
        password: this.$data.password
      })
        }
       
      }
    }
  }
</script>