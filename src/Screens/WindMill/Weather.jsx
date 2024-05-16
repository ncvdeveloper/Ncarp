import React, { useEffect } from 'react';
import MapboxGL, { CircleLayer, HeatmapLayer, ShapeSource } from "@rnmapbox/maps";
import { StyleSheet, View } from 'react-native';
import CustomHeader from '../../Components/CustomHeader';
import WebView from 'react-native-webview';

const Weather = ({ navigation }) => {


MapboxGL.setAccessToken('pk.eyJ1IjoiYnNrLW5jdi10b29sa2l0cyIsImEiOiJjbHZ1aDg5a2MxODU4MmtueXQ3OHNwYmsyIn0.dI-Fd0xRSvnMwizAOIp0HA');
MapboxGL.setConnected(true);
MapboxGL.setTelemetryEnabled(false);
MapboxGL.setWellKnownTileServer('Mapbox');

  const htmll = `<!DOCTYPE html>
  <html>
  <head>
  <meta charset="utf-8">
  <title>Add a 3D model</title>
  <meta name="viewport" content="initial-scale=1,maximum-scale=1,user-scalable=no">
  <link href="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.css" rel="stylesheet">
  <script src="https://api.mapbox.com/mapbox-gl-js/v3.3.0/mapbox-gl.js"></script>
  <style>
  body { margin: 0; padding: 0; }
  #map { position: absolute; top: 0; bottom: 0; width: 100%; }
  </style>
  </head>
  <body>
  <script src="https://unpkg.com/three@0.126.0/build/three.min.js"></script>
  <script src="https://unpkg.com/three@0.126.0/examples/js/loaders/GLTFLoader.js"></script>
  <div id="map"></div>
  <script>
    mapboxgl.accessToken = 'pk.eyJ1IjoiYnNrLW5jdi10b29sa2l0cyIsImEiOiJjbHZ1aDg5a2MxODU4MmtueXQ3OHNwYmsyIn0.dI-Fd0xRSvnMwizAOIp0HA';
      const map = new mapboxgl.Map({
          container: 'map',
          // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
          style: 'mapbox://styles/mapbox/satellite-streets-v12',
          zoom: 12,
          center: [-114.26608, 32.7213],
          pitch: 80,
          antialias: true // create the gl context with MSAA antialiasing, so custom layers are antialiased
      });
  
      // parameters to ensure the model is georeferenced correctly on the map
      const modelOrigin = [-114.26608, 31.7213];
      const modelAltitude = 2;
      const modelRotate = [Math.PI / 2, 0, 0];
  
      const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
          modelOrigin,
          modelAltitude
      );
  
      // transformation parameters to position, rotate and scale the 3D model onto the map
      const modelTransform = {
          translateX: modelAsMercatorCoordinate.x,
          translateY: modelAsMercatorCoordinate.y,
          translateZ: modelAsMercatorCoordinate.z,
          rotateX: modelRotate[0],
          rotateY: modelRotate[1],
          rotateZ: modelRotate[2],
          /* Since the 3D model is in real world meters, a scale transform needs to be
           * applied since the CustomLayerInterface expects units in MercatorCoordinates.
           */
          scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
      };
  
      const THREE = window.THREE;
  
      // configuration of the custom layer for a 3D model per the CustomLayerInterface
      const customLayer = {
          id: '3d-model',
          type: 'custom',
          renderingMode: '3d',
          onAdd: function (map, gl) {
              this.camera = new THREE.Camera();
              this.scene = new THREE.Scene();
  
              // create two three.js lights to illuminate the model
              const directionalLight = new THREE.DirectionalLight(0xffffff);
              directionalLight.position.set(0, -70, 100).normalize();
              this.scene.add(directionalLight);
  
              const directionalLight2 = new THREE.DirectionalLight(0xffffff);
              directionalLight2.position.set(0, 70, 100).normalize();
              this.scene.add(directionalLight2);
  
              // use the three.js GLTF loader to add the 3D model to the three.js scene
              const loader = new THREE.GLTFLoader();
              loader.load(
                  'https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf',
                  (gltf) => {
                      this.scene.add(gltf.scene);
                  }
              );
              this.map = map;
  
              // use the Mapbox GL JS map canvas for three.js
              this.renderer = new THREE.WebGLRenderer({
                  canvas: map.getCanvas(),
                  context: gl,
                  antialias: true
              });
  
              this.renderer.autoClear = false;
          },
          render: function (gl, matrix) {
              const rotationX = new THREE.Matrix4().makeRotationAxis(
                  new THREE.Vector3(1, 0, 0),
                  modelTransform.rotateX
              );
              const rotationY = new THREE.Matrix4().makeRotationAxis(
                  new THREE.Vector3(0, 1, 0),
                  modelTransform.rotateY
              );
              const rotationZ = new THREE.Matrix4().makeRotationAxis(
                  new THREE.Vector3(0, 0, 1),
                  modelTransform.rotateZ
              );
  
              const m = new THREE.Matrix4().fromArray(matrix);
              const l = new THREE.Matrix4()
                  .makeTranslation(
                      modelTransform.translateX,
                      modelTransform.translateY,
                      modelTransform.translateZ
                  )
                  .scale(
                      new THREE.Vector3(
                          modelTransform.scale,
                          -modelTransform.scale,
                          modelTransform.scale
                      )
                  )
                  .multiply(rotationX)
                  .multiply(rotationY)
                  .multiply(rotationZ);
  
              this.camera.projectionMatrix = m.multiply(l);
              this.renderer.resetState();
              this.renderer.render(this.scene, this.camera);
              this.map.triggerRepaint();
          }
      };
  
      map.on('style.load', () => {
          map.addLayer(customLayer, 'waterway-label');
          map.addSource('mapbox-dem', {
            'type': 'raster-dem',
            'url': 'mapbox://mapbox.mapbox-terrain-dem-v1',
            'tileSize': 512,
            'maxzoom': 14
        });
        // add the DEM source as a terrain layer with exaggerated height
        map.setTerrain({ 'source': 'mapbox-dem', 'exaggeration': 1.5 });
      });
  </script>
  
  </body>
  </html>`
  return (
    <View style={styles.container}>
      <CustomHeader title={'Terrain View'} navigation={navigation} icon={'leftarrow'} />

      <MapboxGL.MapView
        style={styles.map}
        zoomEnabled={true}
        styleURL="mapbox://styles/mapbox/navigation-night-v1"
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(coords, selectedRouteProfile);
        }}>
        <MapboxGL.Camera
          zoomLevel={5}
          centerCoordinate={[12.48839, 50.72724]}
          animationMode={'flyTo'}
          animationDuration={6000}
        />
        {routeDirections && (
          <MapboxGL.ShapeSource id="line1" shape={routeDirections}>
            <MapboxGL.LineLayer
              id="routerLine01"
              style={{
                lineColor: '#FA9E14',
                lineWidth: 4,
              }}
            />
          </MapboxGL.ShapeSource>
        )}
        {destinationCoords && (
          <MapboxGL.PointAnnotation
            id="destinationPoint"
            coordinate={destinationCoords}>
            <View style={styles.destinationIcon}>
              <Ionicons name="storefront" size={24} color="#E1710A" />
            </View>
          </MapboxGL.PointAnnotation>
        )}
        <MapboxGL.UserLocation
          animated={true}
          androidRenderMode={'gps'}
          showsUserHeadingIndicator={true}
        />
      </MapboxGL.MapView>
      {/* <WebView
        source={{ html: htmll }}
      /> */}
    </View>
  );
};

export default Weather;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  map: {
    flex: 1,
  },
})