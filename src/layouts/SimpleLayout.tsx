import { Outlet } from "react-router"
import { Link } from "react-router-dom"
import '../assets/styles/header.scss'
import '../assets/styles/general.scss'
import { AppDispatch, RootState } from "../store"
import { logout, selectTokenData } from "../store/user/user"
import { connect, ConnectedProps } from "react-redux"
import { useEffect } from "react"

const SimpleLayout: React.FC<Props> = ({ tokenData, logout }) => {
    const authorized = !!tokenData
    useEffect(() => {
        if (tokenData) {

        }
    }, [tokenData])
    return (
        <>
            <header>
                {authorized && <div  className="header">
                    <Link to='/todo'>Todo</Link>
                    <div>{tokenData.login}</div>
                    <div onClick={logout}>Выйти</div>
                </div>}
                {!authorized && <div  className="header">
                    <Link to='/login'>Войти</Link>
                    <Link to='/reg'>Зарегистрироваться</Link>
                </div>}
            </header>
            <main>
                <Outlet />
            </main>
        </>
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
