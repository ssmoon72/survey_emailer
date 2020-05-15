const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class Mailer extends helper.Mail {
   constructor({ subject, recipients }, content) {
       //constructor is the first function called when using the 'new' keyword
        super();

        this.sgApi = sendgrid(keys.sendGridKey);
        //sendgrid property. who this email appears to be from
        this.from_email = new helper.Email('sam@tagsmoon.com');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        //array of helper objects made by formatAddresses
        this.recipients = this.formatAddresses(recipients);
        
        //add content is a builtin helper function from the Mail class
        this.addContent(this.body);

        //helper functions that we've defined
        this.addClickTracking();
        this.addRecipients();
   } 
   //takes array of address objects and turns them into sendGrid helper objects
   formatAddresses(recipients) {
       return recipients.map(({email}) => {
            return new helper.Email(email);
       });
   }
   //send grid click tracking setup
   addClickTracking(){
       const trackingSettings = new helper.TrackingSettings();
       const clickTracking = new helper.ClickTracking(true, true);

       trackingSettings.setClickTracking(clickTracking);
       this.addTrackingSettings(trackingSettings);
   }
   //takes formatted list from this.recipients and registers them with actual email
   addRecipients() {
        const personalize = new helper.Personalization();
        //iterate over list of recipients and for each recipient, add to personalize object
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        });
        //mail base class function, add entire personalize object
        this.addPersonalization(personalize);
   }

   //any time we make an api call/network request, async await
   async send() {
       const request = this.sgApi.emptyRequest({
           method: 'POST',
           path: '/v3/mail/send',
           body: this.toJSON()
       });

       const response = await this.sgApi.API(request);
       return response;
   }

}

module.exports = Mailer; 