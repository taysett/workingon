const initialState = {
    todos: []
}

const todoReducer = (state = initialState,action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return{
                ...state,
                todos: [...state.todos, action.payload]
            };
        case 'DELETE_TODO':
            return {
                ...state,
                todos: state.todos.filter(todo => todo.id !== action.payload)
            }
        case 'EDIT_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.id ? { ...todo, ...action.newContent } : todo
                ),
            };

        case 'CLEAR_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, title: '' } : todo
                )
            }
         case 'LOAD_TODO':
            return {
                ...state,
                todos: state.todos.map(todo =>
                    todo.id === action.payload.id ? { ...todo, title: '' } : todo
                )
            }
        default:
            return state;
    }
}

export default todoReducer;