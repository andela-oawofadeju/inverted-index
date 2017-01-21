module.exports = function(config) {
  config.set({
    basePath: '../..',
    frameworks: ['jasmine'],
    //...
    files: ['src/inverted-index.js',
      'spec/inverted-index-test.js'
    ],

    browsers: ['chrome', 'mozilla-firefox']
  });
};
