import React from 'react'
import Comment from './Comment'

//eslint-disable-next-line
export default ({ comments }) => {
  return (
    <ul>
      {comments ? (
        Object.values(comments).map((comment, index) => (
          <Comment key={index} comment={comment} />
        ))
      ) : (
        <></>
      )}
    </ul>
  )
}
