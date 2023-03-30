import {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import App from './App';


export default function Property() {
  const[property, setProperty] = useState({});
  const {propertyId} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:3000/properties/${propertyId}`)
    .then(res => setProperty(res.data))
  }, [propertyId])
  
  return(
    <div>
      <h1>{property.title}</h1>
      <h2>{property.address}</h2>
      <h3>{property.description}</h3>
      <h5>{property.price_rate}</h5>
      <h5>Bedrooms: {property.bedrooms}</h5>
      <h5>Bathrooms: {property.bathrooms}</h5>
      <Link
        to="/"
        element={<App />}
      >Home</Link>
    </div>
  )
}