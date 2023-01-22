import React from 'react';
import Header from '../components/Header';
import '../Styles/Favorites.css';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      renderMusics: false,
      musicasFavoritas: {},
    };
  }

  async componentDidMount() {
    const pegandoMusicasFavoritas = await getFavoriteSongs();
    this.setState({
      loading: false,
      renderMusics: true,
      musicasFavoritas: pegandoMusicasFavoritas,
    });
    console.log(pegandoMusicasFavoritas);
  }

  favorite = async (ele) => {
    const { musicasFavoritas } = this.state;
    this.setState({
      loading: true,
    });
    const a = [...musicasFavoritas].find((ele2) => ele2.trackId
      === parseInt(ele.target.className, 10));
    await removeSong(a);
    this.setState({
      loading: false,
    });
    this.componentDidMount();
  };

  funcRender() {
    const { musicasFavoritas } = this.state;
    const renderiza = [...musicasFavoritas].map((ele, index) => (
      <section key={ index } className="teste">
        <div className="paiGeralFavorites">
          <img
            className="imgFavorites"
            src={ ele.artworkUrl100 }
            alt={ `Album do(a) ${ele.artistName}` }
          />
          <div className="names-audio-check-Favorites">
            <p className="nomeMusicaFavorites">{ ele.trackName }</p>
            <p className="nomeArtistaFavorites">{ ele.artistName }</p>
          </div>
        </div>
        <audio
          data-testid="audio-component"
          className="audioFavorites"
          controlsList="nodownload noplaybackrate"
          controls
        >
          <source src={ ele.previewUrl } />
          <track kind="captions" />
        </audio>
        <label
          htmlFor={ `User-${ele.trackId}` }
          id="user"
        >
          Favorita
          <input
            type="checkbox"
            id={ `User-${ele.trackId}` }
            name="checkSave"
            className={ ele.trackId }
            className='nome'
            checked
            value={ ele.trackNumber }
            data-testid={ `checkbox-music-${ele.trackId}` }
            onChange={ this.favorite }
          />
        </label>
      </section>
    ));
    return renderiza;
  }

  render() {
    const { loading, renderMusics } = this.state;
    return (
      <>
        <Header />
        <div data-testid="page-favorites" className="paideTodos">
          <h2 className="tituloFavorites">Músicas Favoritas</h2>
          {loading ? <p>Carregando...</p> : null}
          <div className="allMusics">
            {renderMusics ? this.funcRender() : null}
          </div>
        </div>
      </>
    );
  }
}
export default Favorites;
