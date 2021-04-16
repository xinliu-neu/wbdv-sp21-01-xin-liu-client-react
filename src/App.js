import './App.css';
import Home from "./components/home";
import CourseManager from "./components/course-manager";
import {BrowserRouter, Link, Route} from "react-router-dom";
import QuizzesList from "./components/quizzes/quizzes-list";
import Quiz from "./components/quizzes/quiz";
import React from "react";

function App() {
  return (
      <BrowserRouter>
        <Route path="/" exact={true}>
          <Home/>
        </Route>


        <Route path="/courses">
          <CourseManager/>
        </Route>


        <Route path="/courses/:courseId/quizzes" exact={true}>
          <QuizzesList/>
        </Route>

        <Route path="/courses/:courseId/quizzes/:quizId" exact={true}>
          <Quiz/>
        </Route>

      </BrowserRouter>
  );
}

export default App;
