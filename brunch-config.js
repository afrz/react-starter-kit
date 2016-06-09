module.exports = {
  config: {
    files: {
      javascripts: {
        joinTo: {
          'build/lib.js': /^(vendor|bower_components|node_modules)/,
          'build/app.js': /^app/
        }
      },
      stylesheets: {
        joinTo: {
          'build/lib.css': /^(vendor|bower_components|node_modules)/,
          'build/app.css': /^app/
        }
      },
      templates: {
        joinTo: 'build/app.js'
      }
    },
    npm: {
      globals: {
        '$': 'jquery',
        'jQuery': 'jquery'
      }
    },
    plugins: {
      babel: {
        presets: ['es2015', 'react'],
        ignore: /^(bower_components|vendor|node_modules)/,
        pattern: /\.js(x?)$/
      },
      sass: {
        //need for boostrap pixel rendering
        precision: 8
      }
    }
  }
};
