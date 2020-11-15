import React from 'react'

// eslint-disable-next-line
export default ({ comment }) => {
  console.log(comment)
  const renderContent = ({ content, status }) => {
    let result
    switch (status) {
      case 'approved':
        console.log('in appr')
        result = content
        break
      case 'denied':
        result = <em>Comment denied (forbidden content)</em>
        break
      case 'pending':
        result = <em>Comment awaiting for moderation</em>
        break
    }
    return result
  }

  return <p>{renderContent(comment)}</p>
}
