import React from 'react';
import './Login.css';
import PropTypes from 'prop-types';
import { BsGithub, BsLinkedin } from 'react-icons/bs';
import { createUser } from '../services/userAPI';
import logoblack from '../imagens/logo-black.png';
import elastic from '../imagens/music file2-09.png';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      btnDisabled: true,
      loading: false,
      renderiza: true,
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

  handleClick = async () => {
    console.log('TESTE');
  };

  myLinks = () => {
    const links = (
      <div className="doisIcons">
        <a href="https://github.com/lucascbb">
          <BsGithub className="github" />
        </a>
        <a href="https://www.linkedin.com/in/lucas-baroquello/">
          <BsLinkedin className="linkedin" />
        </a>
      </div>
    );
    return links;
  };

  myLogin = () => {
    const { btnDisabled, nome } = this.state;
    const { history: { push } } = this.props;
    const loginin = (
      <div className="inputBtnLogin">
        <p className="titleLogin">LOGIN</p>
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
            this.handleClick();
            this.setState({
              loading: true,
              login: false,
              renderiza: false,
            });
            await createUser({ name: nome });
            await push('/search');
          } }
        >
          Entrar
        </button>
      </div>
    );
    return loginin;
  };

  render() {
    const { login, loading, renderiza } = this.state;
    return (
      <section>
        <div className="loginPai">
          <div data-testid="page-login" className="loginEsquerda">
            <img
              className="logoLogin"
              src={ logoblack }
              alt="logo trybetunes"
            />
            <div className="inputBtnLogin">
              {login ? this.myLogin() : null}
              {renderiza ? this.myLinks() : null}
            </div>
            {loading
              ? (
                <div
                  className="divProgress"
                >
                  <p className="progress">
                    Carregando...
                  </p>
                  <div className="progressloading" />
                </div>) : null}
          </div>
          <div className="loginDireita">
            <img src={ elastic } alt="vetor" className="imgDireita" />
          </div>
        </div>
        <footer>
          <p className="rights">COPYRIGHT © 2022, Lucas Baroquello. All Rights Reseved</p>
        </footer>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.func,
};

Login.defaultProps = {
  history: [],
};

export default Login;
