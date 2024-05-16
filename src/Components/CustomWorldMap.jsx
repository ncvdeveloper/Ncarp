import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Polyline, } from 'react-native-maps';
import { scaleWidth, scaleHeight } from '../Constants/dynamicSize';
import { Icon } from 'react-native-elements'
const CustomWorldMap = ({ navigation }) => {

  return (
    <SafeAreaView style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapcontainer}
        zoomControlEnabled={false}
        mapType='standard'
        userInterfaceStyle='light'
        initialRegion={{
          latitude: 60.0479,
          longitude: 70.6197,
          latitudeDelta: 60,
          longitudeDelta: 60,
        }}
        zoomEnabled={false}
      >
        <Marker coordinate={{
          latitude: 12.999830,
          longitude: 80.194832,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} >
          <Icon
            name="location-sharp"
            color="#FF0000"
            size={30}
            type='ionicon'
          />
        </Marker>

        <Marker coordinate={{
          latitude: 39.9042,
          longitude: 116.4074,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} >
          <Icon
            name="location-sharp"
            color="#00B050"
            size={30}
            type='ionicon'
          />
        </Marker>

        <Marker coordinate={{
          latitude: 39.9042,
          longitude: 116.4074,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} >
          <Icon
            name="location-sharp"
            color="#00B050"
            size={30}
            type='ionicon'
          />
        </Marker>
        <Marker coordinate={{
          latitude: 23.8859,
          longitude: 45.0792,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }} >
          <Icon
            name="location-sharp"
            color="#FFC000"
            size={30}
            type='ionicon'
          />
        </Marker>
      </MapView>
    </SafeAreaView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapcontainer: {
    flex: 1,
    width: scaleWidth(300),
    height: Dimensions.get('window').height,
  },
});

export default CustomWorldMap;