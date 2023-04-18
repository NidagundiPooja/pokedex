import "@/styles/globals.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  from,
  HttpLink,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import Header from "@/Components/Header";

const errorLink = onError(({ graphqlErrors, networkerror }) => {
  if (graphqlErrors) {
    graphqlErrors.map({ message, location, path });
    alert(`Graphql error ${message}`);
  }
});
const link = from([
  errorLink,
  new HttpLink({ uri: "https://graphql-pokemon2.vercel.app/" }),
]);

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

export default function App({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Header/>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

