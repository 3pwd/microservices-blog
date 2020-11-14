import React, { useState, useEffect } from 'react'
import { axios } from '../../lib'
import Comment from './Comment'

//eslint-disable-next-line
export default ({ postId }) => {
  const [comments, setComments] = useState([])

  const fetchComments = async () => {
    const { data: comments } = await axios(4001).get(`posts/${postId}/comments`)
    setComments(comments)
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return (
    <ul>
      {comments ? (
        comments.map(({ content }, index) => (
          <Comment key={index} content={content} />
        ))
      ) : (
        <></>
      )}
    </ul>
  )
}
