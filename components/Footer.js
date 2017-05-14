// @flow
import React, { PureComponent } from 'react'
import Bio from './Bio'

class Footer extends PureComponent {
  props: { height: number }
  render() {
    const { height } = this.props
    return (
      <div style={{ height, position: 'absolute', bottom: 0, width: '80%' }}>
        <hr />
        <Bio />
      </div>
    )
  }
}

export default Footer
