import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import ideas from './ideas.png'

const Logo = () => {
	return (
		<div className='ma4'>
		<Tilt className="Tilt br2 shadow-2" options={{ max : 50 }} style={{ height: 150, width: 150 }} >
        <div className="Tilt-inner pa4"> <img style={{paddingTop: '5px'}} alt='logo' src={ideas}/>  </div>
        </Tilt>
		</div>
		);
}

export default Logo;