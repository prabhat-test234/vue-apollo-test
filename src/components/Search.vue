<template>
  <div>
    <div>
      <input type="text" v-model="searchText">
      <button class="ml1 pointer black" @click="search(posts)">Search</button>
    </div>
    <link-item
      v-for="(link, index) in allLinks"
      :key="link.id"
      :link="link"
      :index="index">
    </link-item>
  </div>
</template>

<script>
/* eslint-disable */
  import LinkItem from './LinkItem'
  import { mapState } from 'vuex'
  import router from '../router/index'


  export default {
    name: 'Search',
    computed: {
      ...mapState(['posts'])
    },
    data () {
      return {
        allLinks: [],
        searchText: ''
      }
    },
    methods: {
    search(posts) {
        const text = this.$data.searchText;
        console.log(text.length)
        if(text.length > 0) {
            this.allLinks = posts.filter(o => o.description.toLowerCase().includes(text.toLowerCase()))
            this.$store.dispatch('searchPost', this.allLinks);
        } else {
            this.$store.dispatch('allPost');
        }
        
        
    },
    },
    components: {
      LinkItem
    }
  }
</script>