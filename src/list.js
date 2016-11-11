import React from 'react'

export default props => <ul className='list'>
  {data.map(item => <li key={item.key}>
      <label data-letter={item.key} ref={item.key}>{item.key}</label>
      <ul>
        {item.content.map(content => <li key={content}>{content}</li>)}
      </ul>
    </li>
  )}
</ul>