import { connect, ConnectedProps } from "react-redux"
import '../assets/styles/reg.scss'
import { AppDispatch, RootState } from "../store"
import { FieldName, selectLoginState, selectLoginHasError, sendLoginForm, setLoginForm, selectErrorMessage } from "../store/loginForm/loginForm"

const LoginView: React.FC<Props> = ({
  loginForm,
  hasError,
  errorMessage,
  sendLoginForm,
  setLoginForm
}) => {
  return <>
    <div className="content">
      <div className="form">
        <div className="formGroup">
          <div>Логин</div>
          <div>
            <input
              type="text"
              className="input"
              onInput={(e) => setLoginForm('login', e.currentTarget.value)}
              value={loginForm.login}
            />
          </div>
        </div>
        <div className="formGroup">
          <div>Пароль</div>
          <div>
            <input
              type="password"
              className="input"
              onInput={(e) => setLoginForm('password', e.currentTarget.value)}
              value={loginForm.password}
            />
          </div>
        </div>
        <div className="bt">
          <div>
            <button onClick={() => sendLoginForm()}>Войти</button>
          </div>
        </div>
        {hasError && <div>
          {errorMessage}
        </div>}
      </div>
    </div>
  </>
}

const mapState = (state: RootState) => {
  return {
    loginForm: selectLoginState(state),
    hasError: selectLoginHasError(state),
    errorMessage: selectErrorMessage(state)
  }
}

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    setLoginForm: (field: FieldName, value: string) => dispatch(setLoginForm({ field, value })),
    sendLoginForm: () => dispatch(sendLoginForm())
  }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(LoginView)

