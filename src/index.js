import React from 'react'
import ReactDOM from 'react-dom'
import * as IScroll from 'iscroll'
import List from './list.js'
import Search from './search.js'
// import 'main.styl'

export default class InitialIndex extends React.Components {
  constructor () {
    super()
    this.quickSearch = this.quickSearch.bind(this)
  }
  quickSearch (e) {
    const clientY = (e.touches ? e.touches[0].clientY : e.clientY) - 40
    const searchHeight = ReactDOM.findDOMNode(this.refs.search).offsetHeight
    const rate = parseInt(clientY / searchHeight * this.letters.length)
    if (rate < 0) {
      this.scroller.scrollToElement(ReactDOM.findDOMNode(this.refs.list.refs[this.letters[0]]))
    }else if (rate > this.letters.length - 1){
      this.scroller.scrollToElement(ReactDOM.findDOMNode(this.refs.list.refs[this.letters[this.letters.length - 1]]))
    }
    else{
      this.scroller.scrollToElement(ReactDOM.findDOMNode(this.refs.list.refs[this.letters[rate]]))
    }
  }
  componentDidMount () {
    this.letters = []
    for (let i in this.props.letters) {
      this.letters[i] = this.props.letters[i].key
    }
    this.letters.sort()
    this.scroller = new IScroll(ReactDOM.findDOMNode(this.refs.scrollWrapper))
  }
  componentWillReceiveProps () {
    this.scroller.refresh()
  }
  componentWillMount () {
    React.initializeTouchEvents(true)
  }
  render () {
    return <div ref='scrollWrapper'>
      <List ref='list' />
      <Search ref='search' searchHandler={this.quickSearch} />
    </div>
  }
}