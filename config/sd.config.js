module.exports = {
  source: ["./all-tokens.json"],
  platforms: {
    css: {
      transformGroup: "css",
      buildPath: "./src/styles/tokens/",
      files: [
        {
          destination: "tokens.css",
          format: "css/variables"
        }
      ]
    },
    scss: {
      transformGroup: "scss",
      buildPath: "./src/styles/tokens/",
      files: [
        {
          destination: "tokens.scss",
          format: "scss/variables"
        }
      ]
    },
    js: {
      transformGroup: "js",
      buildPath: "./src/styles/tokens/",
      files: [
        {
          destination: "tokens.js",
          format: "javascript/es6"
        }
      ]
    },
    ts: {
      transformGroup: "js",
      buildPath: "./src/styles/tokens/",
      files: [
        {
          destination: "tokens.ts",
          format: "typescript/es6-declarations"
        }
      ]
    },
    json: {
      transformGroup: "js",
      buildPath: "./src/styles/tokens/",
      files: [
        {
          destination: "tokens.json",
          format: "json"
        }
      ]
    }
  }
}; 