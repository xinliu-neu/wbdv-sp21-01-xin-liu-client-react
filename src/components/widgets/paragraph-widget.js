import React, {useState} from 'react'

const ParagraphWidget = ({widget, setEditingWidget, editing}) => {
  const [localWidget, setLocalWidget] = useState(widget);

  return (
      <>
        {
          editing &&
          <>
            <select onChange={e => {
              setLocalWidget({
                ...localWidget,
                type: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                type: e.target.value
              });
            }}
                    value={localWidget.type} className="form-control">
              <option value="HEADING">Heading</option>
              <option value="PARAGRAPH">Paragraph</option>
              <option value="LIST">List</option>
              <option value="IMAGE">Image</option>
            </select>

            <br/>

            <textarea onChange={e => {
              setLocalWidget({
                ...widget,
                text: e.target.value
              });
              setEditingWidget({
                ...widget,
                text: e.target.value
              });
            }}
                      value={localWidget.text} className="form-control"/>
          </>
        }
        {
          !editing &&
          <p>
            {localWidget.text}
          </p>
        }
      </>
  )
}

export default ParagraphWidget;