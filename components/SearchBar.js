import React,{useState} from 'react'
import { View, TextInput,StyleSheet } from 'react-native'
import { EvilIcons } from '@expo/vector-icons'; 

const SearchBar = ({fetchWeatherData}) => {


    const [cityName,setCityName] = useState("");

    return (
        <View style={styles.searchBar}>
        <TextInput 
        placeholder="Enter city name: "
        value={cityName}
        onChangeText={(text) =>setCityName(text)}
        onSubmitEditing = {()=>fetchWeatherData(cityName)}
        />
        <EvilIcons name="search" size={24} color="black" onPress={() =>fetchWeatherData(cityName)} />
        </View>
    )
}

export default SearchBar
const styles = StyleSheet.create({


    searchBar: {
        marginTop:35,
        flexDirection:'row',
        backgroundColor: 'rgba(0,0,0,0.3)',
        padding:10,
        borderRadius:10,
        alignItems: 'center',
        justifyContent: 'space-between'
    }

})