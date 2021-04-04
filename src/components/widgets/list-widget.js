import React, {useState} from 'react'

const ListWidget = ({widget, setEditingWidget, editing}) => {
  const [localWidget, setLocalWidget] = useState(widget);
  return (
      <div>
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

            <input onChange={e => {
              setLocalWidget({
                ...localWidget,
                ordered: e.target.checked
              });
              setEditingWidget({
                ...localWidget,
                ordered: e.target.checked
              });
            }}
                   checked={localWidget.ordered} type="checkbox"/> Ordered
            <br/>
            List items
            <textarea onChange={e => {
              setLocalWidget({
                ...localWidget,
                text: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                text: e.target.value
              });
            }}
                      value={localWidget.text} rows={10}
                      className="form-control"/>
            {/*{JSON.stringify(widget)}*/}
          </>
        }
        {
          !editing &&
          <>
            {
              localWidget.ordered &&
              <ol>
                {
                  localWidget.text.split("\n").map((item) => {
                    return (
                        <li>
                          {item}
                        </li>
                    )
                  })
                }
              </ol>
            }
            {
              !localWidget.ordered &&
              <ul>
                {
                  localWidget.text.split("\n").map((item) => {
                    return (
                        <li>
                          {item}
                        </li>
                    )
                  })
                }
              </ul>
            }
          </>
        }
      </div>
  )
}

export default ListWidget