const config = JSON.parse(JSON.stringify(require("./dist/eslint-policy")))

config.rules["@next/next/no-html-link-for-pages"] = "off"
config.parserOptions = { "project": "./tsconfig.json" }

module.exports = config