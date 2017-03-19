'use strict'
let { zip, unzip } = require('../')
let test = require('ava')
let fs = require('fs-extra-promise')
let { join, basename } = require('path')

let src = __dirname
let pack = join(__dirname, '归档.zip')
let pack_tmp = join(__dirname, '归档.zip.tmp')
let dest = join(__dirname, '归档_dest')

test.serial('module exports', t => {
  t.is(typeof unzip, 'function')
  t.is(typeof unzip.zip, 'function')
  t.is(unzip.unzip, unzip)
})

test.serial('zip compress', async t => {
  // compress
  await t2p(cb => {
    zip(src, pack, cb)
  })
  // verify
  let exists = await fs.existsAsync(pack)
  t.true(exists)
})

test.serial('zip decompress', async t => {
  // decompress
  await t2p(cb => {
    unzip(pack, dest, cb)
  })
  // verify
  let files = await fs.readdirAsync(dest)
  let expected = [basename(src)]
  t.deepEqual(files, expected)
})

test.after('cleanup', async t => {
  await remove(dest)
  await remove(pack)
  await remove(pack_tmp)
})

// util: remove file if exists
async function remove (file) {
  if (await fs.existsAsync(file)) {
    await fs.removeAsync(file)
  }
}

// util: delay some duration
function delay (duration) {
  return new Promise(rs => {
    setTimeout(rs, duration)
  })
}

// util: thunk to promise
function t2p (thunk) {
  return new Promise((rs, rj) => {
    thunk((err, ...args) => {
      err ? rj(err) : rs(args)
    })
  })
}
