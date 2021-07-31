import React from "react";
import Gauth from "./screens/GauthScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import ComposeScreen from "./screens/ComposeScreen";
import HomeScreen from "./screens/HomeScreen";
import ExcelImportScreen from "./screens/ExcelImportScreen";
import HistoryScreen from "./screens/HistoryScreen";
function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/login" component={Gauth} />
          <Route path="/compose" component={ComposeScreen} />
          <Route path="/" component={HomeScreen} exact />
          <Route path="/history" component={HistoryScreen} />
          <Route path="/upload" component={ExcelImportScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
