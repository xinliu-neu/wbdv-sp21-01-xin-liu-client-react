import React, {useEffect, useState} from 'react'
import {Link} from "react-router-dom";

const EditableItem = (
    {
      toURL,
      item,
      updateItem,
      deleteItem,
      active
    }) => {
  const [editing, setEditing] = useState(false);
  const [itemCache, setItemCache] = useState(item);

  return (
      <>
        {
          !editing &&
          <>
            <Link className={`nav-link ${active ? 'active' : ''}`} to={toURL}>
              {item.title}
              &nbsp;
              <i onClick={() => setEditing(true)}
                 className="fas fa-edit float-right"/>
            </Link>
          </>
        }
        {
          editing &&
          <>
            <input onChange={(e) => setItemCache(
                {...itemCache, title: e.target.value})}
                   value={itemCache.title}/>
            &nbsp;
            <i onClick={() => {
              updateItem(itemCache);
              setEditing(false);
            }} className="fas fa-check"/>
            &nbsp;
            <i onClick={() => {
              deleteItem(item);
              setEditing(false);
            }} className="fas fa-times"/>
          </>
        }
      </>
  )
}

export default EditableItem;