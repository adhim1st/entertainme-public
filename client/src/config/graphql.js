import { ApolloClient, InMemoryCache } from "@apollo/client";
import { favouriteMovie } from "../cache/index";
const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          favouriteItem: {
            read() {
              return favouriteMovie();
            },
          },
        },
      },
    },
  }),
});

export default client;
