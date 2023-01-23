import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import logoblack from '../imagens/logo-white.png';
import '../Styles/Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: true,
      fotoPerfil: false,
    };

    this.getName();
  }

  async componentDidMount() {
    const c = await getUser();
    const oito = 8;
    if (c.image === '' || c.image.length < oito) {
      this.setState({ fotoPerfil: false });
    } else { this.setState({ fotoPerfil: true }); }
  }

  async getName() {
    const b = await getUser();
    this.setState({
      name: b.name,
      foto: b.image,
      loading: false,
    });
  }

  render() {
    const { name, fotoPerfil, loading, foto } = this.state;
    return (
      <header data-testid="header-component">
        <div className="geralHeader">
          <div className="paiPIMGHeader">
            <img
              className="imagemHeader"
              src={ logoblack }
              alt="logo trybetunes"
            />
          </div>
          <div className="nomeFotoHeader">
            {loading
              ? (
                <div className="divProgressH">
                  <p className="progressH">
                    Carregando...
                  </p>
                </div>)
              :
                <p
                  data-testid="header-user-name"
                  className="pHeader"
                >
                  {name}
                </p>}
                {fotoPerfil
                  ? 
                    <img
                      src={ foto }
                      alt={ name }
                      className="fotoPerfilHeader"
                    />
                : null}
          </div>
          <div className="navHeader">
            <Link
              to="/trybetunes/search"
              data-testid="link-to-search"
              className="linkHeader"
            >
              <CgSearch className="searchHeader" />
              <p className="linkPHeader">Search</p>
            </Link>
            <Link
              to="/trybetunes/favorites"
              data-testid="link-to-favorites"
              className="linkHeader"
            >
              <FaHeart className="heartHeader" />
              <p className="linkPHeader">Favoritos</p>
            </Link>
            <Link
              to="/trybetunes/profile"
              data-testid="link-to-profile"
              className="linkHeader"
            >
              <CgProfile className="profileHeader" />
              <p className="linkPHeader">Perfil</p>
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
