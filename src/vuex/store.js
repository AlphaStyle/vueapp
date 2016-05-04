import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

const state = {
  blogs: [{
    author: 'AlphaStyle',
    title: 'First Blog Post',
    content: 'Blog Content'
  }
]}

const mutations = {
  ADD_BLOG (state, author, title, content) {
    state.blogs.push({
      author: author,
      title: title,
      content: content
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
