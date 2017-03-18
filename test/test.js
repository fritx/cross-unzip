'use strict'
let { zip, unzip, isWin } = require('../')
let test = require('ava')
let fs = require('fs-extra-promise')
let { join, basename } = require('path')

let src = __dirname
let pack = join(__dirname, '归档.zip')
let dest = join(__dirname, '归档_dest')

test('module exports', t => {
  t.is(typeof unzip, 'function')
  t.is(typeof unzip.zip, 'function')
  t.is(unzip.unzip, unzip)
})

test('zip compress', async t => {
  // compress
  await t2p(cb => {
    zip(src, pack, cb)
  })
  // verify
  let exists = await fs.existsAsync(pack)
  t.true(exists)
})

test('zip decompress', async t => {
  // weird, windows compression needs some extra time to complete
  // code 2 is exited by 7z if you decompress it immediately
  if (isWin) {
    await delay(10)
  }

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
  await fs.removeAsync(dest)
  await fs.removeAsync(pack)
})

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
