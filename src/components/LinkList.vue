<template>
  <div>
    <link-item
      v-for="(link, index) in posts"
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
// import {ALL_LINKS_QUERY} from '../constants/graphql'

export default {
  name: 'LinkList',
   computed: {
      ...mapState(['posts'])
    },
  components: {
    LinkItem
  }
}
</script>
