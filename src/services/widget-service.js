const API_URL = "https://wbdv-sp21-01-xin-liu-server.herokuapp.com/api"

export const createWidget = (tid, widget) =>
    fetch(`${API_URL}/topics/${tid}/widgets`, {
      method: "POST",
      body: JSON.stringify(widget),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())

export const findWidgetsForTopic = (tid) =>
    fetch(`${API_URL}/topics/${tid}/widgets`)
    .then(response => response.json())

export const updateWidget = (wid, widget) =>
    fetch(`${API_URL}/widgets/${wid}`, {
      method: "PUT",
      body: JSON.stringify(widget),
      headers: {
        'content-type': 'application/json'
      }
    }).then(response => response.json())

export const deleteWidget = (wid) =>
    fetch(`${API_URL}/widgets/${wid}`, {
      method: "DELETE"
    }).then(response => response.json())

export default {
  createWidget, findWidgetsForTopic, updateWidget, deleteWidget
}