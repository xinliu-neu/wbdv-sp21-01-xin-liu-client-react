const initialState = {
  modules: []
}

const modulesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE_MODULE":
      return {
        modules: [
          ...state.modules,
          action.module
        ]
      }
    case "DELETE_MODULE":
      return {
        ...state,
        modules: state.modules.filter(module => {
          if (module._id !== action.moduleToDelete._id) {
            return true
          } else {
            return false
          }
        })
      }
    case "UPDATE_MODULE":
      return {
        ...state,
        modules: state.modules.map(module => {
          if (module._id === action.updateModule._id) {
            return action.updateModule
          } else {
            return module
          }
        })
      }
    case "FIND_MODULES_FOR_COURSE":
      return {
        ...state,
        modules: action.modules
      }
    default:
      return state
  }
}

export default modulesReducer;