import React,{useState,useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View,Dimensions } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';
import * as Location from 'expo-location';

const API_KEY = "11ced9c0cfaf46a783f25dfb6343713d";
const geo_coding_api_key = "e8f8cad1aab91fbedfea143af5371d40";  


export default function App() {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const [weatherData,setWeatherData] = useState(null);
  const [loaded,setLoaded] = useState(true);
  
  
  useEffect(() => {

    //get device location
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();

    //fetch city name according to device location
    if (location) {
      lat = JSON.stringify(location.coords.latitude);
      long = JSON.stringify(location.coords.longitude);
      fetchCityName(lat, long);
    }

    //fetch weather according to city name
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
  }


  async function fetchCityName(latitude, longitude){
  setLoaded(false);
  const API = `http://api.positionstack.com/v1/reverse?access_key=${geo_coding_api_key}&query=${latitude},${longitude}&limit=10&output=json`;
  try{
    const response = await fetch(API);
    if(response.status==200){
      const tottho = await response.json();
      console.log(tottho.data[0].region);
    }else{
      console.log('could not load city name according to geolocation')
    }
    setLoaded(true);
  }catch(error){
    console.warn(error);
  }
  }


  async function fetchWeatherData(cityName){
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`;
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
      <ActivityIndicator color="coral" size={36}/>
    </View>
    )
    
  }
  else if(weatherData == null){
      return(
      <View style={styles.nullContainer}>
        <SearchBar fetchWeatherData={fetchWeatherData}/>
        <Text style={styles.primaryText}>City Not Found! Wanna try searching different city? lat:{lat} long:{long}</Text>
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
