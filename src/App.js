import './App.css';
import Home from "./components/home";
import CourseManager from "./components/course-manager";
import CourseEditor from "./components/course-editor";
import {BrowserRouter, Route} from "react-router-dom";

function App() {
  return (
      <BrowserRouter>
          <Route path="/" exact={true} component={Home}/>
          <Route path="/courses" component={CourseManager}/>
          <Route path="/courses/editor" render={(props) => <CourseEditor {...props}/>}/>
      </BrowserRouter>

  );
}

export default App;
