import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

export default function App() {

  useLocation();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'instant'
  });

  return <>
    <Header />
    <Main />
    <Footer />
  </>;
}