import React from 'react';
import {connect} from 'react-redux';
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import lessonService from "../../services/lesson-service";
import topicService from "../../services/topic-service"

const LessonTabs = (
    {
      lessons = [],
      findLessonsForModule,
      updateLesson,
      deleteLesson,
      createLesson,
      renderNothingLessons
    }) => {
  const {layout, courseId, moduleId, lessonId} = useParams();

  useEffect(() => {
    if (moduleId !== "undefined" && typeof moduleId !== "undefined") {
      findLessonsForModule(moduleId)
    } else {
      renderNothingLessons();
    }
  }, [moduleId])

  return (
      <div>
        <ul className="nav nav-tabs">
          {
            lessons.map(lesson =>
                <li className="nav-item">
                  <EditableItem
                      toURL={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lesson._id}`}
                      item={lesson}
                      updateItem={updateLesson}
                      deleteItem={deleteLesson}
                      active={lesson._id === lessonId}
                  />
                </li>
            )
          }
          <li>
            <i onClick={() => createLesson(moduleId)}
               className="fas fa-plus ml-2"/>
          </li>
        </ul>
      </div>
  )
}

const stpm = (state) => {
  return {
    lessons: state.lessonReducer.lessons
  }
}

const dtpm = (dispatch) => ({
  findLessonsForModule: (moduleId) => {
    lessonService.findLessonsForModule(moduleId)
    .then(lessons => dispatch({
      type: "FIND_LESSONS_FOR_MODULE",
      lessons: lessons
    }))
  },
  createLesson: (moduleId) => {
    if (moduleId === "" || moduleId === "undefined" || typeof moduleId
        === "undefined") {
      return
    }

    lessonService.createLesson(moduleId, {title: "New Lesson"})
    .then(lesson => dispatch({
      type: "CREATE_LESSON",
      lesson: lesson
    }))
  },
  updateLesson: (lesson) => {
    lessonService.updateLesson(lesson._id, lesson)
    .then(status => dispatch({
      type: "UPDATE_LESSON",
      lesson: lesson
    }))
  },
  deleteLesson: (lessonToDelete) => {
    topicService.findTopicsForLesson(lessonToDelete._id)
    .then(topics => topics.map(
        topic => topicService.deleteTopic(topic._id)
        .then(status => dispatch({
          type: "DELETE_TOPIC",
          topicToDelete: topic
        }))
    ))

    lessonService.deleteLesson(lessonToDelete._id)
    .then(status => dispatch(
        {
          type: "DELETE_LESSON",
          lessonToDelete: lessonToDelete
        }))
  },
  renderNothingLessons: () => {
    dispatch({
      type: "RENDER_NOTHING_LESSONS"
    })
  }
})

export default connect(stpm, dtpm)(LessonTabs)