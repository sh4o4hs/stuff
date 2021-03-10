import fs from 'fs';
import path from 'path';
import jsyaml from 'js-yaml';

import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import yaml from '@rollup/plugin-yaml';
import resolve from '@rollup/plugin-node-resolve';
// import typescript from '@rollup/plugin-typescript';
import sucrase from '@rollup/plugin-sucrase';

import postcss from 'rollup-plugin-postcss';
import globals from 'rollup-plugin-node-globals';
import builtins from 'rollup-plugin-node-builtins';
import {terser} from 'rollup-plugin-terser';

let drop_console = false;
if(process.env.DROP_CONSOLE === 'true') {
  drop_console = true;
}

let filename;
if(process.env.WORKSPACE) {
  filename = path.resolve(process.env.WORKSPACE + '/content.config.yml');
} else {
  filename = path.resolve(__dirname + '/content.config.yml');
}
console.log(`filename : ${filename}`);
let content = jsyaml.load(fs.readFileSync(filename, 'utf8'));

//------------------------
if(process.env.WORKSPACE) {
  filename = path.resolve(process.env.WORKSPACE + '/system.set.yml');
} else {
  filename = path.resolve(__dirname + '/system.set.yml');
}
let set = jsyaml.load(fs.readFileSync(filename, 'utf8'));
let config = set.config;
let external = set.build.externals;

let workspace = {
  basePath: 'project',
  root: null,
  current:null,
  output:null,
  input: (set.package && set.package.main) || 'src/main.js'
};
if(content.group && content.name) {
  workspace.root = workspace.basePath + '/' + content.group + '/' + content.name;
  workspace.current = content.group + '/' + content.name;
  workspace.output = content.group + '.' + content.name;
  
} else if(content.name) {
  workspace.root = workspace.basePath + '/' + content.name;
  workspace.current = content.name;
  workspace.output = content.name;
}

const customResolver = resolve({
  extensions: ['.ts', '.js', '.yml', '.json', '.css']
});
let paths = {
  customResolver,
  entries: {}
};
let keys = Object.keys(config.paths);
console.log(`keys list`);

let entries = paths.entries;
keys.forEach(key => {
  let name = key;
  let n = key.lastIndexOf('/');
  if(n >= 0) {
    name = key.slice(0, n);
  }
  let dirname = config.paths[key];
  if(dirname[0] !== '/') {
    dirname = workspace.basePath + '/' + config.paths[key];
  } else {
    dirname = dirname.slice(1);
  }
  dirname = path.resolve(dirname);
  entries[name] = dirname;
  console.log(`    ${name} -> ${dirname}`);
});

let input = `${workspace.root}/${workspace.input}`;
let output = {
  format: (content.template && content.template.debug && content.template.debug.format) || 'iife',
  sourcemap: true
};

if(content.framework.useCodeSplitting) {
  output.chunkFileNames = "[name]-[hash].js";
  output.dir = `${workspace.root}/debug`;
} else {
  output.file = `${workspace.root}/debug/${workspace.output}.js`;
}

let plugins = [
  yaml(),
  json(),
  resolve({
    browser:true
  }),
  commonjs({
  }),
  postcss(),
  alias(paths),
  // typescript(),
  sucrase({
    exclude: ['node_modules/**'],
    transforms: ['typescript']
  }),
  globals(),
  builtins()
];
if(process.env.BUILD === 'production'){
  output = {
    format: (content.template && content.template.release && content.template.release.format) || 'iife',
    sourcemap: false
  };

  if(content.framework.useCodeSplitting) {
    // output.chunkFileNames = "[name].[hash].js";
    output.chunkFileNames = `${content.group}-${content.name}.[hash].js`;
    output.dir = `${workspace.root}/release`;
  } else {
    output.file = `${workspace.root}/release/${workspace.output}.js`;
  }
  
  plugins = [
    yaml(),
    json(),
    resolve({
      browser:true
    }),
    commonjs({
    }),
    postcss(),
    alias(paths),
    // typescript(),
    sucrase({
      exclude: ['node_modules/**'],
      transforms: ['typescript']
    }),
    globals(),
    builtins()
  ];

  output.plugins = [];

  if(content.framework.skipCommandTerser) {
    output.plugins.push(terser({
      mangle: true,
      compress:{
          // toplevel: true,
          passes: 1,
          defaults: true,
          ecma: '2015',
          drop_console
        }
      })
    );
  }
}

if(output.format === 'iife') {
  output.name = content.name;
} else {
  output.name = null;
}
let treeshake = null;
if(output.format === 'es') {
  treeshake = {
    moduleSideEffects: 'no-external'
  };
}
let inlineDynamicImports = !!content.framework.inlineDynamicImports;

export default {
  // watch: {
  //   include: [`${workspace.root}/src/**`,`${workspace.root}/res/**/*.yml`]
  // },
  preserveEntrySignatures: 'strict',
  inlineDynamicImports,
  input: input,
  external: external,
  output: output,
  plugins: plugins,
  treeshake
};
