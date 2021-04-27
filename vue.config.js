module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: process.env.NODE_ENV === 'production'
    ? '/REPO_NAME'
    : '/'
}
