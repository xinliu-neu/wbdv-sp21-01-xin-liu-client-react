import './App.css';
import Home from "./components/home";
import CourseManager from "./components/course-manager";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
        <Route path="/" exact={true}>
          <Home/>
        </Route>

        <Route path="/courses">
          <CourseManager/>
        </Route>
      </BrowserRouter>
  );
}

export default App;
