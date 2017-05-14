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
import Footer from 'components/Footer'

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

    const footerHeight = 140

    return (
      <div
        style={{
          width: '100%',
          minHeight: '100%',
          heght: 'auto',
          position: 'relative',
        }}
      >
        <Helmet
          title={config.blogTitle}
          meta={[
            { name: 'description', content: 'akameco blog' },
            { name: 'keywords', content: 'blog, articles' },
            { property: 'og:site_name', content: config.blogTitle },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: config.siteUrl },
            { property: 'og:image', content: config.ogImage },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@akameco' },
            { name: 'twitter:title', content: 'akameco blog' },
            { name: 'twitter:description', content: 'akameco blog' },
          ]}
        />
        <div style={{ paddingBottom: footerHeight }}>
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
        </div>
        <Footer height={footerHeight} />
      </div>
    )
  }
}

export default BlogIndex
