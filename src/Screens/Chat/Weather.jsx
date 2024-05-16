import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { COLORS } from '../../Constants/colors';
import {
  normalizeFont,
  scaleHeight,
  scaleWidth,
} from '../../Constants/dynamicSize';
import { FONTS } from '../../Constants/fonts';
import { Divider, Icon } from 'react-native-elements';

const Weather = ({ navigation }) => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '3aec67bab2dd42b0b9264334240103';

  const getWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=53,-0.12`
      );
      console.log("ewfewrferferf", JSON.stringify(response.data))
      setWeatherData(response.data);
      setError('');
    } catch (error) {
      setWeatherData(null);
      setError('Error fetching weather data');
    }
  };

  return (
    <View style={styles.container}>
      
      <View
        style={{
          flexDirection: 'row',
          height: scaleHeight(60),
          alignItems: 'center',
          alignContent: 'center',
          width: '100%',
          backgroundColor: COLORS.BGCOLOR,
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('SideTab')} style={{ alignSelf: 'flex-start' }}>
          <Icon name='arrowleft' size={scaleHeight(35)} type='antdesign' color={COLORS.WHITE} style={{ marginTop: scaleHeight(10), marginLeft: scaleWidth(20) }} />
        </TouchableOpacity>
        <Text style={styles.title}>Weather</Text>
      </View>
    
      <View style={{ marginVertical: scaleHeight(30),marginHorizontal: scaleWidth(16) }}>
        <TextInput
          style={styles.input}
          placeholder="Enter city name"
          value={city}
          onChangeText={(text) => setCity(text)}
        />
        <Button title="Get Weather" color={COLORS.BGCOLOR} onPress={getWeather} />

        {weatherData && (
          <View style={styles.weatherContainer}>
            <Text style={styles.key}>Location: <Text style={styles.value}>{weatherData.location.name}</Text></Text>
            <Text style={styles.key}>State: <Text style={styles.value}>{weatherData.location.region}</Text></Text>
            <Text style={styles.key}>Country: <Text style={styles.value}>{weatherData.location.country}</Text></Text>
            <Text style={styles.key}>Temperature: <Text style={styles.value}>{weatherData.current.temp_c}°C</Text></Text>
            <Text style={styles.key}>Temperature: <Text style={styles.value}>{weatherData.current.temp_f}F</Text></Text>
            <Text style={styles.key}>Condition: <Text style={styles.value}>{weatherData.current.condition.text}</Text></Text>
            <Text style={styles.key}>Wind Speed: <Text style={styles.value}>{weatherData.current.wind_mph}Mph</Text></Text>
            <Text style={styles.key}>Wind Speed: <Text style={styles.value}>{weatherData.current.wind_kph}Kph</Text></Text>
            <Text style={styles.key}>Wind degree: <Text style={styles.value}>{weatherData.current.wind_degree}Kph</Text></Text>
            <Text style={styles.key}>Wind direction: <Text style={styles.value}>{weatherData.current.wind_dir}</Text></Text>
            <Text style={styles.key}>Humidity: {weatherData.current.humidity}</Text>
          </View>
        )}

        {error !== '' && <Text style={styles.errorText}>{error}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    width: '100%',
  },
  weatherContainer: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: normalizeFont(24),
    fontWeight: 'bold',
    color: COLORS.WHITE,
    flex: 1,
    fontFamily: FONTS.NUNITOSANSBOLD,
    right: scaleWidth(30)
  },
  key:{
    fontFamily: FONTS.NUNITOSANSBOLD,
    fontWeight: 'bold',
    fontSize: normalizeFont(20),
    color: COLORS.BLACK
  },
  value:{
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    fontSize: normalizeFont(16),
    color: COLORS.RED
  }
});

export default Weather;