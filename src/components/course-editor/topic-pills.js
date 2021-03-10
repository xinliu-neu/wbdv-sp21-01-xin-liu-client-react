import {connect} from 'react-redux';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import EditableItem from "../editable-item";
import topicService from "../../services/topic-service"

const TopicPills = (
    {
      topics = [],
      findTopicsForLesson,
      createTopic,
      updateTopic,
      deleteTopic,
      renderNothingTopics
    }) => {
  const {layout, courseId, moduleId, lessonId, topicId} = useParams();

  useEffect(() => {
    if (lessonId !== "undefined" && typeof lessonId !== "undefined") {
      findTopicsForLesson(lessonId)
    } else {
      renderNothingTopics();
    }
  }, [lessonId])

  return (
      <div>
        <ul className="nav nav-pills">
          {
            topics.map(topic =>
                <li className="nav-item">
                  <EditableItem
                      toURL={`/courses/${layout}/edit/${courseId}/modules/${moduleId}/lessons/${lessonId}/topics/${topic._id}`}
                      item={topic}
                      updateItem={updateTopic}
                      deleteItem={deleteTopic}
                      active={topic._id === topicId}
                  />
                </li>
            )
          }
          <li>
            <i onClick={() => createTopic(lessonId)}
               className="fas fa-plus ml-2"/>
          </li>
        </ul>
      </div>
  )
}

const stpm = (state) => {
  return {
    topics: state.topicReducer.topics
  }
}

const dtpm = (dispatch) => {
  return {
    createTopic: (lessonId) => {
      if (lessonId === "" ||
          lessonId === "undefined" ||
          typeof lessonId === "undefined") {
        return
      }

      topicService.createTopic(lessonId, {title: "New Topic"})
      .then(topic => dispatch({
        type: "CREATE_TOPIC",
        topic: topic
      }))
    },
    updateTopic: (newItem) => {
      topicService.updateTopic(newItem._id, newItem)
      .then(status => dispatch({
        type: "UPDATE_TOPIC",
        updateTopic: newItem
      }))
    },
    deleteTopic: (topicToDelete) => {
      topicService.deleteTopic(topicToDelete._id)
      .then(status => dispatch({
        type: "DELETE_TOPIC",
        topicToDelete: topicToDelete
      }))
    },
    findTopicsForLesson: (lessonId) => {
      topicService.findTopicsForLesson(lessonId)
      .then(topics => dispatch({
        type: "FIND_TOPICS_FOR_LESSON",
        topics: topics
      }))
    },
    renderNothingTopics: () => {
      dispatch({
        type: "RENDER_NOTHING_TOPICS"
      })
    }
  }
}

export default connect(stpm, dtpm)(TopicPills)