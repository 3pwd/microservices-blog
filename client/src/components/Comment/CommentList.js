import React from 'react'
import Comment from './Comment'

//eslint-disable-next-line
export default ({ comments }) => {
  return (
    <ul>
      {comments.map(({ content }, index) => (
        <Comment key={index} content={content} />
      ))}
    </ul>
  )
}
