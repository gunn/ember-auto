module.exports = {
  options: {
    nospawn: true,
  },
  code: {
    files: ['packages/ember-auto/lib/**/*.js'],
    tasks: ['jshint:development', 'neuter'],
  },
  test: {
    files: ['packages/ember-auto/tests/**/*.js'],
    tasks: ['jshint:development', 'build_test_runner_file'],
  }
};
