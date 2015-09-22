////////////////////////////////////////////////////////////////////////////////
// Exercise:
//
// Write a <ListView> that only shows the elements in the view.
////////////////////////////////////////////////////////////////////////////////
import React from 'react'
import { render } from 'react-dom'
import RainbowList from './lib/RainbowList'

const { array, func, number } = React.PropTypes

require('./styles')

class ListView extends React.Component {

  static propTypes = {
    items: array.isRequired,
    itemHeight: number.isRequired,
    availableHeight: number.isRequired,
    renderItem: func.isRequired
  }

  constructor(props, context) {
    super(props, context)
    this.handleScroll = this.handleScroll.bind(this)
    this.state = {
      scrollTop: 0
    }
  }

  handleScroll(event) {
    this.setState({
      scrollTop: event.target.scrollTop
    })
  }

  render() {
    let { items, itemHeight, availableHeight, renderItem, style } = this.props
    let { scrollTop } = this.state

    scrollTop = Math.max(scrollTop - 1000, 0)

    let scrollBottom = scrollTop + availableHeight + 1000
    let startIndex = Math.floor(scrollTop / itemHeight)
    let endIndex = Math.ceil(scrollBottom / itemHeight)
    let totalHeight = items.length * itemHeight

    let itemStyle = { position: 'absolute', width: '100%', pointerEvents: 'none' }

    return (
      <div style={{ ...style, height: '100%', overflowY: 'scroll' }} onScroll={this.handleScroll}>
        <ol style={{ position: 'relative', height: totalHeight, transform: 'translate3d(0,0,0)' }}>
        {items.slice(startIndex, endIndex).map((item, index) =>
          <li key={item.text} style={{ ...itemStyle, top: (startIndex + index) * itemHeight }}>
          {renderItem(item)}
          </li>
        )}
        </ol>
      </div>
    )
  }
 
}

render(
  <RainbowList ListView={ListView} length={500000} />,
  document.getElementById('app')
)
