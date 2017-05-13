// @flow
import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router'
import sortBy from 'lodash/sortBy'
import get from 'lodash/get'
import { prefixLink } from 'gatsby-helpers'
import { rhythm } from 'utils/typography'
import Helmet from 'react-helmet'
import { config } from 'config'
import include from 'underscore.string/include'
import Bio from 'components/Bio'

class BlogIndex extends React.Component {
  static propTypes = {
    route: PropTypes.object,
  }

  render() {
    // Sort pages.
    const sortedPages = sortBy(this.props.route.pages, 'data.date').reverse()
    // Posts are those with md extension that are not 404 pages OR have a date (meaning they're a react component post).
    const visiblePages = sortedPages.filter(
      page =>
        (get(page, 'file.ext') === 'md' && !include(page.path, '/404')) ||
        get(page, 'data.date')
    )
    return (
      <div>
        <Helmet
          title={config.blogTitle}
          meta={[
            { name: 'description', content: 'akameco' },
            { name: 'keywords', content: 'blog, articles' },
            { property: 'og:title', content: config.blogTitle },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: config.siteUrl },
            { property: 'og:image', content: config.ogImage },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@akameco' },
            { name: 'twitter:title', content: 'akameco blog' },
            { name: 'twitter:description', content: 'akameco blog' },
          ]}
        />
        <ul>
          {visiblePages.map(page => (
            <li
              key={page.path}
              style={{
                marginBottom: rhythm(1 / 4),
              }}
            >
              <Link style={{ boxShadow: 'none' }} to={prefixLink(page.path)}>
                {get(page, 'data.title', page.path)}
              </Link>
            </li>
          ))}
        </ul>
        <hr />
        <Bio />
      </div>
    )
  }
}

export default BlogIndex
