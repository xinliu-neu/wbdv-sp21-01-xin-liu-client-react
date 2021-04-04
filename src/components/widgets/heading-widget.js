import React, {useState} from 'react'

const HeadingWidget = ({widget, setEditingWidget, editing}) => {
  const [localWidget, setLocalWidget] = useState(widget);

  return (
      <>
        {
          editing &&
          <>
            <select onChange={e => {
              console.log(e.target.value);
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

            <input onChange={e => {
              setLocalWidget({
                ...localWidget,
                text: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                text: e.target.value
              });
            }}
                   value={localWidget.text} className="form-control"/>

            <br/>

            <select onChange={e => {
              setLocalWidget({
                ...localWidget,
                size: parseInt(e.target.value)
              });
              setEditingWidget({
                ...localWidget,
                size: parseInt(e.target.value)
              });
            }}
                    value={localWidget.size} className="form-control">
              <option value={1}>Heading 1</option>
              <option value={2}>Heading 2</option>
              <option value={3}>Heading 3</option>
              <option value={4}>Heading 4</option>
              <option value={5}>Heading 5</option>
              <option value={6}>Heading 6</option>
            </select>
          </>
        }
        {
          !editing &&
          <>
            {localWidget.size === 1 && <h1>{localWidget.text}</h1>}
            {localWidget.size === 2 && <h2>{localWidget.text}</h2>}
            {localWidget.size === 3 && <h3>{localWidget.text}</h3>}
            {localWidget.size === 4 && <h4>{localWidget.text}</h4>}
            {localWidget.size === 5 && <h5>{localWidget.text}</h5>}
            {localWidget.size === 6 && <h6>{localWidget.text}</h6>}
          </>
        }
      </>
  )
}

export default HeadingWidget;