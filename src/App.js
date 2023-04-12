import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Property from './Property';


function App() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/properties")
    .then(res => setProperties(res.data))
    }, []
  );

  // format or properties shown on page
  const propertyDisplay = properties.map(property => {
    return(
      <div key={property.id}>
        <h2>{property.title}</h2>
        <h4>{property.address}</h4>
        <h4>{property.description}</h4>
        <Link
          to={`/properties/${property.id}`}
          element={<Property />}
        >More Info</Link>
        <hr/>
      </div>
    )
  });

  return (
    <div className="App">
      <header className="App-header">
        {/* Properties to rent */}
        {propertyDisplay}
      </header>
    </div>
  );
}

export default App;
