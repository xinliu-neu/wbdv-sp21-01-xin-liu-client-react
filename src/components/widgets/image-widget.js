import React, {useState} from 'react'

const ImageWidget = ({widget, setEditingWidget, editing}) => {
  const [localWidget, setLocalWidget] = useState(widget);
  return (
      <div>
        {
          !editing &&
          <img width={localWidget.width} height={localWidget.height}
               src={localWidget.src}/>
        }
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

            Source URL:
            <input onChange={e => {
              setLocalWidget({
                ...localWidget,
                src: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                src: e.target.value
              });
            }}
                   value={localWidget.src} className="form-control"/>

            Width:
            <input onChange={e => {
              setLocalWidget({
                ...localWidget,
                width: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                width: e.target.value
              });
            }}
                   value={localWidget.width} className="form-control"/>

            Height:
            <input onChange={e => {
              setLocalWidget({
                ...localWidget,
                height: e.target.value
              });
              setEditingWidget({
                ...localWidget,
                height: e.target.value
              });
            }}
                   value={localWidget.height} className="form-control"/>
          </>
        }
      </div>
  )
}

export default ImageWidget