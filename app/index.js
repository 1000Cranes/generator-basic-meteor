'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.packages = [
      'standard-app-packages', 'twbs:bootstrap'
    ];
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the incredible ' + chalk.red('SuperMeteor') + ' generator!'
    ));

    var prompts = [{
     type: 'input',
     name: 'catchyPhrase',
     message: 'Tell me a catchy phrase you have recently heard?',
     default: 'The grass is always greener ...'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: {
    meteor: function () {
      this.fs.copy(
        this.templatePath('.meteor/release'),
        this.destinationPath('.meteor/release')
      );
    },

    clientfiles: function () {
      this.fs.copyTpl(
        this.templatePath('client/index.html'),
        this.destinationPath('client/index.html'),
        { catchyPhrase: this.props.catchyPhrase }
      );
      this.fs.copy(
        this.templatePath('client/app.js'),
        this.destinationPath('client/app.js')
      );
      this.fs.copy(
        this.templatePath('client/style.css'),
        this.destinationPath('client/style.css')
      );
    },
    
    serverfiles: function() {
      this.fs.copy(
        this.templatePath('server/app.js'),
        this.destinationPath('server/app.js')
      );
    }
  },

  install: function () {
    this.write('.meteor/packages', this.packages.join('\n'));
    this.spawnCommand('meteor', ['update']);
  }
});
