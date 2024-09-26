import React, { Component } from 'react';
import axios from 'axios';
import SlideshowWithField from './components/slide';
import data from '@/assets/data.json'

const players2 = data.players
class App extends Component {
  state = {
    players: [], // Start with an empty array
  };

  componentDidMount() {
    axios
      .get('http://127.0.0.1:8000/api/2') // Ensure this is the correct endpoint
      .then((res) => {
        this.setState({
          players: res.data, // Assuming res.data is the array of players
        });
        console.log('Fetched players:', res.data); // Log the fetched data
      })
      .catch((err) => {
        console.error('Error fetching data:', err); // Handle and log errors
      });
  }

  render() {
    const { players } = this.state;

    return (
      <>
        {/* Render the slideshow with the fetched players */}
        <SlideshowWithField players={players2} />

        {/* Optional: Move console.log outside of JSX */}
        {console.log(players)}
      </>
    );
  }
}

export default App;

