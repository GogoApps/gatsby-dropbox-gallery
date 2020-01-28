import React from "react"
import { RootElementWrapper } from "./src/providers/providers"

export const wrapRootElement = ({ element }) => {
  return <RootElementWrapper>{element}</RootElementWrapper>
};
