import Navigation from './Components/Navigation/Navigation';
import './App.css';
import Logo from './Components/Logo/Logo';
import ImageLinkForm from './Components/ImageLinkForm/ImageLinkForm';
import Rank from './Components/Rank/Rank';
import'tachyons';
import Particles from "react-tsparticles";
import React, {Component} from 'react';
import Clarifai from 'clarifai';
import FaceRecognition from './Components/FaceRecognition/FaceRecognition';
import Signin from './Components/Signin/Signin';
import Register from './Components/Register/Register';

const particlesOptions = {
        background: {
          color: {
            value: "#618985",
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            onHover: {
              enable: false,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            bubble: {
              distance: 400,
              duration: 2,
              opacity: 0.8,
              size: 40,
            },
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: "#414535",
          },
          links: {
            color: "#414535",
            distance: 150,
            enable: true,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: true,
          },
          move: {
            direction: "none",
            enable: true,
            outMode: "bounce",
            random: false,
            speed: 1.2,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 2500,
            },
            value: 150,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
          },
          size: {
            random: true,
            value: 2,
          },
        },
        detectRetina: true,
      }

  const particlesInit = (main) => {
    console.log(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  }; 

  const app = new Clarifai.App({
    apiKey: '782db8a5f62449c9a014ae68127addf4'
  });

class App extends Component {

  constructor (){
    super();
    this.state={
      input: '',
      imageUrl: '',
      box: {},
      route: 'Signin',
      isSignedIn: false
    }
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(width,height)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
    
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }
  

  onInputChange = (event) => {
  this.setState({input: event.target.value});  
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});    
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input)
    .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))     
    .catch(err => console.log(err));
  } 
   
   onRouteChange = (route) => {
    if (route=== 'signout'){
      this.setState({isSignedIn:false})
    } else if (route === 'home') {
      this.setState({isSignedIn:true})
    }
   this.setState({route: route});
  } 
  
  render () {
   
  return (    
    <div className="App">
    <Particles
      className='particles'
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={particlesOptions}
    />
    <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
    { this.state.route === 'home' 
    ?<div>
      <Logo />    
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/>
     </div>

    :(this.state.route === 'Signin'
      ?<Signin onRouteChange={this.onRouteChange}/>
      :<Register onRouteChange={this.onRouteChange}/>
      ) 
      
  }
    </div>
  );
  }
}

export default App;
