/* eslint-disable */
const path = require("path")

const ProductTemplate = path.resolve("./src/templates/product-template.tsx")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const result = await graphql(`
     {
       allContentfulProduct {
         edges {
           node {
             slug
             id
           }
         }
       }
     }
   `)

  const products = result.data.allContentfulProduct.edges
  products.forEach(({ node: product }) => {
    createPage({
      path: `/products/${product.slug}`,
      component: ProductTemplate,
      context: {
        id: product.id
      }
    })
  })
}
