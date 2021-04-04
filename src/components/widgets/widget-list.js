import React, {useEffect, useState} from 'react'
import {connect} from "react-redux";
import widgetService from "../../services/widget-service"
import {useParams} from "react-router-dom";
import HeadingWidget from "./heading-widget";
import ParagraphWidget from "./paragraph-widget";
import ListWidget from "./list-widget";
import ImageWidget from "./image-widget";

const WidgetList = (
    {
      widgets = [],
      findWidgetsForTopic,
      createWidget,
      updateWidget,
      deleteWidget,
      renderNothingWidgets
    }) => {
  const {topicId} = useParams();
  const [editingWidget, setEditingWidget] = useState({});

  useEffect(() => {
    if (topicId !== "undefined" && typeof topicId !== "undefined") {
      findWidgetsForTopic(topicId)
    } else {
      renderNothingWidgets();
    }
  }, [topicId])

  return (
      <div>
        <i onClick={() => createWidget(topicId)}
           className="fas fa-plus fa-2x float-right">
        </i>
        <ul className="list-group">
          {
            widgets.map(widget =>
                <li className="list-group-item" key={widget.id}>
                  {
                    editingWidget.id === widget.id &&
                    <>
                      <i onClick={() => {
                        updateWidget(editingWidget);
                        setEditingWidget({});
                      }} className="fas fa-2x fa-check ml-2 float-right"/>

                      <i onClick={() => {
                        deleteWidget(widget);
                        setEditingWidget({});
                      }} className="fas fa-2x fa-trash float-right"/>
                    </>
                  }
                  {
                    editingWidget.id !== widget.id &&
                    <>
                      <i onClick={() => setEditingWidget(widget)}
                         className="fas fa-2x fa-cog float-right"/>
                    </>
                  }

                  {
                    widget.type === "HEADING" &&
                    <HeadingWidget widget={widget}
                                   setEditingWidget={setEditingWidget}
                                   editing={editingWidget.id === widget.id}/>
                  }
                  {
                    widget.type === "PARAGRAPH" &&
                    <ParagraphWidget widget={widget}
                                     setEditingWidget={setEditingWidget}
                                     editing={editingWidget.id === widget.id}/>
                  }
                  {
                    widget.type === "LIST" &&
                    <ListWidget widget={widget}
                                setEditingWidget={setEditingWidget}
                                editing={editingWidget.id === widget.id}/>
                  }
                  {
                    widget.type === "IMAGE" &&
                    <ImageWidget widget={widget}
                                 setEditingWidget={setEditingWidget}
                                 editing={editingWidget.id === widget.id}/>
                  }
                </li>
            )
          }
        </ul>
      </div>
  )
}

const stpm = (state) => {
  return {
    widgets: state.widgetReducer.widgets
  }
}

const dtpm = (dispatch) => {
  return {
    createWidget: (topicId) => {
      if (topicId === "" ||
          topicId === "undefined" ||
          typeof topicId === "undefined") {
        return
      }

      widgetService.createWidget(topicId,
          {type: "HEADING", size: 1, text: "New Widget"})
      .then(widget => dispatch({
        type: "CREATE_WIDGET",
        widget: widget
      }))
    },
    updateWidget: (newItem) => {
      widgetService.updateWidget(newItem.id, newItem)
      .then(status => dispatch({
        type: "UPDATE_WIDGET",
        updateWidget: newItem
      }))
    },
    deleteWidget: (widgetToDelete) => {
      widgetService.deleteWidget(widgetToDelete.id)
      .then(status => dispatch({
        type: "DELETE_WIDGET",
        widgetToDelete: widgetToDelete
      }))
    },
    findWidgetsForTopic: (topicId) => {
      widgetService.findWidgetsForTopic(topicId)
      .then(widgets => dispatch({
            type: "FIND_ALL_WIDGETS_FOR_TOPIC",
            widgets: widgets
          })
      )
    },
    renderNothingWidgets: () => {
      dispatch({
        type: "RENDER_NOTHING_WIDGETS"
      })
    }
  }
}

export default connect(stpm, dtpm)(WidgetList);