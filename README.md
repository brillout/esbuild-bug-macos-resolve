Run `node build.js` and most users should get:

```
========================
======= RESULT =========
========================
SUCCESS
```

But some macOS users (only some macOS users, not all of them) get this error instead:

```
========================
======= RESULT =========
========================
FAILURE:
Error: Build failed with 1 error:
src/index.js:1:22: ERROR: [plugin: vike-url-resolver] Could not resolve "vike-react/config"
    at failureErrorWithLog (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:1476:15)
    at /home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:945:25
    at runOnEndCallbacks (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:1316:45)
    at buildResponseToResult (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:943:7)
    at /home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:970:16
    at responseCallbacks.<computed> (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:622:9)
    at handleIncomingPacket (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:677:12)
    at Socket.readFromStdout (/home/rom/tmp/esbuild-playground/node_modules/.pnpm/esbuild@0.24.0/node_modules/esbuild/lib/main.js:600:7)
    at Socket.emit (node:events:518:28)
    at addChunk (node:internal/streams/readable:559:12) {
  errors: [Getter/Setter],
  warnings: [Getter/Setter]
}
```

It seems like esbuild fails to resolve `vike-react/config` for these macOS users.

Note that `require.resolve('vike-react/config')` works just fine for these macOS users. So it seems to be a bug on esbuild's side.

Original issue: [vikejs/vike#1729](https://github.com/vikejs/vike/issues/1729).
