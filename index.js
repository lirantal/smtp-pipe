#!/usr/bin/env node
'use strict';

var smtp = require('simplesmtp');
var util = require('util');
var chalk = require('chalk');
var MailParser = require('mailparser').MailParser;
var mailparser = new MailParser();

var config = {
	smtp: {
		host: 'localhost',
		port: 25
	},
	debug: true
};

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function (text) {
  if (config.debug)
  	console.log(chalk.red('DEBUG: received data:', util.inspect(text)));

  mailparser.write(text);
});

process.stdin.on('end', function() {
	mailparser.end();
});

mailparser.on('end', function(mail) {
	if (config.debug) {
		console.log(chalk.red('DEBUG: created the mail envelope:'));
		// object structure for parsed e-mail
		console.log(chalk.red(JSON.stringify(mail)));
	}

	var smtpClient = smtp.connect(config.smtp.port, config.smtp.host);
	smtpClient.once('idle', function() {
	    smtpClient.useEnvelope(mail.headers);
	});

	smtpClient.on("message", function() {
		smtpClient.write(mail.text);
		smtpClient.end();
	});

	smtpClient.on("ready", function() {
		smtpClient.close();
	});

	smtpClient.on("error", function(err) {
		console.log(chalk.red("smtpclient error:"));
		console.log(chalk.red(err));
	});
});