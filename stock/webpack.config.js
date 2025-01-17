import path from 'path';
export default {
  mode: 'development',
  entry: "./public/src/main.js",
  watch: true,
  output: {
    path: path.resolve(process.cwd(), "public"),
    filename: 'main_bundle.js'
  }
}
