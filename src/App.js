import "./App.css";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import {  ApolloProvider } from "@apollo/client";



const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          books:{
            merge: false
          }
        }
         
      },
    }
  }),
  
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
      <header className="App-header">
        <h1>Seznam knih</h1>
        <BookList />
        <AddBook />
      </header>
    </div>
    </ApolloProvider>
  );
}

export default App;
