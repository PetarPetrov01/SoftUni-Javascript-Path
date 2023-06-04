function extractMails(input) {
    let regEx = /(^|(?<=\s))(([a-zA-Z0-9]+)([\.\-_]?)([A-Za-z0-9]+)(@)([a-zA-Z]+([\.\-][A-Za-z]+)+))(\b|(?=\s))/g
    let match = input.match(regEx).forEach((a)=>console.log(a)) 
}
extractMails('Just send email to s.miller@mit.edu and j.hopking@york.ac.uk for more information.')
