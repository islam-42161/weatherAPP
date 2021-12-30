import React,{useState,useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View,Dimensions } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import * as Location from 'expo-location';


const API_KEY = "11ced9c0cfaf46a783f25dfb6343713d";


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [weatherData,setWeatherData] = useState(null);
  const [loaded,setLoaded] = useState(true);
  
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
    fetchWeatherData("Dhaka");
    console.log(weatherData);
  },[])
  
  let geoLocationPosition = 'Waiting...';
  let lat,long;
  if (errorMsg) {
    geoLocationPosition = errorMsg;
  } 
  else if (location) {
    geoLocationPosition = JSON.stringify(location);
    lat = JSON.stringify(location.coords.latitude);
    long = JSON.stringify(location.coords.longitude);
  }
  async function fetchWeatherData(cityName){
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    const citynameApi = `https://us1.locationiq.com/v1/reverse.php?key=66cf9d686ef84716c0b6ae67389d285b&lat=${lat}lon=${long}&format=json`
    try {
      const response = await fetch(API);
      
      if(response.status==200){
        const data = await response.json();
        setWeatherData(data);
      }
      else{
        setWeatherData(null);
      }
      setLoaded(true);
    }
    catch(error){
      console.log(error);
    }
  }



  if(!loaded){
    return(
    <View style={styles.container}>

      <ActivityIndicator color="grey" size={36}/>

    </View>
    )
    
  }
  else if(weatherData == null){
      return(
      <View style={styles.nullContainer}>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={styles.primaryText}>City Not Found! Try searching different city. Latitude: {lat} Longitude: {long}</Text>
      </View>
      )
  }
  return (
    <View style={styles.container}>
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nullContainer: {
    flex: 1,
    padding:10,
    width:Dimensions.get('screen').width
  },
  primaryText: {
    margin:20,
    fontSize:20
  }
});
