// @flow
import url from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Helmet from 'react-helmet'
import ReadNext from '../components/ReadNext'
import { rhythm } from 'utils/typography'
import { config } from 'config'
import Bio from 'components/Bio'

import '../css/zenburn.css'

class MarkdownWrapper extends React.Component {
  static PropTypes = {
    route: PropTypes.object,
  }

  render() {
    const { route } = this.props
    const post = route.page.data

    const title = `${post.title} | ${config.blogTitle}`
    const postUrl = url.resolve(config.siteUrl, route.path)

    return (
      <div className="markdown">
        <Helmet
          title={title}
          meta={[
            { property: 'og:title', content: title },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: postUrl },
            { property: 'og:image', content: post.image || config.ogImage },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@akameco' },
            { name: 'twitter:title', content: title },
            { name: 'twitter:description', content: 'akameco blog' },
          ]}
        />
        <h2 style={{ marginTop: 0 }}>{post.title}</h2>
        <div dangerouslySetInnerHTML={{ __html: post.body }} />
        <em
          style={{
            display: 'block',
            marginBottom: rhythm(2),
          }}
        >
          Posted {moment(post.date).format('MMMM D, YYYY')}
        </em>
        <hr
          style={{
            marginBottom: rhythm(2),
          }}
        />
        <ReadNext post={post} pages={route.pages} />
        <Bio />
      </div>
    )
  }
}

export default MarkdownWrapper
