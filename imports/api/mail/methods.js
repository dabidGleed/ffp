
process.env.MAIL_URL = 'smtp://sterlope:5thDecember@smtp.sendgrid.net:587';

// Raw data
const basicDisclaimer = '<hr><div style="font-size:10px; color:#ccc;"><p class="normal">Future First is the public name for Future First Alumni Ltd., a charity registered in England and Wales, number 1135638.</p><p class="normal">Future First&rsquo;s mission is to see every state secondary school and college supported by a thriving and engaged alumni community which improves students&rsquo; motivation, confidence and life chances.</p><p class="normal">&nbsp;</p><p class="normal"><a href="http://www.futurefirst.org.uk/">www.futurefirst.org.uk </a>&nbsp;| <a href="https://twitter.com/FutureFirstOrg">@FutureFirstOrg</a> | Future First, 66 Hammersmith Road, London, W14 8UD, UK</p><p class="normal">&nbsp;</p><p class="normal">Standard disclaimer: this email and any attachments are confidential and may also be privileged.&nbsp; If you are not the addressee, do not disclose, copy, circulate or in any other way use or rely on the information contained in this email or any attachments.&nbsp; If received in error, notify the sender immediately and delete this email and any attachments from your system.&nbsp; Emails cannot be guaranteed to be secure or error free as the message and any attachments could be intercepted, corrupted, lost, delayed, incomplete or amended.&nbsp; Future First does not accept legal responsibility for the contents of this message or liability for damage caused by this email or any attachments. Any views or opinions presented are only those of the author and not those of Future First.</p></div>'


// Methods
const sendMail = (mailData) => {
  for(i=0; i< mailData.mail.length; i++) {
    let str = mailData.message;
    str = str.split('{first_name}').join(mailData.mail[i].name);
    Email.send({
      from: mailData.from,
      to: mailData.mail[i].email,
      subject: mailData.subject,
      html: str + basicDisclaimer
    });
  };
};

// Publish
Meteor.methods({
  sendMail,
});
