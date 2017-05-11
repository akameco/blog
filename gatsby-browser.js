import ReactGA from 'react-ga'

ReactGA.initialize('UA-99000007-1')

exports.onRouteUpdate = (state, page, pages) => {
  ReactGA.pageview(state.pathname)
}
