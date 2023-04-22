import { connect, ConnectedProps } from "react-redux"
import '../assets/styles/reg.scss'
import '../assets/styles/popup.scss'
import { AppDispatch, RootState } from "../store"
import { FieldName, selectErrorMessage, selectRegState, selectRegStatus, sendRegForm, setRegForm, setStatus } from "../store/regForm/regForm"
import { useNavigate } from "react-router"
import { selectTokenData } from "../store/user/user"
import { useEffect } from "react"

const RegView: React.FC<Props> = ({
  regForm,
  status,
  errorMessage,
  tokenData,
  setStatus,
  sendRegForm,
  setRegForm
}) => {

  const navigate = useNavigate()

  useEffect(() => {
    if (tokenData) {
      navigate('/todo')
    }
  }, [tokenData])


  return <>
    {status === 'failed' && <div className="popUpBg">
      <div className="popUp">
        <div className="popUpBt" onClick={setStatus}>&#x2715;</div>
        <div className="popUpText">
          {errorMessage}
        </div>
      </div>
    </div>}
    {status === 'success' && <div className="popUpBg">
      <div className="popUp">
        <div className="popUpBt" onClick={setStatus}>&#x2715;</div>
        <div className="popUpText">
          Спасибо за регистрацию
        </div>
      </div>
    </div>}
    <div className="content">
      <div className="form">
        <div className="formGroup">
          <div>Логин</div>
          <div>
            <input
              type="text"
              className="input"
              onInput={(e) => setRegForm('login', e.currentTarget.value)}
              value={regForm.login}
            />
          </div>
        </div>
        <div className="formGroup">
          <div>Пароль</div>
          <div>
            <input
              type="password"
              className="input"
              onInput={(e) => setRegForm('password', e.currentTarget.value)}
              value={regForm.password}
            />
          </div>
        </div>
        <div className="formGroup">
          <div>Повторите пароль</div>
          <div>
            <input
              type="password"
              className="input"
              onInput={(e) => setRegForm('repPassword', e.currentTarget.value)}
              value={regForm.repPassword}
            />
          </div>
        </div>
        <div className="bt">
          <div>
            <button
              onClick={() => sendRegForm()}
            >
              Зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </div>
  </>
}

const mapState = (state: RootState) => {
  return {
    regForm: selectRegState(state),
    status: selectRegStatus(state),
    errorMessage: selectErrorMessage(state),
    tokenData: selectTokenData(state)
  }
}

const mapDispatch = (dispatch: AppDispatch) => {
  return {
    setRegForm: (field: FieldName, value: string) => dispatch(setRegForm({ field, value })),
    sendRegForm: () => dispatch(sendRegForm()),
    setStatus: () => dispatch(setStatus())
  }
}

const connector = connect(mapState, mapDispatch)

type Props = ConnectedProps<typeof connector>

export default connector(RegView)

