# cross-unzip

<a href="https://www.npmjs.com/package/cross-unzip"><img width="134" height="20" src="https://img.shields.io/npm/dm/cross-unzip.svg"></a>&nbsp;&nbsp;<a href="https://github.com/fritx/cross-unzip"><img width="90" height="20" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" /></a>&nbsp;&nbsp;<a href="https://github.com/fritx/cross-unzip"><img width="84" height="20" src="https://img.shields.io/badge/license-LGPL-yellow.svg"></a>

See also: [win-7zip](https://github.com/fritx/win-7zip), [feross/cross-zip](https://github.com/feross/cross-zip)

- [x] Tested on OSX
- [x] Tested on Windows
- [ ] Progress feedback

```plain
$ npm install cross-unzip
$ npm install win-7zip  # Windows support
```

```js
const unzip = require('cross-unzip')

// extract files
unzip('some/archive.zip', 'some/dir', (err) => {
  // done
})

// compress files
unzip.zip('some/archive.zip', 'some/archive', (err) => {
  // done
})
```
