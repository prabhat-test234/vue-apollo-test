import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../firebase'
import router from '../router/index'

Vue.use(Vuex)
/* eslint-disable */
fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
  let postsArray = []

  snapshot.forEach(doc => {
    let post = doc.data()
    post.id = doc.id
    postsArray.push(post)
  })
  store.commit('setPosts', postsArray)
})

const store = new Vuex.Store({
  state: {
    userProfile: {},
    posts: [],
    loggedIn: false
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    setPerformingRequest(state, val) {
      state.performingRequest = val
    },
    setPosts(state, val) {
      // console.log(val)
      state.posts = val
    },
    setLoggedIn(state,val) {
      state.loggedIn = val;
    }
  },
  actions: {
    async login({ dispatch, commit }, form) {
      const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
      commit('setLoggedIn', true)
      dispatch('fetchUserProfile', user)
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)

      await fb.usersCollection.doc(user.uid).set({
        name: form.name,
        email: form.email
      })

      dispatch('fetchUserProfile', user)
    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      console.log('in user', userProfile)

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      if (router.currentRoute.path === '/login') {
        router.push('/')
      }
    },
    async logout({ commit }) {
      // log user out
      await fb.auth.signOut()
      commit('setLoggedIn', false)
      // clear user data from state
      commit('setUserProfile', {})

      // redirect to login view
      router.push('/login')
    },
    async submitPost({ dispatch }, form) {
      await fb.postsCollection.add(form)
      router.push('/')
    },
    async votesUpdate({ dispatch, commit }, postDetail) {
      // console.log(postDetail)
      const {postId} = postDetail;
      const {user} = postDetail;
      const doc = await fb.postsCollection.doc(postId).get()
      const vote = doc.data().votes
      if(vote.length > 0) {
        
        for(let i =0;i<vote.length;i++) {
          if(vote[i] !== user) {
            await fb.postsCollection.doc(postId).update({
              votes: fb.fbAdmin(user)
            })
          }

        }
      } else {
        await fb.postsCollection.doc(postId).update({
          votes: fb.fbAdmin(user)
        })
      }  
    },
    async searchPost({ commit }, links) {
      store.commit('setPosts', links)
      router.push("/")
    },
    async allPost({ commit }, links) {
      fb.postsCollection.orderBy('createdOn', 'desc').onSnapshot(snapshot => {
        let postsArray = []
      
        snapshot.forEach(doc => {
          let post = doc.data()
          post.id = doc.id
          postsArray.push(post)
        })
        store.commit('setPosts', postsArray)
      })
      router.push("/")
    }
  },
 
})

export default store