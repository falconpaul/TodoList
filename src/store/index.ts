import { configureStore } from "@reduxjs/toolkit"
import loginForm from "./loginForm/loginForm"
import regForm from './regForm/regForm'
import todo from "./todo/todo"
import user from "./user/user"

const store = configureStore({
    reducer: {
        regForm,
        loginForm,
        user,
        todo
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store