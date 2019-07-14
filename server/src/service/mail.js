import nodemailer from 'nodemailer';
import smtpTransport from 'nodemailer-smtp-transport';

const sampleOptions = {
  from: 'committrs.io <soonoo@committrs.io>',
  to: 'qpseh2m7@gmail.com',
  subject: 'Your profile page has been updated!',
  html: `
    <p>Hi, this is soonoo from committrs.io</p>
    <p>Your <a href='https://committrs.io/soonoo'>profile page</a> has been updated. Please come and check!</p>
  `,
};

class MailClient {
  constructor() {
    this.optionsList = {
      'UPDATED': {
        subject: 'Your profile page has been updated!',
        body: (username) => `
        <p>Hi ${username}, this is soonoo from committrs.io</p>
        <p>Your <a href='https://committrs.io/${username}'>profile page</a> has been updated. Please come and check!</p>
      `,
      }
    }

    this.transporter = nodemailer.createTransport(smtpTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAIL_CLIENT_USER,
        pass: process.env.MAIL_CLIENT_PASSWORD,
      }
    }));
  }

  update(username, to) {
    const { subject, body } = this.optionsList['UPDATED'];

    return this.send({
      to,
      subject,
      html: body(username),
    });
  }

  send(options) {
    if(options.to !== 'qpseh2m7@gmail.com') return;

    options.from = options.from || 'committrs.io <soonoo@committrs.io>'

    return new Promise((resolve, rejet) => {
      this.transporter.sendMail(options, function(error, info){
        if (error) {
          reject(error)
        } else {
          resolve(info.response)
        }
      });
    });
  }
};

export default new MailClient();

