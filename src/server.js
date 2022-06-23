const axios = require("axios")
const cheeiro = require("cheerio")
const express = require("express");
const fs  = require("fs");

const PORT = process.env.PORT || 8000;

const app = express();

axios('https://lista.mercadolivre.com.br/teclado-mecanico#D[A:teclado%20mecanico').then(res => {
  const htmlData = res.data;
  const $ = cheeiro.load(htmlData);
  const links = []

  $('.ui-search-result__wrapper', htmlData).each((index, element) => {
    const linkUrl = $(element).find('.ui-search-link').attr('href')
    links.push({
      link: linkUrl
    })
  })
  console.log(links)
  fs.writeFileSync('data.txt', JSON.stringify(links), 'utf8', (err) => {
    if(err) {
      console.log("Deu merda")
    }
    else {
      console.log("Deu bom dog")
    }
  })
}).catch(err => console.log(err))


app.listen(PORT, () => console.log(`Server is running to port ${PORT}`))
