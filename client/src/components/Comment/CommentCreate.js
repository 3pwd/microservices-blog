import React, { useState } from 'react'
import { axios } from '../../lib'
import config from '../../config'
const {
  comments: { PORT }
} = config

//eslint-disable-next-line
export default ({ postId }) => {
  const [content, setContent] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    await axios(PORT).post(`posts/${postId}/comments`, { content })
    setContent('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='form-group'>
        <label>New comment</label>
        <input
          type='text'
          className='form-control'
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      </div>
      <button className='btn btn-primary'>Submit</button>
    </form>
  )
}
