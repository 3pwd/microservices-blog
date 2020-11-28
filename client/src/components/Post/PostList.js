import React, { useState, useEffect } from 'react'
import { axios } from '../../lib'
import Post from './Post'
import { CommentCreate, CommentList } from '../'

// eslint-disable-next-line
export default () => {
  const [posts, setPosts] = useState({})
  // console.log(axios)
  const fetchPosts = async () => {
    const { data: posts } = await axios.get('/posts')
    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className="d-flex flex-row flex-wrap justify-content-between">
      {Object.entries(posts).map(([id, { title, comments }], _) => (
        <>
          <Post title={title} key={id}>
            <CommentList postId={id} comments={comments} />
            <CommentCreate postId={id} />
          </Post>
        </>
      ))}
    </div>
  )
}
