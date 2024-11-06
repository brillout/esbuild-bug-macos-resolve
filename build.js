import esbuild from "esbuild";

build();

async function build() {
  console.log('=======================');
  console.log('======= DEBUG =========');
  console.log('=======================');

  const buildPromise = esbuild.build({
    entryPoints: ["./src/index.js"],
    platform: "node",
    sourcemap: false,
    write: false,
    // target: ["node14.18", "node16"],
    outfile: "NEVER_EMITTED.js",
    // logLevel: "silent",
    format: "esm",
    bundle: true,
    minify: false,
    plugins: [{
      name: 'vike-url-resolver',
      setup(build) {
        build.onResolve({filter: /.*/}, async (args) => {
          console.log('onResolve() args:', JSON.stringify(args, null, 2));
          if (args.pluginData?.useEsbuildResolve) return
          console.log();
          const {path, ...opts} = args
          opts.pluginData = {useEsbuildResolve: true}
          const resolved = await build.resolve(path, opts)
          console.log('onResolve() resolved:', JSON.stringify(resolved, null, 2))
          return resolved
        })
      }
    }]
  });

  const logResult = () => {
    console.log('========================');
    console.log('======= RESULT =========');
    console.log('========================');
  }

  try {
    const result = await buildPromise
    logResult()
    console.log('SUCCESS');
    // const {text} = result.outputFiles[0]
  } catch (err) {
    logResult()
    console.log('FAILURE:')
    console.log(err)
  }

}
