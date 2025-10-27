# NPM Proof-of-concept

Packages listed in optional dependencies in `package.json` only get installed if their arch matches the arch of the target.

We need to distribute a native package to clients that request it. To make sure the process is seamless, we should use separate npm packages to only distribute native dylibs to those that can use them.

This proof-of-concept demonstrates this workflow.

1. The native libraries must be published as individual npm packages. If you attempt to use `npm link` and local file permissions, the binaries will be distributed regardless of optionality or required architecture, inflating the bundle.
2. We can import them from `esm` land with `await import('npm-package-name')` this is very important, because this means we can try-catch and fallback to a different package.
