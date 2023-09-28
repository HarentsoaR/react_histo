import React from 'react';
import notFoundImage from '../image/404.JPG';

function NotFound() {
  return (
    <div className='page404'>
      <h1 data-aos="fade-right" >Page introuvable</h1>
      <p data-aos="zoom-in-down">Désolé, la page que vous recherchez n'existe pas.</p>
      <img src={notFoundImage} className='image404'data-aos="fade-left" alt='img'/>
    </div>
  );
}

export default NotFound;
