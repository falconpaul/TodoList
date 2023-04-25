import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import '../assets/styles/header.scss'
import '../assets/styles/general.scss'
import { AppDispatch, RootState } from "../store"
import { logout, selectTokenData } from "../store/user/user"
import { connect, ConnectedProps } from "react-redux"

const SimpleLayout: React.FC<Props> = ({ tokenData, logout }) => {
    const authorized = !!tokenData

    return (
        <div className="wrapper">
            <header>
                {authorized && <div  className="header">
                    <Link to='/todo'>Todo</Link>
                    <div>{tokenData.login}</div>
                    <Link onClick={logout} to='/login'>Выйти</Link>
                </div>}
                {!authorized && <div  className="header">
                    <Link to='/login'>Войти</Link>
                    <Link to='/reg'>Зарегистрироваться</Link>
                </div>}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    )
}

const mapState = (state: RootState) => {
    return {
        tokenData: selectTokenData(state)
    }
}

const mapDispatch = (dispatch: AppDispatch) => {
    return {
        logout: () => dispatch(logout())
    }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(SimpleLayout)
