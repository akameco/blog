import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { prune, include as includes } from 'underscore.string'
import find from 'lodash/find'
import { rhythm, scale } from 'utils/typography'

export default class ReadNext extends React.Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    pages: PropTypes.array,
  }

  render() {
    const { pages, post } = this.props
    const { readNext } = post
    let nextPost
    if (readNext) {
      nextPost = find(pages, page => includes(page.path, readNext))
    }
    if (!nextPost) {
      return null
    } else {
      nextPost = find(pages, page => includes(page.path, readNext.slice(1, -1)))
      // Create pruned version of the body.
      const html = nextPost.data.body
      const body = prune(html.replace(/<[^>]*>/g, ''), 150)

      return (
        <div>
          <h6
            style={{
              margin: 0,
              letterSpacing: -0.25,
            }}
          >
            次の記事
          </h6>
          <h4
            style={{
              marginTop: 0,
              marginBottom: rhythm(1 / 4),
            }}
          >
            <Link
              to={{
                pathname: prefixLink(nextPost.path),
                query: {
                  readNext: true,
                },
              }}
            >
              {nextPost.data.title}
            </Link>
          </h4>
          <p>{body}</p>
          <hr />
        </div>
      )
    }
  }
}
