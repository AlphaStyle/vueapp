/* eslint-disable */
export const addBlog = ({ dispatch }, author, title, content) => {
  dispatch('ADD_BLOG', author, title, content)
}

export const deleteBlog = ({ dispatch }, dbKey, arrKey) => {
  dispatch('DELETE_BLOG', dbKey, arrKey)
}

export const editBlog = ({ dispatch }, editAuthor, editTitle, editContent, editKey, editId) => {
  dispatch('EDIT_BLOG', editAuthor, editTitle, editContent, editKey, editId)
}

// TODO Fix this !! Dont import store
import store from './store.js'

export const loadBlogs = () => {
  store.dispatch('LOAD_BLOG')
}
