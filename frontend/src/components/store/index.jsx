import { createStore, combineReducers } from "redux";

const tasksReducer = (state = { id: "", title: "", description: "", status: "", date: "", taskId: "" }, action) => {
    if (action.type === 'setProjectDetails') {
        return {
            id: action.payload.projectId,
            title: action.payload.projectTitle
        }
    }
    
    return state;
};

const todoReducer = (state = { result: [] }, action) => {
    if (action.type === 'setTodo') {
        return {
            result: action.payload.arr
        }
    }
    
    return state;
};

const allReducers = combineReducers({
    tasksReducer: tasksReducer,
    todoReducer: todoReducer
})

const store = createStore(allReducers);

export default store;