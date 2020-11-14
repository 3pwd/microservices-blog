import React, { useState, useEffect } from 'react'
import { axios } from '../../lib'
import Post from './Post'

// eslint-disable-next-line
export default () => {
  const [posts, setPosts] = useState({})
  console.log({ posts })

  const fetchPosts = async () => {
    const { data: posts } = await axios(4000).get('posts')
    setPosts(posts)
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {Object.entries(posts).map(([id, { title }], _) => (
        <Post title={title} key={id} />
      ))}
    </div>
  )
}
