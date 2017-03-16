'use strict'
var spawn = require('child_process').spawn
var slice = Array.prototype.slice
var isWin = process.platform === 'win32'

// todo: progress feedback

function zip(outPath, inPath, callback) {
  if(isWin) {
    var _7z = require('win-7zip')['7z']
    // eg. 7z a -tzip archive.zip ./archive
    run(_7z, ['a', '-tzip', outPath, inPath], callback)
  } else {
    run('zip', ['-r', '-q', outPath, inPath], callback)
  }
}

function unzip(outPath, inPath, callback) {
  if(isWin) {
    var _7z = require('win-7zip')['7z']
    // 确实奇葩
    // eg. 7z x archive.zip -oc:\Doc
    run(_7z, ['x', inPath, '-y', '-o' + outPath], callback)
  } else {
    run('unzip', ['-o', inPath, '-d', outPath], callback)
  }
}

// https://nodejs.org/api/child_process.html#child_process_event_error
// Note that the 'exit' event may or may not fire after an error has occurred.
// If you are listening to both the 'exit' and 'error' events,
// it is important to guard against accidentally invoking handler functions multiple times.
function run (bin, args, callback) {
  callback = onceify(callback)
  var prc = spawn(bin, args, {
    stdio: 'ignore'
  })
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
function onceify (fn) {
  var called = false
  return function () {
    if (called) return
    called = true
    fn.apply(this, slice.call(arguments)) // slice arguments
  }
}


unzip.unzip = unzip
unzip.zip = zip
module.exports = unzip
