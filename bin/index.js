#!/usr/bin/env node

const { getCode } = require("country-list");
const axios = require("axios");
let dayjs = require("dayjs");

let year = process.argv[3];
let country = process.argv[2];

if (typeof year === "undefined") {
  year = new Date().getFullYear();
}

if (typeof country != "undefined") {
  let countryCode = getCode(country);
  if (countryCode != undefined) {
    axios
      .get(`https://date.nager.at/api/v2/publicholidays/${year}/${countryCode}`)
      .then(response => {
        response.data.forEach(element => {
          let date = dayjs(element.date).format("dddd, DD MMMM YYYY");
          console.log(date + " : " + element.name);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
