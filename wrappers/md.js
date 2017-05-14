// @flow
import url from 'url'
import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import Helmet from 'react-helmet'
import { rhythm } from 'utils/typography'
import { config } from 'config'
import striptags from 'striptags'
import Bio from 'components/Bio'
import ReadNext from 'components/ReadNext'

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
    const description =
      striptags(post.body).replace(/\r?\n/g, '').slice(0, 120) + '...'

    return (
      <div className="markdown">
        <Helmet
          title={title}
          meta={[
            { name: 'description', content: description },
            { property: 'fb:add_id', content: '1675789832727941' },
            { property: 'og:title', content: post.title },
            { property: 'og:type', content: 'blog' },
            { property: 'og:url', content: postUrl },
            { property: 'og:image', content: post.image || config.ogImage },
            { property: 'og:description', content: description },
            { name: 'twitter:card', content: 'summary' },
            { name: 'twitter:site', content: '@akameco' },
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
        <hr />
        <ReadNext post={post} pages={route.pages} />
        <Bio />
      </div>
    )
  }
}

export default MarkdownWrapper
