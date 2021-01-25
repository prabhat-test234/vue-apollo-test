<template>
  <div>
    <div class="flex flex-column mt3">
      <input
        class="mb2"
        v-model="description"
        type="text"
        placeholder="A description for the link">
      <input
        class="mb2"
        v-model="url"
        type="text"
        placeholder="The URL for the link">
    </div>
    <button @click="createLink()">Submit</button>
  </div>
</template>

<script>
/* eslint-disable */
import { mapState } from 'vuex'

  export default {
    name: 'CreateLink',
    data () {
      return {
        description: '',
        url: ''
      }
    },
    computed: {
      ...mapState(['userProfile']),
      userId() {
        return this.userProfile.name
      }

    },
    methods: {
      createLink () {
        const { description, url } = this.$data

        const valT = {
          name: this.userId,
          description: description,
          url:url,
          createdOn: new Date().getTime(),
          votes: []
        }
        // console.log(valT)
        this.$store.dispatch('submitPost', valT)
        // this.$router.push({path: '/'})
      }
    }
  }
</script>