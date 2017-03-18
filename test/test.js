'use strict'
let unzip = require('../')
let test = require('ava')
let { join } = require('path')
let fs = require('fs-extra-promise')

test(async t => {
  let items = ['README.md', 'package.json']
  let pack = join(__dirname, '归档.zip')
  let dest = join(__dirname, '归档_dest')
  await t2p(cb => {
    unzip(pack, dest, cb)
  })
  let files =  await fs.readdirAsync(dest)
  t.deepEqual(files, items)
  await fs.removeAsync(dest)
})

function t2p (thunk) {
  return new Promise((rs, rj) => {
    thunk((err, ...args) => {
      err ? rj(err) : rs(args)
    })
  })
}
