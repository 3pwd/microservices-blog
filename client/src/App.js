import React from 'react'
import { PostCreate, PostList } from './components'

// eslint-disable-next-line
export default () => (
  <div className='container'>
    <h1>Create Post</h1>
    <PostCreate />
    <hr />
    <h1>Posts</h1>
    <PostList />
  </div>
)
