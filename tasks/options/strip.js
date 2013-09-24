module.exports = {
  production : {
    src : 'dist/ember-auto.prod.js',
    options : {
      inline: true,
      nodes : ['Ember.assert']
    }
  }
};
