/* eslint-disable */

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
Vue.config.debug = true

var id = 0
const state = {
  blogs: [{
    Title: 'test',
    Author: 'test',
    Content: 'test',
    ID: id
  }]
}

const mutations = {
  ADD_BLOG (state, author, title, content) {
    state.blogs.push({
      Author: author,
      Title: title,
      Content: content,
      ID: id = id + 1
    })
    Vue.http.post('http://localhost:9000/api/addblog', {
      Author: author,
      Title: title,
      Content: content,
      ID: id
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

  LOAD_BLOG (state) {
    Vue.http.get('http://localhost:9000/api/getblogs').then(function (response) {
      var blogs = response.data
      for (var n in blogs) {
        if (blogs.hasOwnProperty(n)) {
          // TODO Ugly Quick Fix
          if (n == 0 && id == 0) {
            Vue.set(state.blogs[n], 'Author', blogs[n].Author)
            Vue.set(state.blogs[n], 'Title', blogs[n].Title)
            Vue.set(state.blogs[n], 'Content', blogs[n].Content)
            Vue.set(state.blogs[n], 'ID', blogs[n].ID)
          } else if (n > id) {
            state.blogs.push({
              Author: blogs[n].Author,
              Title: blogs[n].Title,
              Content: blogs[n].Content,
              ID: blogs[n].ID
            })
            id = id + 2
          } else if (n == id) {
            state.blogs.push({
              Author: blogs[n].Author,
              Title: blogs[n].Title,
              Content: blogs[n].Content,
              ID: blogs[n].ID
            })
            id++
          }
        }
        console.log('last n is ' + n)
        console.log('last id ' + id)
        console.log('blogs id ' + blogs[n].ID)
      }
    }, function (response) {
      // error callback
      console.log(response)
    })
  },
  EDIT_BLOG (state, editAuthor, editTitle, editContent, id) {
    Vue.set(state.blogs[id], 'Author', editAuthor)
    Vue.set(state.blogs[id], 'Title', editTitle)
    Vue.set(state.blogs[id], 'Content', editContent)
  }
}

export default new Vuex.Store({
  state,
  mutations
})
