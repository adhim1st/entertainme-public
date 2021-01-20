import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MainPage from "./pages/MainPage";
import { ApolloProvider } from "@apollo/client";
import client from "./config/graphql";
import CreateMovie from "./pages/CreateMovie";
import NavBar from "./components/NavBar";
import UpdateMovies from "./pages/UpdateMovies";
import FavouriteMovie from "./pages/FavouriteMovie";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route path="/create-movie">
              <CreateMovie />
            </Route>
            <Route path="/favourite-movie">
              <FavouriteMovie />
            </Route>
            <Route path="/update-movie/:movieId">
              <UpdateMovies />
            </Route>
          </Switch>
        </Router>
      </div>
    </ApolloProvider>
  );
}

export default App;
