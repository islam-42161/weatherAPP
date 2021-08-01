import { StatusBar } from 'expo-status-bar';
import React,{useState,useEffect} from 'react';
import { ActivityIndicator, StyleSheet, Text, View,Dimensions } from 'react-native';
import Weather from './components/Weather';
import SearchBar from './components/SearchBar';

const API_KEY = "11ced9c0cfaf46a783f25dfb6343713d";


export default function App() {


  const [weatherData,setWeatherData] = useState(null);
  const [loaded,setLoaded] = useState(true);


  async function fetchWeatherData(cityName){
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
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

useEffect(() => {
  fetchWeatherData("Dhaka");
  console.log(weatherData);
},[])


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
        <Text style={styles.primaryText}>City Not Found! Try searching different city.</Text>
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
