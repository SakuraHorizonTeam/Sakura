var path = require('path');

module.exports = {
  entry: './src/main.ts', 
  output: {
    path: path.resolve(__dirname, 'mods/bin'), 
    filename: 'main.js'
  },
  module: {
  rules: [
    { 
      test: /\.ts$/, 
      exclude: /(node_modules)/,
      use: ["babel-loader", "ts-loader"]
    }
  ] 
}
};
