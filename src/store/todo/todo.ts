import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from ".."
import { api } from "../../api/api"


export type TodoItem = {
    id: number,
    text: string,
    done: 0 | 1
}

export interface TodoState {
    todoText: string,
    todoItems: TodoItem[]
}

const initialState: TodoState = {
    todoText: '',
    todoItems: []
}

export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async (payload: undefined, { getState }) => {
        const state = getState() as RootState
        if (state.todo.todoText === '') {
            throw new Error()
        }
        return await api.createTodo({text: state.todo.todoText})
    }
)

export const getMyTodos = createAsyncThunk(
    'todo/getMyTodos',
    async () => {
        return await api.getMyTodos()
    }
)

export const deleteTodo = createAsyncThunk(
    'todo/deleteTodo',
    async (payload: number) => {
        await api.deleteTodo(payload)
        return payload
    }
)

export const deleteAllTodos = createAsyncThunk(
    'todo/deleteAllTodos',
    async () => {
        await api.deleteAllTodos()
    }
)

export const deleteDoneTodos = createAsyncThunk(
    'todo/deleteDoneTodos',
    async () => {
        await api.deleteDoneTodos()
    }
)


export const updateTodo = createAsyncThunk(
    'todo/updateTodo',
    async (payload: TodoItem) => {
        await api.updateTodo(payload)
        return payload
    }
)


const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setText: (state, action: PayloadAction<string>) => {
            state.todoText = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTodo.fulfilled, (state, action) => {
            state.todoItems.push({id: action.payload, text: state.todoText, done: 0})
            state.todoText = ''
        }).addCase(getMyTodos.fulfilled, (state, action) => {
            state.todoItems = action.payload
        }).addCase(deleteTodo.fulfilled, (state, action) => {
            state.todoItems = state.todoItems.filter(item => item.id !== action.payload)
        }).addCase(updateTodo.fulfilled, (state, action) => {
            Object.assign(
                state.todoItems.find(item => item.id === action.payload.id) as {},
                action.payload
            )
        }).addCase(deleteAllTodos.fulfilled, (state) => {
            state.todoItems = []
        }).addCase(deleteDoneTodos.fulfilled, (state, action) => {
            state.todoItems = state.todoItems.filter(item => !item.done)
        })
    }
})

export const selectActualItems = (state: RootState) => state.todo.todoItems.filter(t => !t.done)

export const selectDoneItems = (state: RootState) => state.todo.todoItems.filter(t => t.done)

export const selectText = (state: RootState) => state.todo.todoText

export const { setText } = todoSlice.actions

export default todoSlice.reducer