import React from 'react'

export default props => <ul className="quick-search" onTouchStart={props.searchHandler} onClick={props.searchHandler}>
  {props.data.map(item=> {
    return <li key={item.key} onTouchMove={this.props.searchHandler}><span>{ item.key }</span></li>
  })}
</ul>