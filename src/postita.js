let rp = require('request-promise');
require("babel/polyfill");

exports.version = require('../package').version;

/**
* Postita.fi class for utilize their API.
* Test that you can login to postita.fi web interface with the same credentials and reset the password if needed. Check the code examples and contact our support (info@postita.fi) if problem persists.
*
* @class Postita
* @constructor
* @param {String} user Your postita.fi username
* @param {String} pass Your postita.fi password
* @example
* ```
* // ES6 example
* let PostitaLib = require('postita')
* let fs = require('fs')
* 
* // Init
* let postita = new PostitaLib('myuser','mypass123')
* 
* // Send the file
* let myPdf = fs.readFileSync('mypdf.pdf')
* 
* postita.send('my-test-job-name', myPdf)
*   .then(r => console.log('PDF sent successfully'))
*   .catch(r => console.log(`PDF sending failed: ${r}`))
* ```
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
  * Send is used to transmit PDF files to be printed and mailed through our service. Jobs sent through API are set automatically to ‘Confirmed’ status and will be sent automatically. Funds will be automatically reserved from user’s account when send is called, and they will be charged when the job is processed unless the job is cancelled before that.
  * Note: All PDF files sent through this API call MUST contain address details already within them. The API has a separate call, send_with_address, that will add a cover page with a given address to the job.
  * It is possible to receive monthly reports from our service that contain details about the customer’s use of our service. Some of our users (account agencies for example) want to resell our services to their clients and thus need multiple different reports. The argument report_group_id exists to accommodate this need. It is not normally required, but if you’re interested in this kind of functionality don’t hesitate to contact us.
  *
  * @method send
  * @param {String} job_name The name of the job
  * @param {Buffer} finvoicehe Finvoice XML file to be processed, encoded with urlsafe Base644 encoding.
  * @param {Object} optional Optional parameters
  * @param {Buffer} optional.invoice_pdf (optional) PDF version of the invoice. If invoice_pdf argument is not provided Postita will generate a PDF invoice from FinvoiceXML data. FinvoiceXML cannot include multpile invoices if ‘invoice_pdf’ argument is used.
  * @param {Number} optional.confirm (optional) Job is confirmed automatically as default. Job is not automatically confirmed if string value “False” is provided as value.
  * @return {Object} Returns Promise
  */
  send_finvoice(job_name, finvoice, optional = {}) {    
    
    let options = {
      uri : this.apiUrl + "send_finvoice",
      method : 'POST'
    };
    let form = { formData: { "job_name": job_name, "finvoice": pdf.toString('base64') } }

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
  * confirm Conrfirms job to be sended at 11 o’clock next working day. Works on only for unconfirmed jobs (Postita API status code == NE).
  *
  * @method confirm
  * @param {Number} job_id The id of the job to be confirmed. Value ‘all’ as job_id confirms all your mail.
  * @return {Object} Returns JSON object.
  *
  * Error codes:
  * 
  * ```
  * 400: Bad Request – The job is not in new / unconfirmed state.
  * 401: Unauthorized – Authentication failed.
  * ```
  * 
  * Example return:
  * ```
  *   [
  *     {
  *       "status": "CO",
  *       "name": "An example letter",
  *       "created": "14.05.2008 12:54:01",
  *       "price": "26.60",
  *       "total_pages": 270,
  *       "is_massmail": true,
  *       "recipient_count": 10
  *     }
  *   ]
  * ```
  */
  confirm(job_id) {
    let options = {
      uri : `${this.apiUrl}account_info/${job_id}`,
      method : 'GET'
    };
    Object.assign(options, this.auth)

    return rp(options)
  }

  /**
  * delete removes a job from the job queue. This will completely remove the job and the associated PDF file from our servers. Delete only works if the job is still waiting to be processed.
  *
  * @method delete
  * @param {Number} job_id The id of the job to be deleted.
  * @return {Object} Returns JSON object.
  * 
  * Error codes:
  * ```
  * 400: Bad Request – The job is not in new / unconfirmed state.
  * 401: Unauthorized – Authentication failed.
  * ```
  */
  delete(job_id) {
    let options = {
      uri : `${this.apiUrl}delete/${job_id}`,
      method : 'GET'
    };
    Object.assign(options, this.auth)

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

  /**
  * job_info can be used to query the status of an individual job.
  *
  * @method job_info
  * @param {Number} job_id The id of the job to be queried.
  * @return {Object} Returns JSON object.
  *
  * Error codes:
  * 
  * ```
  * 401: Unauthorized – Authentication failed.
  * 404: Not Found – The job was not found.
  * ```
  * 
  * Example response:
  * 
  * ```
  *  {
  *    "status": "NE",
  *    "name": "An example letter",
  *    "created": "14.05.2008 12:54:01",
  *    "price": "26.60",
  *    "total_pages": 270,
  *    "is_massmail": true,
  *    "recipient_count": 10
  *  }
  * ```
  */
  job_info(job_id) {
    let options = {
      uri : `${this.apiUrl}job_info/${job_id}`,
      method : 'GET'
    };
    Object.assign(options, this.auth)

    return rp(options)
  }

  /**
  * job_list will return a list of all jobs associated with the querying user. It is possible to filter the returned jobs by specifying a date for the query with the optional created_mindate argument in the ‘DD.MM.YYYY’ format or specifying the status of the job as argument. Returns the same data as job_info inside a list.
  *
  * @method job_list
  * @param filter Filter can be either JavaScript Date Object or status code. When using date the method will return all jobs created after a date. If using status code it retuns jobs with statuscode. Accepted values DR, NE, CO, CA, PR, SE. See Postita API status codes.
  * @return {Object} Returns JSON object.
  *
  * Error codes:
  * 
  * ```
  * 400 Bad Request – Unrecognized format used in send_mindate argument.
  * 401: Unauthorized – Authentication failed.
  * ```
  * 
  * Example response:
  * 
  * ```
  * [
  *     {
  *         "status": "SE"
  *         "price": "0.59"
  *         "total_pages": 1
  *         "recipient_count": 1
  *         "is_massmail": false
  *         "id": 673368
  *         "vat_price": "0.73"
  *         "name": "Testipostitus (verkkolasku)"
  *         "created": "19.09.2011 14:22:30"
  *         "pdf_splitter": ""
  *         "special_set": ""
  *         "is_einvoice": true
  *         "sent": "19.09.2011 14:25:27"
  *     },
  *     {
  *         "price": "9.79"
  *         "status": "DR"
  *         "name": "Testimassapostitus (luonnos)"
  *         "is_einvoice": false
  *         "created": "15.10.2009 12:19:07"
  *         "pdf_splitter": ""
  *         "special_set": ""
  *         "recipient_count": 11
  *         "total_pages": 11
  *         "id": 135140
  *         "vat_price": "12.04"
  *         "is_massmail": true
  *     }
  * ]
  * ```
  */
  job_list(filter) {
    
    let myFilter = filter
    if(filter instanceof Date) {
      myFilter = this.formatDate(myFilter)
    }
    let options = {
      uri : `${this.apiUrl}job_info/${myFilter}`,
      method : 'GET'
    };
    Object.assign(options, this.auth)

    return rp(options)
  }

  /**
  * job_pdf can be used to fetch the original PDF file of a job.
  *
  * @method job_pdf
  * @param {Number} job_id The id of the job to be fetched.
  * @return {Object} Returns JSON object.
  * 
  * Error codes:
  * ```
  * 401: Unauthorized – Authentication failed.
  * 404: Not Found – The job was not found.
  * ```
  */
  job_pdf(job_id) {
    let options = {
      uri : `${this.apiUrl}job_pdf/${job_id}`,
      method : 'GET'
    };
    Object.assign(options, this.auth)

    return rp(options)
  }


  // Helper method
  formatDate(date) {
      var month = '' + (date.getMonth() + 1),
          day = '' + date.getDate(),
          year = date.getFullYear();

      if (month.length < 2) month = '0' + month;
      if (day.length < 2) day = '0' + day;

      return [day, month, year].join('.');
  }
}