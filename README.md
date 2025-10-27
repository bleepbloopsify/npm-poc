# NPM Proof-of-concept

Packages listed in optional dependencies in `package.json` only get installed if their arch matches the arch of the target.

We need to distribute a native package to clients that request it. To make sure the process is seamless, we should use separate npm packages to only distribute native dylibs to those that can use them.

This proof-of-concept demonstrates this workflow.

1. The native libraries must be published as individual npm packages. If you attempt to use `npm link` and local file permissions, the binaries will be distributed regardless of optionality or required architecture, inflating the bundle.
2. We can import them from `esm` land with `await import('npm-package-name')` this is very important, because this means we can try-catch and fallback to a different package.

## Behaviour

1. `localized/` is the proof that publishing an npm package with linked local packages provides all the packages at once. It also proves another issue where a localized package will ignore cpu and arch restrictions. This should probably be reported to npm.
2. The local `package.json` describes a package that is structured similarly to `o1js` (at time of writing). It imports a package that selects a native package that implements an interface, and then `usage/` imports this local `package.json` and prints the exported values. This is the flow we want, probably. We could also just export all the individual native bindings, similarly to `localized/` (without the local links.)
