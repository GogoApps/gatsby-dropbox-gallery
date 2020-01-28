/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */
const dotenv = require("dotenv")

dotenv.config()

module.exports = {
  plugins: [
    {
      resolve: "gatsby-transformer-sharp"
    },
    {
      resolve: "gatsby-plugin-sharp"
    },
    {
      resolve: `gatsby-plugin-typescript`
    },
    {
      resolve: "gatsby-plugin-typescript-checker"
    },
    {
      resolve: `gatsby-source-dropbox`,
      options: {
        accessToken: process.env.DROPBOX_ACCESS_TOKEN,
        extensions: ['.jpg', '.png'],
        path: process.env.DROPBOX_FOLDER,
        recursive: true,
      },
    },
    {
      resolve: "gatsby-plugin-graphql-codegen",
      options: {
        fileName: `./graphql/types.ts`,
        documentPaths: [
          './src/**/*.{ts,tsx}',
          './node_modules/gatsby-*/**/*.js',
        ],
        codegenDelay: 200,
      }
    },
    {
      resolve: "gatsby-plugin-extract-schema",
      options: {
        dest: `${__dirname}/graphql/schema.json`,
      },
    },
  ],
}
