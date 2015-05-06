<img src="https://postita.fi/static/postita/images/newintro/postita_web_postitalogo.png"><br/>

**Postita.fi unofficial Node.js library.** The library enables Postita.fi users to automate their use of the services, such as sending mail and electronic invoices through Postita.fi. It also allows users to query their job queue status, status of individual jobs and account status.

To send mail through Postita.fi, users canp simply upload a PDF file to the service. Postita.fi then prints the PDF file on A4 sized paper in black and white or in color, put it into a big-windowed C5 or C4 envelope and send it.

##Features
* Supports all [Postita.fi REST API features](https://postita.fi/blog/fi/postita-http-api/).
* Promise based

##API documentation
Full library API documentation at: [http://tpisto.github.io/postita](http://tpisto.github.io/postita)

##Examples
ES6 syntax. You can use [Babel](https://babeljs.io/) to already run ES6 syntax JS if your Node.js version doesn't support it yet.
 
```javascript
let PostitaLib = require('postita')
let fs = require('fs')

// Init
let postita = new PostitaLib('my_user_name','my_password')
let myPdf = fs.readFileSync('my_pdf.pdf')

// It is very simple to send the PDF
postita.send('my_job_name', myPdf)
  .then(r => console.log('PDF sent successfully'))
  .catch(r => console.log(`PDF sending failed: ${r}`))

// This is how you can check your balance, etc.
postita.account_info()
  .then(r => console.log(r))
  .catch(r => console.log(r))
```

##Installation
```
$ npm install postita
```  

##Authors
- [Tommi Pisto](https://github.com/tpisto)

## License
ISC