import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'
import { rhythm, scale } from 'utils/typography'

const Item = ({ header, title, path }) => (
  <div>
    <h6
      style={{
        margin: 0,
        letterSpacing: -0.25,
      }}
    >
      {header}
    </h6>
    <h4
      style={{
        marginTop: 0,
        marginBottom: rhythm(1 / 4),
      }}
    >
      <Link
        to={{
          pathname: prefixLink(path),
          query: {
            readNext: true,
          },
        }}
      >
        {title}
      </Link>
    </h4>
  </div>
)

export default class ReadNext extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    pages: PropTypes.array,
  }

  render() {
    const { pages, post } = this.props
    const currentIndex = pages.findIndex(page => page.path === post.path)

    let beforePost = null
    if (currentIndex > 0) {
      beforePost = pages[currentIndex - 1]
    }

    let nextPost = null
    // index, 404の分を除去するので -3
    if (currentIndex < pages.length - 3) {
      nextPost = pages[currentIndex + 1]
    }

    return (
      <div>
        {nextPost &&
          <Item
            header="次の記事"
            title={nextPost.data.title}
            path={nextPost.path}
          />}

        {beforePost &&
          <Item
            header="前の記事"
            title={beforePost.data.title}
            path={beforePost.path}
          />}

        <hr />
      </div>
    )
  }
}
