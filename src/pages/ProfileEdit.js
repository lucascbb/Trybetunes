import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import './ProfileEdit.css';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      btnDisabled: true,
      foto: '',
      nick: '',
      email: '',
      descricao: '',
    };
  }

  async componentDidMount() {
    const a = await getUser();
    console.log(a);
    this.setState({
      loading: false,
      foto: a.image,
      nick: a.name,
      email: a.email,
      descricao: a.description,
    });
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { foto, nick, email, descricao } = this.state;
      const vinte = 16;
      if (foto.length >= 1 && nick.length >= 1 && nick.length <= vinte
        && email.length >= 1 && email.includes('@') && descricao.length >= 1) {
        this.setState({ btnDisabled: false });
        console.log(nick);
      } else { this.setState({ btnDisabled: true }); }
    });
  };

  render() {
    const { loading, foto, nick, email, descricao, btnDisabled } = this.state;
    const { history: { push } } = this.props;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        {loading ? <p>Carregando...</p>
          : (
            <section className="geralEdit">
              <div className="paiInputsEdit">
                <h1 className="tituloEdit">Editar perfil</h1>
                <input
                  className="imgEdit"
                  data-testid="edit-input-image"
                  name="foto"
                  type="text"
                  value={ foto }
                  placeholder="URl da imagem"
                  onChange={ this.handleChange }
                />
                <input
                  className="nickEdit"
                  data-testid="edit-input-name"
                  name="nick"
                  type="text"
                  value={ nick }
                  placeholder="Editar nome"
                  onChange={ this.handleChange }
                />
                <input
                  className="emailEdit"
                  data-testid="edit-input-email"
                  name="email"
                  type="text"
                  value={ email }
                  placeholder="Editar e-mail"
                  onChange={ this.handleChange }
                />
                <textarea
                  className="textEdit"
                  data-testid="edit-input-description"
                  name="descricao"
                  type="text"
                  maxLength="300"
                  value={ descricao }
                  placeholder="Editar descricao"
                  onChange={ this.handleChange }
                />
                <button
                  className="btnEdit"
                  disabled={ btnDisabled }
                  data-testid="edit-button-save"
                  type="button"
                  onClick={ async () => {
                    await updateUser({
                      name: nick,
                      email,
                      image: foto,
                      description: descricao });
                    await push('/profile');
                  } }
                >
                  Salvar
                </button>
              </div>
            </section>)}
      </div>

    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.func,
};

ProfileEdit.defaultProps = {
  history: [],
};

export default ProfileEdit;
