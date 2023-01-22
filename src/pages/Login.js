import React from 'react';
import '../Styles/Login.css';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import logoblack from '../imagens/logo-black.png';
import elastic from '../imagens/music file2-09.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      btnDisabled: true,
      login: true,
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { nome } = this.state;
      const tres = 3;
      const onze = 11;
      if (nome.length >= onze) {
        this.setState({ btnDisabled: true });
      } else if (nome.length >= tres) {
        this.setState({ btnDisabled: false });
      } else if (nome.length <= 2) {
        this.setState({ btnDisabled: true });
      }
    });
  };

  myLogin = () => {
    const { btnDisabled, nome } = this.state;
    const { history: { push } } = this.props;

    const loginin = (
      <div className="paiLogin">
        <p className="titleLogin">LOGIN</p>
        <div className="inputBtnLogin">
          <input
            name="nome"
            className="loginNome"
            data-testid="login-name-input"
            type="text"
            placeholder="Digite seu nome"
            value={ nome }
            onChange={ this.handleChange }
          />
          <button
            data-testid="login-submit-button"
            className="loginBtn"
            type="button"
            disabled={ btnDisabled }
            onClick={ async () => {
              this.setState({
                login: false,
              });
              await createUser({ name: nome });
              await push('/trybetunes/search');
            } }
          >
            ENTRAR
          </button>
        </div>
      </div>
    );
    return loginin;
  };

  render() {
    const { login } = this.state;
    return (
        <div className="loginPai">
          <div data-testid="page-login" className="loginEsquerda">
            <img
              className="logoLogin"
              src={ logoblack }
              alt="logo trybetunes"
            />
            <div className="inputBtnLogin">
              {login ? this.myLogin() : (
                <div className='paiCarregando'>
                  <p className='carregandoProgress'>CARREGANDO</p>
                  <div className="divProgress" />
                </div>
              )}
            </div>
          </div>
          <div className="loginDireita">
            <img src={ elastic } alt="vetor" className="imgDireita" />
          </div>
        </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.object,
};

export default Login;
