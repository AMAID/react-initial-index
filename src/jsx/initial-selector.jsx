import React from 'react'
import IScroll from 'iscroll'
import data from '../data/data.json'

let List = React.createClass({
    render: function() {
        return(<ul className='list'>
            {data.map(item=> {
                return(<li key={item.key}>
                    <label data-letter={item.key} ref={item.key}>{item.key}</label>
                    <ul>
                        {item.content.map(content=>{
                            return(<li key={content}>{content}</li>)
                        })}
                    </ul>
                </li>)
            })}
        </ul>)
    }
});
let Search = React.createClass({
    render: function () {
        return(
            <ul className="quick-search" onTouchStart={this.props.searchHandler} onClick={this.props.searchHandler}>
                {data.map(item=> {
                    return <li key={item.key} onTouchMove={this.props.searchHandler}><span>{ item.key }</span></li>
                })}
            </ul>
        )
    }
});
let InitialIndex=React.createClass({
    render:function(){
        return(
            <div ref='scrollWrapper'>
                <List ref='list'/>
                <Search ref='search' searchHandler={this.quickSearch}/>
            </div>
        )
    },
    quickSearch:function(e){
        let clientY=(e.touches?e.touches[0].clientY:e.clientY)-40,
            searchHeight=this.refs.search.getDOMNode().offsetHeight,
            rate=parseInt(clientY/searchHeight*this.letters.length)

        console.log(this.refs.list.refs[this.letters[rate]].getDOMNode(),rate,searchHeight,clientY)
        this.scroller.scrollToElement(this.refs.list.refs[this.letters[rate]].getDOMNode())
    },
    componentDidMount:function(){
        this.letters=[]
        for(let i in this.props.letters){
            this.letters[i]=this.props.letters[i].key
        }
        this.letters.sort()
        this.scroller=new IScroll(this.refs.scrollWrapper.getDOMNode())
    },
    componentWillReceiveProps:function(){
        this.scroller.refresh()
    },
    componentWillMount:function(){
        React.initializeTouchEvents(true)
    }
})
React.render(
    <InitialIndex letters={data}/>,
    document.getElementById('initial-index')
)