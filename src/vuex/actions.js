export const addBlog = ({ dispatch }, author, title, content) => {
  dispatch('ADD_BLOG', author, title, content)
}

export const deleteBlog = ({ dispatch }, id) => {
  dispatch('DELETE_BLOG', id)
}

export const editBlog = ({ dispatch }, editAuthor, editTitle, editContent, id) => {
  dispatch('EDIT_BLOG', editAuthor, editTitle, editContent, id)
}
