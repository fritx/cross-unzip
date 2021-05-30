'use strict'
const {spawn} = require('child_process')
const {relative, basename, dirname} = require('path')
const {slice} = Array.prototype
const _7z = require('win-7zip')['7z']
const isWin = process.platform === 'win32'

// todo: progress feedback

function zip(src, pack, callback) {
  if (isWin) {
    // eg. 7z a -tzip archive.zip ./archive
    run(_7z, ['a', '-tzip', pack, src], callback)
  } else {
    // inspired by cross-zip
    // https://github.com/feross/cross-zip/blob/abf9908a259988657c773ea111f83dfcece2ff5f/index.js#L80-L82
    var cwd = dirname(src)
    var file = basename(src)
    run('zip', ['-r', '-y', pack, file], {
      cwd
    }, callback)
  }
}

function unzip(pack, dest, callback) {
  if (isWin) {
    // eg. 7z x archive.zip -oc:\Doc
    run(_7z, ['x', pack, '-y', '-o' + dest], callback)
  } else {
    run('unzip', ['-o', pack, '-d', dest], callback)
  }
}

// https://nodejs.org/api/child_process.html#child_process_event_error
// Note that the 'exit' event may or may not fire after an error has occurred.
// If you are listening to both the 'exit' and 'error' events,
// it is important to guard against accidentally invoking handler functions multiple times.
function run(bin, args, opts, callback) {
  if (!callback) {
    callback = opts
    opts = null
  }
  opts = Object.assign({}, opts, {
    stdio: 'ignore'
  })
  callback = onceify(callback)
  
  var prc = spawn(bin, args, opts)
  prc.on('error', function (err) {
    callback(err)
  })
  prc.on('exit', function (code) {
    callback(code ? new Error('Exited with code ' + code) : null)
  })
}

// http://stackoverflow.com/questions/30234908/javascript-v8-optimisation-and-leaking-arguments
// javascript V8 optimisation and “leaking arguments”
// making callback to be invoked only once
function onceify(fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    fn.apply(this, slice.call(arguments)) // slice arguments
  }
}

unzip = {...unzip, isWin, unzip, zip}
module.exports = unzip
