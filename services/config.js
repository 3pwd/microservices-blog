module.exports = {
  posts: {
    PORT: 4000,
    ROOT_URL: '/posts'
  },
  comments: {
    PORT: 4001,
    ROOT_URL: '/posts'
  },
  query: {
    PORT: 4002
  },
  moderation: {
    PORT: 4003,
    ROOT_URL: '',
    FORBIDDEN: 'caca'
  },
  'event-bus': {
    PORT: 4005,
    ROOT_URL: '/events'
  }
}
