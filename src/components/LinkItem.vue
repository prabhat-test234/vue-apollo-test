<template>
  <div class="flex mt2 items-start">
    <div class="flex items-center">
      <span class="gray">{{linkNumber}}.</span>
      <div v-if="userId" class="ml1 gray f11 upvote" @click="voteForLink(userId, link.id)">▲</div>
    </div>
    <div class="ml1">
      <a :href="link.url" class="link">{{link.description}} ({{link.url}})</a>
      <div class="f6 lh-copy gray">
        {{link.votes.length}} votes | by {{link.name ? link.name : 'Unknown'}} {{timeDifferenceForDate(link.createdOn)}}
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { timeDifferenceForDate } from '../utils'
import { mapState } from 'vuex'

export default {
  name: 'LinkItem',
  computed: {
      ...mapState(['userProfile']),
      userId() {
        return this.userProfile.email
      },
      linkNumber () {
        if (this.$route.path.includes('new')) {
          return (this.pageNumber - 1) * this.linksPerPage + (this.index + 1)
        } else {
          return this.index + 1
        }
      }
    },
  props: ['link','index'],
  methods: {
      timeDifferenceForDate,
      voteForLink(user,postId) {
        const postDetails = {
          user: user,
          postId: postId
        }
        this.$store.dispatch('votesUpdate', postDetails)
      }
    }
}
</script>

<style scoped>
  .upvote {
    cursor: pointer;
  }

  .link {
    text-decoration: none;
    color: black;
  }
</style>