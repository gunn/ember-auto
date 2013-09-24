module.exports = {
  options: {
    filepathTransform: function(filepath) {
      filepath.replace('ember-auto', 'ember-auto/lib');
      return 'packages/' + filepath.replace('ember-auto', 'ember-auto/lib');
    }
  },
  'dist/ember-auto.js': 'packages/ember-auto/lib/main.js'
};
