'use strict'
const unzip = require('./')

unzip('归档.zip', './abc', (err) => {
  console.error(err)
})

unzip.zip('归档1.zip', './abc', (err) => {
  console.error(err)
})

