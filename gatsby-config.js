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
      resolve: `gatsby-plugin-typescript`
    },
    {
      resolve: "gatsby-source-contentful",
      options: {
        spaceId: process.env.CONTENFUL_SPACE_ID,
        accessToken: process.env.CONTENFUL_ACCESS_TOKEN,
      }
    },
    {
      resolve: "gatsby-plugin-typegen",
      options: {
        schemaOutputPath: `${__dirname}/graphql/schema.json`,
        typeDefsOutputPath: `${__dirname}/graphql/types.ts`
      }
    },
    {
      resolve: "gatsby-plugin-typescript-checker"
    },
  ],
}
