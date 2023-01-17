import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Search.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      nome: '',
      renderiza: false,
      nomeArtista: [],
      btnDisabled: true,
      loading: false,
      artist: false,
      naoTem: false,
      collection: [],
    };
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => {
      const { nome } = this.state;
      if (nome.length >= 2) {
        this.setState({ btnDisabled: false });
      } else if (nome.length <= 1) {
        this.setState({ btnDisabled: true });
      }
    });
  };

  clickBtn = async () => {
    this.setState({
      btnDisabled: true,
      loading: true,
    });
    await this.albumTunes();
  };

  albumTunes = async () => {
    const { nome, collection } = this.state;
    const valor = document.getElementsByClassName('inputSearch')[0].value;
    this.setState({ nomeArtista: valor });
    this.setState({
      loading: false,
      nome: '',
    });
    const albuns = await searchAlbumsAPI(nome);
    console.log(document.getElementsByClassName('inputSearch')[0].value);
    this.setState({ collection: albuns });
    collection.push(albuns);
    if (albuns.length <= 0) {
      this.setState({ naoTem: true });
    } else if (albuns.length >= 1) {
      this.setState({
        artist: true,
        renderiza: true,
        naoTem: false,
      });
    }
    this.func();
  };

  func() {
    const { collection } = this.state;
    const result = (
      collection.map((ele) => (
        <div key={ ele.collectionId }>
          <div className="cadaAlbumSearch">
            <Link to={ `/album/${ele.collectionId}` }>
              <img
                className="imagemAlbumSearch"
                src={ ele.artworkUrl100 }
                alt={ `Album do(a) ${ele.artistName}` }
              />
              <p
                className="nomeAlbumSearch"
                maxLength="5"
              >
                { ele.collectionName }
              </p>
            </Link>
            <p className="nomeArtistaSearch">{ ele.artistName }</p>
            {/* <Link
              to={ `/album/${ele.collectionId}` }
              data-testid={ `link-to-album-${ele.collectionId}` }
            >
              Mais Informacoes
            </Link> */}
          </div>
        </div>
      ))
    );
    return result;
  }

  render() {
    const { btnDisabled, nome, loading, artist, naoTem,
      nomeArtista, renderiza } = this.state;
    const nomeDoArtista = `Resultado de álbuns de: ${nomeArtista}`;
    return (
      <>
        <Header />
        <div className="geralSearch">
          {loading
            ? (
              <div>
                <p>
                  Carregando...
                </p>
              </div>)
            : (
              <div data-testid="page-search" className="input-Btn-Search">
                <input
                  data-testid="search-artist-input"
                  type="text"
                  className="inputSearch"
                  name="nome"
                  placeholder="Pesquise um artista ou banda"
                  value={ nome }
                  onChange={ this.handleChange }
                />
                <button
                  data-testid="search-artist-button"
                  type="button"
                  className="btnSearch"
                  disabled={ btnDisabled }
                  onClick={ this.clickBtn }
                >
                  Pesquisar
                </button>
              </div>)}
          {naoTem ? <p className="anySearch">Nenhum álbum foi encontrado</p> : null}
          {artist
            ? (
              <div>
                <p className="resultadoSearch">
                  { nomeDoArtista }
                </p>
              </div>)
            : null}
          <div className="albumSearch">
            {renderiza ? this.func() : null}
          </div>
        </div>
      </>
    );
  }
}
export default Search;
