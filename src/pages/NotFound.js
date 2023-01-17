import React from 'react';
import './NotFound.css';
import Header from '../components/Header';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="tudoNOT">
        <Header />
        <div className="tituloNOT" />
      </div>
    );
  }
}
export default NotFound;
