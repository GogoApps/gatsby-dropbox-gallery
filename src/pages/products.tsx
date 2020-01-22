import React, { FunctionComponent } from "react"
import { Link, graphql } from "gatsby"
import { ProductsPageQuery } from "../../graphql/types"

const basePath = "/products/"

export interface ProductsPageProps {
  data: ProductsPageQuery
}

export const ProductsPage: FunctionComponent<ProductsPageProps> = ({
  data
}) => {
  const products = data.allContentfulProduct.edges

  return (
    <div>
      <h2>Garb Products list</h2>
      {products.map(({ node }, index: number) => (
        <div key={`${node.slug}_${index}`}>
          <h4>
            <Link to={`${basePath}${node.slug}`}>{node.name}</Link>
            {" - "}${node.price}
          </h4>
        </div>
      ))}
    </div>
  )
}

export const query = graphql`
   query ProductsPage {
     allContentfulProduct {
       edges {
         node {
           slug
           name
           price
         }
       }
     }
   }
 `

export default ProductsPage
