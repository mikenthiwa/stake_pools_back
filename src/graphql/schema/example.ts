import { gql } from "apollo-server-express";

export const ExampleTypeDef = gql`
  type Query {
    hello: String
  }
`
