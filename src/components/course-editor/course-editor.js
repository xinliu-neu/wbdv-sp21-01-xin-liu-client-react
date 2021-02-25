import React from 'react'

const CourseEditor = ({history}) =>
    <div>
      <h2>
        Go back
        &nbsp;
        <i className="fas fa-arrow-left" onClick={() => history.goBack()}></i>
      </h2>
      <div className="container">
        <h1>Course Editor</h1>
        <div className="row">
          <div className="col-4">
            <ul className="list-group">
              <li className="list-group-item active">Module 1</li>
              <li className="list-group-item">Module 2</li>
              <li className="list-group-item">Module 3</li>
              <li className="list-group-item">Module 4</li>
              <li className="list-group-item">Module 5</li>

            </ul>

          </div>

          <div className="col-8">
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                   href="#">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Build</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Theme</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1"
                   aria-disabled="true">Disabled</a>
              </li>
            </ul>

            <br/>

            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page"
                   href="#">Active</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Topic 1</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Topic 2</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#" tabIndex="-1"
                   aria-disabled="true">Disabled</a>
              </li>
            </ul>

            Content intentionally left blank
          </div>
        </div>
      </div>
    </div>

export default CourseEditor