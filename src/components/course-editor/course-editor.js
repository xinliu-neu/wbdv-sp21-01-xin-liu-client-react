import React, {useEffect, useState} from 'react'
import modulesReducer from "../../reducers/modules-reducer";
import {combineReducers, createStore} from "redux";
import {Provider} from "react-redux";
import ModuleList from "./module-list";
import lessonReducer from "../../reducers/lesson-reducer";
import LessonTabs from "./lesson-tabs";
import {useParams, Link} from "react-router-dom";
import TopicPills from "./topic-pills";
import topicReducer from "../../reducers/topic-reducer";
import courseService from "../../services/course-service";

const reducer = combineReducers({
  modulesReducer: modulesReducer,
  lessonReducer: lessonReducer,
  topicReducer: topicReducer
})

const store = createStore(reducer);

const CourseEditor = () => {
  const {layout, courseId, moduleId} = useParams();
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    courseService.findCourseById(courseId)
        .then(course => setSelectedCourse(course))
  }, [])

  return (
    <Provider store={store}>
        <div className="container-fluid">
          <h3>
            <Link to={`/courses/${layout}`}>
              <i className="fas fa-times"></i>
            </Link>
            &nbsp;
            {selectedCourse.title}
          </h3>
          <div className="row">
            <div className="col-4">
              <ModuleList/>
            </div>

            <div className="col-8">
              <ul className="nav nav-tabs">
                <LessonTabs/>
              </ul>

              <br/>

              <ul className="nav nav-pills">
                <TopicPills/>
              </ul>
            </div>
          </div>
        </div>
    </Provider>
  )
}

export default CourseEditor