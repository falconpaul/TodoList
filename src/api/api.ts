import axios, { AxiosResponseTransformer } from "axios"

const instance = axios.create({
    baseURL: '/api/',
    transformResponse: [
        ...(axios.defaults.transformResponse as AxiosResponseTransformer[]),
        (data) => {
            if (data.status === 'error') {
                throw new Error(data.payload)
            }
            return data.payload
        }
    ]
})

const getAuthOptions = () => {
    return {
        headers: {
            'Access-Token': localStorage.getItem('at')
        }
    }
}
export const api = {
    reg: async (payload: { login: string, password: string }) => {
        return (await instance.post('reg', payload)).data
    },
    login: async (payload: { login: string, password: string }) => {
        return (await instance.post('login', payload)).data
    },
    createTodo: async (payload: { text: string }) => {
        return (await instance.post('todo', payload, getAuthOptions())).data
    },
    getMyTodos: async () => {
        return (await instance.get('todos', getAuthOptions())).data
    },
    updateTodo: async (payload: { id: number, text: string, done: 0 | 1 }) => {
        return (await instance.put('todo', payload, getAuthOptions())).data
    },
    deleteTodo: async (id: number) => {
        return (await instance.delete('todo?id=' + id, getAuthOptions())).data
    },
    deleteAllTodos: async () => {
        return (await instance.delete('todos?filter=all', getAuthOptions())).data
    },
    deleteDoneTodos: async () => {
        return (await instance.delete('todos?filter=done', getAuthOptions())).data
    }
}
