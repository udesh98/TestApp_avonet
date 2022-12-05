import { createStore } from "redux";

const tasksReducer = (state = { id: "", title: "", description: "", status: "", date: "" }, action) => {
    if (action.type === 'setProjectDetails') {
        return {
            id: action.payload.projectId,
            title: action.payload.projectTitle
        }
    }
    return state;
};

const store = createStore(tasksReducer);

export default store;