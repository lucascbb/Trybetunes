import React from 'react';
// import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import '../Styles/Profile.css';
import user from '../imagens/user.png';

class Profile extends React.Component {
  constructor() {
    super();
    this.state = {
      carregando: true,
      nick: '',
      email: '',
      foto: '',
      descricao: '',
      fotoPerfil: false,
    };
  }

  async componentDidMount() {
    const a = await getUser();
    const oito = 8;
    this.setState({
      carregando: false,
      nick: a.name,
      email: a.email,
      foto: a.image,
      descricao: a.description,
    });

    if (a.image === '' || a.image.length < oito) {
      this.setState({ fotoPerfil: false });
    } else { this.setState({ fotoPerfil: true }); }
  }

  render() {
    const { carregando, nick, email, foto, descricao, fotoPerfil } = this.state;
    // const { history: { push } } = this.props;
    return (
      <section>
        <Header />
        <div data-testid="page-profile" className="paiGeral-Profile">
          {carregando
            ? (
              <div
                className="divProgressP"
              >
                <p className="progressP">
                  Carregando...
                </p>
                <div className="progressloadingP" />
              </div>)
            : (
              <div className="testeProfile">
                {fotoPerfil ? <img
                  src={ foto }
                  alt={ `Foto de perfil do(a): ${nick}` }
                  className="imgProfile"
                  data-testid="profile-image"
                /> : <img
                  src={ user }
                  alt="Foto icone de perfil"
                  className="avatarProfile"
                  data-testid="profile-image"
                />}
                <div className="nick-email-desc-Profile">
                  <h3 className="tituloProfile">
                    Nome:
                    <p className="nickProfile">{ nick }</p>
                  </h3>
                  <h3 className="tituloProfile">
                    E-mail:
                    <p className="emailProfile">{ email }</p>
                  </h3>
                  <h3 className="tituloProfile">
                    Descricao:
                    <p className="descProfile">{ descricao }</p>
                  </h3>
                </div>
                <Link to="/trybetunes/profile/edit" className="linkProfile">Editar perfil</Link>
              </div>)}
        </div>
      </section>
    );
  }
}

Profile.propTypes = {
  // history: PropTypes.func,
};

Profile.defaultProps = {
  history: [],
};

export default Profile;
