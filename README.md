# zasnut

This is the repository for zasnut, an open-source tab suspend extension
for web browsers.

The Kickstarter may be dead, but the extension was completed anyways.

When this extension is installed, tabs will automatically unload around
2 minutes after being de-selected.


## Design goals

  * Pico weight - extremely light, ~20 lines of code.
  * Easy to modify
  * Easy to audit - no minification, no obfuscation, no bullshit.
  * Manifest V3 - this requires Chrome 88 or higher, but is reasonably future proof.
  * Minimal permissions - by design, can not access your browsing history or other data.

## Installation

1. Clone this project
2. In Chrome | Extensions, enable Developer Mode.
3. Click "load unpacked", choose the project folder.

## License

**BSD**

This was designed to be a drop-in library for other extensions - if you are interested
in bundling zasnut with your extension, please pay special attention to the 3rd clause
of the BSD license.

Other licenses may be granted on request.

## Chrome Store

Zasnut is available on the [Chrome Web Store](http://zasnut.xyz) for "Google Trusted Testers" only,
for their convenience.

If you would like access, please establish a human relationship with me. Alternatively,
you can sponsor the project by clicking the ❤️  button above and I will add you to the list.

