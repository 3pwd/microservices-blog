const {
  POST_CREATED,
  COMMENT_CREATED,
  COMMENT_UPDATED
} = require('../../types')

exports.handleEvent = (
  posts,
  type,
  { postId, title, id: commentId, content, status }
) => {
  if (type === POST_CREATED) {
    posts[postId] = { title, comments: {} }
  }

  if ([COMMENT_CREATED, COMMENT_UPDATED].includes(type)) {
    const comment = { content, status }
    posts[postId].comments[commentId] = comment
  }
}
