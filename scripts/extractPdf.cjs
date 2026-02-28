const fs = require('fs');
const path = require('path');
const { PDFParse } = require('pdf-parse');

const pdfPath = path.join(__dirname, '..', 'public', 'resume.pdf');
const dataBuffer = fs.readFileSync(pdfPath);

const parser = new PDFParse();
parser.parse(dataBuffer).then(data => {
    console.log(data.text);
});
