/* eslint-disable */
import React from "react"
import { graphql } from "gatsby"

// @ts-ignore
export default ({ data: { contentfulProduct: product } }: unknown) => (
  <div>
    <h2>{product.name}</h2>
    <h3>Added on {product.createdAt}</h3>
    <h4>Price: ${product.price}</h4>
    <p>{product.description}</p>
  </div>
)

export const query = graphql`
   query($id: String!) {
     contentfulProduct(id: { eq: $id }) {
       id
       name
       price
       private
       description
       createdAt(formatString: "MMMM Do, YYYY, h:mm:ss a")
     }
   }
 `
