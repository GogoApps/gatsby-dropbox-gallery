const path = require("path")
const PhotoTemplate = path.resolve("./src/templates/photo-template.tsx")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions
  const dropboxFiles = await graphql(`
    {
      allDropboxNode {
        edges {
          node {
            id,
            name
          }
        }
      }
    }
  `)

  dropboxFiles.data.allDropboxNode.edges.forEach(({ node }) => {
    createPage({
      path: `/photos/${node.name}`,
      component: PhotoTemplate,
      context: {
        id: node.id,
      },
    })
  })
}
