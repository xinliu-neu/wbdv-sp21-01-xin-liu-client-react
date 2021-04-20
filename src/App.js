import './App.css';
import Home from "./components/home";
import CourseManager from "./components/course-manager";
import {BrowserRouter, Link, Route} from "react-router-dom";
import QuizzesList from "./components/quizzes/quizzes-list";
import Quiz from "./components/quizzes/quiz";
import React from "react";
import {Provider} from "react-redux";
import {combineReducers, createStore} from "redux";
import modulesReducer from "./reducers/modules-reducer";
import lessonReducer from "./reducers/lesson-reducer";
import topicReducer from "./reducers/topic-reducer";
import widgetReducer from "./reducers/widget-reducer";
import quizReducer from "./reducers/quiz-reducer";

const reducer = combineReducers({
  modulesReducer: modulesReducer,
  lessonReducer: lessonReducer,
  topicReducer: topicReducer,
  widgetReducer: widgetReducer,
  quizReducer: quizReducer,
})

const store = createStore(reducer);

function App() {
  return (
      <Provider store={store}>
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
      </Provider>
  );
}

export default App;
