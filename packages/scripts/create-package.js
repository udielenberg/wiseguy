#!/usr/bin/env node

const fs = require("fs-extra");
const yargs = require("yargs").argv;

const packageName = yargs._[0];
const dir = `../${packageName}`;

const basePackageJson = {
  name: `@todo/${packageName}`,
  version: "1.0.0",
  main: "index.js",
  license: "MIT",
};

fs.mkdirpSync(dir);
fs.writeJSONSync(`${dir}/package.json`, basePackageJson);
