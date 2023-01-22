import React from 'react';
import getMusics from '../services/musicsAPI';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends React.Component {
  constructor() {
    super();
    const url = document.URL.split('/');
    const identificação = url[url.length - 1];

    this.state = {
      id: identificação,
      musicas: false,
      arrayAlbum: [],
      carregando: true,
      saveSongs: [],
    };
  }

  async componentDidMount() {
    const { id } = this.state;
    const ide = await getMusics(id);

    this.setState({ loading: true });
      
    const favoritei = await getFavoriteSongs();

    const idFavoritos = favoritei.map((ele) => (
      ele.trackId
    ));

    this.setState({
      musicas: true,
      loading: false,
      arrayAlbum: ide,
      carregando: false,
      saveSongs: idFavoritos,
    });
  }

  favorite = async (ele) => {
    const { arrayAlbum, saveSongs } = this.state;
    this.componentDidMount();
    this.setState({
      loading: true,
      musicas: false,
    });
    const x = ele.target.value;
    const n = parseInt(ele.target.className, 10);

    if (saveSongs.find((ele2) => ele2 === n)) {
      await removeSong(arrayAlbum[x]);
    } else { await addSong(arrayAlbum[x]); }

    this.setState({
      loading: false,
      musicas: true,
      saveSongs: [...saveSongs, arrayAlbum],
    });
  };

  funcMusic = () => {
    const { arrayAlbum, saveSongs } = this.state;
    const resultado = arrayAlbum.slice(1);

    const resultMusic = resultado.map((ele, index) => (
      <section key={ index }>
        <div className="musica">
          <p className="nomeMusica">{ ele.trackName }</p>
          <audio data-testid="audio-component" className="audio" controls>
            <source src={ ele.previewUrl } />
            <track src={ ele.previewUrl } kind="captions" />
          </audio>
          <label
            htmlFor={ `User-${ele.trackId}` }
            className="favoritaAlbum"
          >
            Favorita
            <input
              type="checkbox"
              id={ `User-${ele.trackId}` }
              name="checkSave"
              className={ ele.trackId }
              className="favoritaInput"
              checked={ saveSongs.some((song) => song === ele.trackId) }
              value={ ele.trackNumber }
              data-testid={ `checkbox-music-${ele.trackId}` }
              onChange={ this.favorite }
            />
          </label>
        </div>
      </section>
    ));
    return resultMusic;
  };

  render() {
    const { musicas, loading, carregando } = this.state;
    return (
      <div className="musicasID">
        {musicas ? this.funcMusic() : null}
        {loading ? (
          <div
            className="divProgressA"
          >
            <p className="progressA">
              Carregando...
            </p>
            <div className="progressloadingA" />
          </div>) : null}
        {carregando ? <p className="carregandoA">Carregando...</p> : null}
      </div>
    );
  }
}
export default MusicCard;
