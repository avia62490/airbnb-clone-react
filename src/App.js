import './App.css';
import axios from 'axios';
import React, {useState, useEffect} from 'react';

function App() {
  const [properties, setProperties] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/properties")
    .then(res => setProperties(res.data))
    }, []
  );
  const propertyDisplay = properties.map(property => {
    return(
      <div key={property.id}>
        <h1>{property.title}</h1>
        <h1>{property.address}</h1>
        <h1>{property.description}</h1>
      </div>
    )
  })
  return (
    <div className="App">
      <header className="App-header">
        {propertyDisplay}
      </header>
    </div>
  );
}

export default App;
