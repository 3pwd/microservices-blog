import React from 'react'

// eslint-disable-next-line
export default ({ title, children }) => (
  <div className='card' style={{ width: '30%', marginBottom: '20px' }}>
    <div className='card-body'>
      <h3>{title}</h3>
      {children}
    </div>
  </div>
)
