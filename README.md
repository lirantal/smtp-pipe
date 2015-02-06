# smtp-pipe
Pipe any mail envelope input and output forward as SMTP client

smtp-pipe is an smtp-aware node app that works like the GNU/Linux tee command - it accepts an smtp envelope as an input to STDIN and forwards it to an email server through SMTP.

## Install
```bash
  npm install -g smtp-pipe
```

## Usage
Example of usage scenario where you would pipe an e-mail message (envelope) as an input stream to smtp-pipe:
```bash
  cat email-message.txt | smtp-pipe
```
Another common usage example is configure PHP to send all e-mails that are sent with the internal mail() function to smtp-pipe and then you can configure smtp-pipe to send it to whichever smtp server you wish:
```
  # edit your php.ini file, commonly at /etc/php.ini for RHEL-based distros, or /etc/php5/apache2/php.ini for Ubuntu's LAMP installs
  # update the sendmail_path php variable to point to smtp-pipe as follows:
  sendmail_path = /usr/bin/node smtp-pipe
```
* If you're updating the php.ini file for PHP's CLI then you might need to re-start your command line daemon to re-read the configuration. If it's the web php.ini config file you changed then it might need an apache restart as you might be using byte code caching like apc, for the new setting to take effect.


## Author
Liran Tal <liran.tal@gmail.com>, blogging at http://www.enginx.com
