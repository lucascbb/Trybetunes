import React from 'react';
import { Link } from 'react-router-dom';
import { CgProfile, CgSearch } from 'react-icons/cg';
import { FaHeart } from 'react-icons/fa';
import { getUser } from '../services/userAPI';
import logoblack from '../imagens/logo-white.png';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      loading: true,
      fotoPerfil: false,
    };

    this.getName();
    // console.log(this.state);
  }

  async componentDidMount() {
    const c = await getUser();
    const oito = 8;
    if (c.image === '' || c.image.length < oito) {
      this.setState({ fotoPerfil: false });
    } else { this.setState({ fotoPerfil: true }); }
    console.log(c.image.length);
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
        {/* <h1 className="tittleHeader">Trybe Tunes</h1> */}
        <div className="geralHeader">
          <div className="paiPIMGHeader">
            <img
              className="imagemHeader"
              src={ logoblack }
              alt="logo trybetunes"
            />

          </div>
          <div className="navHeader">
            <Link
              to="/search"
              data-testid="link-to-search"
              className="linkHeader"
            >
              <CgSearch className="searchHeader" />
              Search
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="linkHeader"
            >
              <FaHeart className="heartHeader" />
              Favoritos
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="linkHeader"
            >
              <CgProfile className="profileHeader" />
              Perfil
            </Link>
          </div>
          <div className="nomeFotoHeader">
            {fotoPerfil
              ? (
                <img
                  src={ foto }
                  alt={ name }
                  className="fotoPerfilHeader"
                />)
              : null}
            {loading
              ? (
                <div
                  className="divProgressH"
                >
                  <p className="progressH">
                    Carregando...
                  </p>
                  <div className="progressloadingH" />
                </div>)
              : (
                <p
                  data-testid="header-user-name"
                  className="pHeader"
                >
                  {name}
                </p>)}
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
