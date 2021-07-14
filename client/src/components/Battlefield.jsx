import React from 'react';

import axios from 'axios';

class Battlefield extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }


  }

  render() {

    axios.get('/favorites')
    .then(function (response) {
      // handle success
      console.log('should be the favorites', response.data);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });


    if (!this.state.show) {
      console.log('not going to show favorites');
    }

    return (

      <h2>Battlefield</h2>
    )
  }

}

export default Battlefield;