import React,{useState,useEffect} from 'react'
import { View, Text,StyleSheet,ImageBackground,Image,Dimensions,StatusBar} from 'react-native';
import SearchBar from './SearchBar';
import {haze,rainy,snow,sunny} from '../assets/background/index';


const Weather = ({weatherData , fetchWeatherData}) => {

    const [backgroundImage,setBackgroundImage] = useState(null);
    const {
        weather,
        name,
        main:{temp,humidity},
        wind:{speed}
        } = weatherData;
    const [{main}] = weather;
    useEffect(() => {
        setBackgroundImage(getBackgroundImage(main));
    },[weatherData])


    function getBackgroundImage(weather) {
        if(weather==="Snow") return snow
        if(weather==="Clear") return sunny
        if(weather==="Rain") return rainy
        if(weather==="Haze") return haze
        return haze;
    }

    let textColor = backgroundImage !== sunny ? 'white':'black';


    return (
        <View style={styles.container}>
            <StatusBar style={styles.statusBar} />        
            <ImageBackground source={backgroundImage}
            style = {styles.backgroundImage}
            resizeMode='cover'
            >

            <SearchBar fetchWeatherData={fetchWeatherData}/>
            <View styles={styles.info}>
                <Text style={{...styles.headerText,color:textColor,fontWeight:"bold",fontSize:50}}>{name}</Text>
                <Text style={{...styles.headerText,color:textColor,fontWeight:"bold"}}>{main}</Text>
                <Text style={{...styles.headerText,color:textColor}}>{temp} °C</Text>

            
            </View>
            <View style={styles.extraInfo}>

                <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',marginTop:10,color:textColor}}>Humidity: {humidity} %</Text>
                <Text style={{fontSize:22,textAlign:'center',fontWeight:'bold',marginTop:10,color:textColor}}>Wind Speed: {speed} m/s</Text>

            </View>

            </ImageBackground>
            </View>
    )
}

export default Weather
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    backgroundImage:{
        flex: 1,
        padding:10,
        width:Dimensions.get('screen').width
    },
    headerText: {
        fontSize:36,
        marginTop:10,
        textAlign:'center'
    },
    info:{
        alignItems: 'center',
        marginTop:10,
        justifyContent:'space-between',
        padding:10,
    },
    extraInfo:{
        marginTop:10,
        justifyContent:'space-between',
        padding:10,
        backgroundColor:'rgba(0,0,0,0.3)',
        alignItems: 'center',
        borderRadius:10
    }
  });