import React from 'react'

const { array, number, oneOfType, string } = React.PropTypes

function formatHSL(h, s, l) {
  return 'hsl(' + h + ',' + Math.round(s * 100) + '%,' + Math.round(l * 100) + '%)'
}

class PlaceholderText extends React.Component {

  static propTypes = {
    width: oneOfType([ number, string ]).isRequired,
    height: oneOfType([ number, string ]).isRequired,
    backgroundColor: array.isRequired,
    textColor: array.isRequired,
    textSize: number.isRequired,
    text: string
  }

  static defaultProps = {
    width: '100%',
    backgroundColor: [ 0, 1, 1], // white
    textColor: [ 0, 0, 0 ], // black
    textSize: 24 
  }

  render() {
    let { width, height, backgroundColor, textColor, textSize, text } = this.props
    let backgroundHSL = formatHSL(...backgroundColor)
    let textHSL = formatHSL(...textColor)

    if (text == null)
      text = `${width}x${height}`

    return (
      <div style={{ width, height, backgroundColor: backgroundHSL, color: textHSL, fontSize: textSize }}>
        {text}
      </div>
    )
  }

}

export default PlaceholderText
