import React from 'react';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';
import './Album.css';

class Album extends React.Component {
  constructor() {
    super();
    const url = document.URL.split('/');
    const identificação = url[4];
    this.state = {
      id: identificação,
      album: false,
      arrayAlbum: [],
    };
  }

  async componentDidMount() {
    const { id, arrayAlbum } = this.state;
    const ide = await getMusics(id);
    this.setState({
      album: true,
    });
    arrayAlbum.push(ide);
  }

  func = () => {
    const { arrayAlbum } = this.state;
    const a = arrayAlbum[0];
    const result = (
      <section className="filtroPaiAlbum">
        <img
          className="imgAlbum"
          src={ a[0].artworkUrl100 }
          alt={ `Imagem do album: ${a[0].collectionName}` }
        />
        <div className="textoImgAlmbum">
          <p data-testid="album-name" className="collectionAlbum">
            {a[0].collectionName}
          </p>
          <p data-testid="artist-name" className="artistAlbum">
            {a[0].artistName}
          </p>
        </div>
      </section>
    );
    return result;
  };

  render() {
    const { album } = this.state;
    return (
      <div>
        <Header />
        <div data-testid="page-album" className="album-musicCard-Pai">
          {album ? this.func() : null}
          <MusicCard />
        </div>
      </div>
    );
  }
}
export default Album;
