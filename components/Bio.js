// @flow
import React from 'react'
import { config } from 'config'
import { rhythm } from 'utils/typography'
import profilePic from './avater.png'

class Bio extends React.PureComponent {
  render() {
    return (
      <div style={{ marginBottom: rhythm(2) }}>
        <img
          src={profilePic}
          alt={`author ${config.authorName}`}
          style={{
            float: 'left',
            marginRight: rhythm(1 / 4),
            marginBottom: 0,
            borderRadius: '50%',
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>{config.authorName}</strong>
          <div>
            <a href="https://twitter.com/akameco">Twitter</a>{' '}
            <a href="https://github.com/akameco">GitHub</a>
          </div>
        </p>
      </div>
    )
  }
}

export default Bio
