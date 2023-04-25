import { useEffect } from "react"
import { connect, ConnectedProps } from "react-redux"
import '../assets/styles/todo.scss'
import { AppDispatch, RootState } from "../store"
import { selectActualItems, selectDoneItems, selectText, createTodo, setText, getMyTodos, deleteTodo, updateTodo, TodoItem, deleteAllTodos, deleteDoneTodos } from "../store/todo/todo"

const TodoView: React.FC<Props> = ({
    actualItems,
    doneItems,
    text,
    setText,
    createTodo,
    getMyTodos,
    deleteTodo,
    updateTodo,
    deleteAllTodos,
    deleteDoneTodos
}) => {

    useEffect(() => {
        getMyTodos()
    }, [])

    return <>
        <div className="todoWrapper">
            <div className="btn" onClick={deleteAllTodos}>Начать новый список</div>
            <div className="level mt-10">
                <input
                    type="text"
                    placeholder="Что хотите добавить?"
                    value={text}
                    onChange={(e) => setText(e.currentTarget.value)}
                />
                <div
                    className="btn ml-10"
                    onClick={createTodo}
                >
                    Enter
                </div>
            </div>
            <div className="mt-10">
                <ol>
                    {actualItems.map((item) => (
                        <li key={item.id}>
                            <span className="deleteTodo" onClick={() => deleteTodo(item.id)}>×</span>
                            <input type="checkbox" onChange={() => updateTodo({ ...item, done: 1 })} />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ol>
            </div>
            <div className="mt-10">
                <ul>
                    {doneItems.map((item) => (
                        <li key={item.id}>
                            <span className="deleteTodo" onClick={() => deleteTodo(item.id)}>×</span>
                            <input type="checkbox" onChange={() => updateTodo({ ...item, done: 0 })} checked />
                            <span>{item.text}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="mt-10">
                <div className="btn" onClick={deleteDoneTodos}>Удалить выполненные</div>
            </div>
        </div>
    </>
}

const mapState = (state: RootState) => {
    return {
        actualItems: selectActualItems(state),
        doneItems: selectDoneItems(state),
        text: selectText(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        setText: (value: string) => dispatch(setText(value)),
        createTodo: () => dispatch(createTodo()),
        getMyTodos: () => dispatch(getMyTodos()),
        deleteTodo: (id: number) => dispatch(deleteTodo(id)),
        updateTodo: (payload: TodoItem) => dispatch(updateTodo(payload)),
        deleteAllTodos: () => dispatch(deleteAllTodos()),
        deleteDoneTodos: () => dispatch(deleteDoneTodos())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(TodoView)

