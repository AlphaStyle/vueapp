import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  body: {
    Author: 'author',
    Title: 'title',
    Content: 'content',
    ID: 0
  }
}

var id = 1
const mutations = {
  ADD_BLOG (state, author, title, content) {
    Vue.http.post('http://localhost:9000/api/addblog', {
      Author: author,
      Title: title,
      Content: content,
      ID: id++
    })
    .then(function (data, status, request) {
      console.log('Blog saved successfully.')
    })
    .catch(function (data, status, request) {
      console.log('There was a problem saving this Blog. Might be server problems. Please try again.')
    })
  },

  DELETE_BLOG (state, id) {
    delete state.blogs.splice(id, 1)
  },

  EDIT_BLOG (state, editAuthor, editTitle, editContent, id) {
    Vue.set(state.blogs[id], 'author', editAuthor)
    Vue.set(state.blogs[id], 'title', editTitle)
    Vue.set(state.blogs[id], 'content', editContent)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
