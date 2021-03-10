import React from 'react'
import {connect} from 'react-redux'
import EditableItem from "../editable-item";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import moduleService from "../../services/module-service"
import lessonService from "../../services/lesson-service";
import topicService from "../../services/topic-service"

const ModuleList = (
    {
      myModules = [],
      createModule,
      updateModule,
      deleteModule,
      findModulesForCourse,
    }) => {
  const {layout, courseId, moduleId} = useParams();

  useEffect(() => {
    findModulesForCourse(courseId)
  }, [moduleId])

  return (
      <div>
        <ul className="list-group">
          {
            myModules.map(module =>
                <li className={`list-group-item ${module._id === moduleId
                    ? 'active' : ''}`}>
                  <EditableItem
                      toURL={`/courses/${layout}/edit/${courseId}/modules/${module._id}`}
                      deleteItem={deleteModule}
                      updateItem={updateModule}
                      active={false}
                      item={module}/>
                </li>
            )
          }
          <li className="list-group-item">
            <i onClick={() => createModule(courseId)}
               className="fas fa-plus fa-2x"/>
          </li>
        </ul>
      </div>
  )
}

const stpm = (state) => {
  return {
    myModules: state.modulesReducer.modules
  }
}

const dtpm = (dispatch) => {
  return {
    createModule: (courseId) => {
      if (courseId === "" || courseId === "undefined" || typeof courseId
          === "undefined") {
        return
      }

      moduleService.createModule(courseId, {title: "New Module"})
      .then(module => dispatch(
          {
            type: "CREATE_MODULE",
            module: module
          })
      )
    },
    updateModule: (newItem) => {
      moduleService.updateModule(newItem._id, newItem)
      .then(status => dispatch(
          {
            type: "UPDATE_MODULE",
            updateModule: newItem
          })
      )
    },
    deleteModule: (moduleToDelete) => {
      lessonService.findLessonsForModule(moduleToDelete._id)
      .then(lessons => lessons.map(
          lesson => {
            topicService.findTopicsForLesson(lesson._id)
            .then(topics => topics.map(
                topic => topicService.deleteTopic(topic._id)
                .then(status => dispatch({
                  type: "DELETE_TOPIC",
                  topicToDelete: topic
                }))
            ))
            lessonService.deleteLesson(lesson._id)
            .then(status => dispatch({
              type: "DELETE_LESSON",
              lessonToDelete: lesson
            }))
          }
      ))

      moduleService.deleteModule(moduleToDelete._id)
      .then(status => dispatch(
          {
            type: "DELETE_MODULE",
            moduleToDelete: moduleToDelete
          }))
    },
    findModulesForCourse: (courseId) => {
      moduleService.findModulesForCourse(courseId)
      .then(modules => dispatch(
          {
            type: "FIND_MODULES_FOR_COURSE",
            modules: modules
          })
      )
    }
  }
}

export default connect(stpm, dtpm)(ModuleList)