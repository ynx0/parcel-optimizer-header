# parcel-optimizer-header

This plugin lets you add prepend a static header to every bundle,
as defined in a file called `header.toml` that goes in the root of your project. (Or really anywhere that `config.getConfig` will find it.)


This can be useful for things like licenses or userscript headers,
which normally get stripped out.


## How to use

### Install

Use a direct git URL in your npm deps because I haven't published it to npm. Or you could just ~~clone~~ vendor it and use a `file:` url. Or self-publish it.


### Configure parcel


`.parcelrc`
```json
{
  "extends": "@parcel/config-default",
  "optimizers": {
    "*.js": ["...", "parcel-optimizer-header"]
  }
}
```


## Example Output

Given a `header.toml` that looks like

```toml
# example header file;
# put this in your project directory
header = '''
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-01-01
// @description  try to take over the world!
// @author       You
// @match        https://example.com
// @grant        none
// ==/UserScript==
'''
```

Every bundle will look something like:
```js
// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      2024-01-01
// @description  try to take over the world!
// @author       You
// @match        https://example.com
// @grant        none
// ==/UserScript==
!function(){...
```
