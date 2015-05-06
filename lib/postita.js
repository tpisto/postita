let rp = require('request-promise');
var URLSafeBase64 = require('urlsafe-base64');
exports.version = require('../package').version;

/**
* Postita.fi class for utilize their API
*
* @class Postita
* @constructor
*/
export class Postita {

  constructor(user, pass) {

    this.auth = { 'auth': { 'user': user, 'pass': pass } };
    this.apiUrl = "https://postita.fi/api/";    
  }

  /**
  * Send is used to transmit PDF files to be printed and mailed through our service. Jobs sent through API are set automatically to ‘Confirmed’ status and will be sent automatically. Funds will be automatically reserved from user’s account when send is called, and they will be charged when the job is processed unless the job is cancelled before that.
  * Note: All PDF files sent through this API call MUST contain address details already within them. The API has a separate call, send_with_address, that will add a cover page with a given address to the job.
  * It is possible to receive monthly reports from our service that contain details about the customer’s use of our service. Some of our users (account agencies for example) want to resell our services to their clients and thus need multiple different reports. The argument report_group_id exists to accommodate this need. It is not normally required, but if you’re interested in this kind of functionality don’t hesitate to contact us.
  *
  * @method send
  * @param {String} job_name The name of the job
  * @param {Buffer} pdf Pdf file as Node.js Buffer object (returned from fs.readFile for example)
  * @param {Object} optional Optional parameters
  * @param {String} optional.report_group_id (optional) – The report group id that the job will be associated with.
  * @param {Number} optional.post_class (optional) (int 1-4) – Post class: 1: 1 st. class, 2: 2nd. class, 3: 1st. class color, 4: 2nd. class color
  * @param {Number} optional.pdf_splitter (optional) (int) – PDF-file will be splitted to seperate posts. Argument specifies the number of pages in each post.Example: PDF with 100 pages is sent to API with argument pdf_splitter=4. PDF is splitted to 25 separate posts with 4 pages each. (Original PDF should have an address data in the correct placement every four pages. Address placement instructions.)
  * @return {Object} Returns Promise
  */
  send(job_name, pdf, optional = {}) {    
    
    let options = {
      uri : this.apiUrl + "send",
      method : 'POST'
    };
    let form = { formData: { "job_name": job_name, "pdf": pdf.toString('base64') } }

    Object.assign(form.formData, optional)
    Object.assign(options, this.auth)
    Object.assign(options, form)

    return rp(options)
  }

  /**
  * send_with_address is exactly like send, but with additional arguments for address details. A new blank page will be added to the front of the PDF with the address printed in correct place. This enables our users to easily send material that does not come with address overlaid.
  * 
  * The address arguments can be left empty, but it is always the user’s responsibility to make sure that a full address is included. Our international customers in particular need to make sure that the country line is always filled — Postita.fi is based in Finland and we need to know which country to send the mail to. It is highly recommended to validate these fields beforehand!
  *   
  * @method send_with_address
  * @param {String} job_name The name of the job
  * @param {Buffer} pdf Pdf file as Node.js Buffer object (returned from fs.readFile for example)
  * @param {String} name1 First name line.
  * @param {String} name2 Second name line.
  * @param {String} address1 First address line.
  * @param {String} address2 Second name line.
  * @param {Object} optional Optional parameters
  * @param {String} zipcity Line for zip / postal code and city / municipality.
  * @param {String} country Country line.
  * @param {String} optional.report_group_id (optional) – The report group id that the job will be associated with.
  * @param {Number} optional.post_class (optional) (int 1-4) – Post class: 1: 1 st. class, 2: 2nd. class, 3: 1st. class color, 4: 2nd. class color
  * @param {Number} optional.pdf_splitter (optional) (int) – PDF-file will be splitted to seperate posts. Argument specifies the number of pages in each post.Example: PDF with 100 pages is sent to API with argument pdf_splitter=4. PDF is splitted to 25 separate posts with 4 pages each. (Original PDF should have an address data in the correct placement every four pages. Address placement instructions.)
  * @return {Object} Returns Promise
  */
  send_with_address(job_name, pdf, optional = {}) {    
    
    let options = {
      uri : this.apiUrl + "send_with_address",
      method : 'POST'
    };
    let form = { formData: { "job_name": job_name, "pdf": pdf.toString('base64') } }

    Object.assign(form.formData, optional)
    Object.assign(options, this.auth)
    Object.assign(options, form)

    return rp(options)
  }

  /**
  * account_info can be used to query account balance, possible credit limit and currently available funds. Currently available funds are calculated as balance minus the price of all current queued jobs.
  *
  * @method account_info
  * @return {Object} Returns JSON object of balance, credit_limit, available_funds
  */
  account_info() {
    let options = {
      uri : this.apiUrl + "account_info",
      method : 'GET'
    };
    Object.assign(options, this.auth)

    return rp(options)
  }



}