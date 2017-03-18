# cross-unzip

<a href="https://www.npmjs.com/package/cross-unzip"><img height="20" src="https://img.shields.io/npm/dm/cross-unzip.svg"></a>&nbsp;&nbsp;<a href="https://github.com/fritx/cross-unzip"><img width="90" height="20" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>&nbsp;&nbsp;<a href="https://github.com/fritx/cross-unzip"><img width="84" height="20" src="https://img.shields.io/badge/license-LGPL-yellow.svg"></a>&nbsp;&nbsp;<a href="https://ci.appveyor.com/project/fritx/cross-unzip/branch/dev"><img height="20" src="https://ci.appveyor.com/api/projects/status/2tly5xnv1243l5jo/branch/dev?svg=true"></a>&nbsp;&nbsp;<a href="https://circleci.com/gh/fritx/cross-unzip/tree/dev"><img height="20" src="https://circleci.com/gh/fritx/cross-unzip/tree/dev.svg?style=svg"></a>

See also: [win-7zip](https://github.com/fritx/win-7zip), [feross/cross-zip](https://github.com/feross/cross-zip)

- [x] Tested on OSX
- [x] Tested on Windows
- [x] Zip compress/decompress
- [ ] Progress feedback

```plain
$ npm install cross-unzip
$ npm install win-7zip  # Windows support
```

```js
let { zip, unzip } = require('cross-unzip')

// extract files
unzip('some/archive.zip', 'some/dir', err => {
  // done
})

// compress files
zip('some/dir', 'some/archive.zip', err => {
  // done
})
```
