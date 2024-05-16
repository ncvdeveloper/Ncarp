import { Pressable, StyleSheet, Text, View, Image } from 'react-native';
import React, { Suspense, useState, useEffect, useRef } from 'react';
import MapboxGL, {
  ShapeSource,
  CircleLayer,
  Camera,
  Models,
  ModelLayer,
} from '@rnmapbox/maps';
import CustomHeader from '../../Components/CustomHeader';
import { Canvas } from '@react-three/fiber/native';
import Model from './src/components/Model';
import useControls from 'r3f-native-orbitcontrols';
import { useNavigation } from '@react-navigation/native';
import Trigger from './src/components/Trigger';
import Loader from './src/components/Loader';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { FONTS } from '../../Constants/fonts';
import { IMAGES } from "../../Constants/images";
import { COLORS } from "../../Constants/colors";
import { scaleHeight, scaleWidth, normalizeFont } from '../../Constants/dynamicSize';
MapboxGL.setAccessToken('sk.eyJ1IjoiYnNrLW5jdi10b29sa2l0cyIsImEiOiJjbHZ1dDIwNmQxb3Z5MnJycmp2b3JjODE0In0.i20ygdcCKF3w0xTispwyWg')

const WindMill = () => {

  const navigation = useNavigation();
  const [OrbitControls, events] = useControls()
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    Weather()
  }, [])
  const [weatherData, setWeatherData] = useState(null);
  const latitude = 32.7213; // Example latitude
  const longitude = -114.26608; // Example longitude
  const Weather = async () => {
    const apiKey = '3aec67bab2dd42b0b9264334240103';
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}&aqi=yes&days=4`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.log('Error fetching weather data');
    }
  };
  const [calloutVisible, setCalloutVisible] = useState(false);
  const [coordinates] = useState([-5, 55]);
  const onMarkerPress = () => {
    setCalloutVisible(true);
  };
  const chairref = useRef(null)
  const [night, setNight] = useState(true)
  const loadAnnotationUK = () => {
    return (
      <MapboxGL.PointAnnotation
        key="annotationUK"
        id="annotationUK"
        coordinate={[-114.26608, 32.7213]}
        onSelected={onMarkerPress}
      >


        <MapboxGL.Callout
          title="Weather Details"
          contentStyle={{ borderRadius: 5 }}
        >

          <View style={styles.weatherContainer}>
            <View style={styles.container1}>
              <Text style={styles.key}>Location: <Text style={styles.value}>{weatherData?.location?.name}</Text></Text>
              <Text style={styles.key}>State: <Text style={styles.value}>{weatherData?.location?.region}</Text></Text>
              <Text style={styles.key}>Country: <Text style={styles.value}>{weatherData?.location?.country}</Text></Text>
              <Text style={styles.key}>Temperature: <Text style={styles.value}>{weatherData?.current?.temp_c}°C</Text></Text>
              <Text style={styles.key}>Temperature: <Text style={styles.value}>{weatherData?.current?.temp_f}F</Text></Text>
              <Text style={styles.key}>Condition: <Text style={styles.value}>{weatherData?.current?.condition?.text}</Text></Text>
              <Text style={styles.key}>Wind Speed: <Text style={styles.value}>{weatherData?.current?.wind_mph}Mph</Text></Text>
              <Text style={styles.key}>Wind Speed: <Text style={styles.value}>{weatherData?.current?.wind_kph}Kph</Text></Text>
              <Text style={styles.key}>Wind degree: <Text style={styles.value}>{weatherData?.current?.wind_degree}Kph</Text></Text>
              <Text style={styles.key}>Wind direction: <Text style={styles.value}>{weatherData?.current?.wind_dir}</Text></Text>
              <Text style={styles.key}>Humidity: {weatherData?.current?.humidity}</Text>
            </View>
          </View>
        </MapboxGL.Callout>
      </MapboxGL.PointAnnotation>
    );
  };

  const data = {
    type: 'FeatureCollection',
    features: [
      // Add your GeoJSON features here
      // Example:
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [-114.26608, 32.6713], // Example coordinates
        },
        properties: {
          // You can add additional properties here
          weight: 1, // Example weight
        },
      },
      // Add more features as needed
    ],
  };

  const features = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'a-feature',
        properties: {
          icon: 'example',
          text: 'example-icon-and-label',
        },
        geometry: {
          type: 'Point',
          coordinates: [-114.29608, 32.7700],
        },
      },
      {
        type: 'Feature',
        id: 'b-feature',
        properties: {
          text: 'just-label',
        },
        geometry: {
          type: 'Point',
          coordinates: [-114.26608, 32.7613],
        },
      },
      {
        type: 'Feature',
        id: 'c-feature',
        properties: {
          icon: 'example',
        },
        geometry: {
          type: 'Point',
          coordinates: [-114.23608, 32.7513],
        },
      },
    ],
  };

  const features1 = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: 'a-feature',
        properties: {
          icon: 'example',
          text: 'example-icon-and-label',
        },
        geometry: {
          type: 'Point',
          coordinates: [12.48839, 50.72724],
        },
      },
    ],
  };

  const modelLayerStyle = {
    modelId: 'car',
    modelScale: [50, 50, 50],
  };

  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  useEffect(() => {
    const intervalId = setInterval(() => {
      setRotation(prevRotation => ({
        ...prevRotation,
        y: (prevRotation.y + 1) % 360, // Increment rotation around Y-axis
      }));
    }, 30); // Adjust the interval duration as needed

    return () => clearInterval(intervalId);
  }, []);
  const models = {
    car: require('./src/assets/windmill.glb'),
  };
  const models1 = {
    car: require('./src/assets/industry.glb'),
  };
  const circleLayerStyle = {
    ...styles.circleLayer,
    ...{ circleRadius: 10 },
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader title={'WindMill'} navigation={navigation} icon={'leftarrow'} />
      <MapboxGL.MapView style={{ flex: 1 }} styleURL='mapbox://styles/mapbox/satellite-streets-v12'>
        <Camera centerCoordinate={[-114.26608, 32.7213]} zoomLevel={15} pitch={80}
          heading={41}
          animationMode="flyTo"
          animationDuration={2000} />
        <Models models={models} />
        <ShapeSource id={'shape-source-id-0'} shape={features}>
          <CircleLayer
            id={'circle-layer'}
            style={circleLayerStyle}
            slot={'bottom'}
          />
          <ModelLayer id="model-layer-id" style={modelLayerStyle} />
        </ShapeSource>
        {/* <Models models={models1} />
        <ShapeSource id={'shape-source-id-1'} shape={features1}>
          <ModelLayer id="model-layer-id" style={modelLayerStyle} />
        </ShapeSource> */}
        <MapboxGL.HeatmapLayer
          id="custom-heatmap"
          sourceID="custom-heatmap-source"
          style={{ heatmapRadius: 20, heatmapWeight: 1 }}
        />
        <MapboxGL.ShapeSource
          id="custom-heatmap-source"
          shape={data}
          onPress={() => { }}
        />
        <MapboxGL.RasterDemSource
          id="mapbox-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxZoomLevel={14}
        />
        <MapboxGL.Terrain
          sourceID="mapbox-dem"
          exaggeration={1.5}
        />
        <MapboxGL.ShapeSource id="lineSource" shape={{
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: [
              [-114.26608, 32.7213],
              [-114.2655, 32.7116],
              [-114.2666, 32.7020],
              [-114.2670, 32.6917],
              [-114.26608, 32.6713],
            ],
          },
        }}>
          <MapboxGL.LineLayer
            id="lineLayer"
            style={{
              lineColor: 'yellow',
              lineWidth: 14,
            }}
          />
        </MapboxGL.ShapeSource>

        <View >{loadAnnotationUK()}</View>
      </MapboxGL.MapView>

    </SafeAreaView>
  );
};

export default WindMill;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7FB',
  },
  modelContainer: {
    width: 200,
    height: 200,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  textContainer: {
    margin: 20,
    marginBottom: 0,
  },
  textTitle: {
    fontSize: 28,
    color: '#051E47',
    fontWeight: 'bold',
  },
  textPrice: {
    fontSize: 28,
    color: '#3F6900',
    fontWeight: 'bold',
  },
  text: {
    color: 'black',
    fontSize: 16,
    textAlign: 'justify',
    marginVertical: 10,
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3F6900',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
  textButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  map: {
    flex: 1
  },
  box: {
    width: scaleWidth(100),
    backgroundColor: COLORS.WHITE
  },
  container1: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    top: 2
  },
  weatherContainer: {
    backgroundColor: COLORS.WHITE,
    width: scaleWidth(250),
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    bottom: 20
  },
  key: {
    fontFamily: FONTS.NUNITOSANSBOLD,
    fontWeight: 'bold',
    fontSize: normalizeFont(14),
    color: COLORS.BLACK
  },
  value: {
    fontFamily: FONTS.NUNITOSANSMEDIUM,
    fontSize: normalizeFont(14),
    color: COLORS.RED
  },
  circleLayer: {
    circleRadiusTransition: { duration: 5000, delay: 0 },
    circleColor: COLORS.HEADER,
  },
});
