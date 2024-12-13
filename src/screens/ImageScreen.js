import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Svg, { Path } from 'react-native-svg';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params;
  const imageRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [svgPathData, setSvgPathData] = useState(null);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
    });
  }, [navigation]);

  const captureImage = async () => {
    if (imageRef.current && imageLoaded) {
      try {
        const uri = await captureRef(imageRef, {
          format: 'png',
          quality: 0.8,
        });
        setCapturedImageUri(uri);
        convertImageToSVG(uri);
      } catch (error) {
        console.error('Captasdfsdfure failed', error);
        Alert.alert('Error', 'Failed to capture the image.');
      }
    } else {
      Alert.alert('Error', 'Image is not ready for capture.');
    }
  };

  const convertImageToSVG = (imageUri) => {
    // Mock conversion logic: Replace this with a real vectorization process.
    const mockPathData = 'M10 10 H 90 V 90 H 10 L 10 10';
    setSvgPathData(mockPathData);
  };

  const writeToNFC = async () => {
    if (!svgPathData) {
      Alert.alert('Error', 'No SVG data to write.');
      return;
    }

    try {
      await NfcManager.requestTechnology(NfcTech.Ndef);
      const message = [{
        type: 'text/plain',
        payload: svgPathData,
      }];
      await NfcManager.ndefHandler.writeNdefMessage(message);
      Alert.alert('Success', 'SVG data written to NFC tag!');
    } catch (error) {
      console.error('NFC write failed', error);
      Alert.alert('Error', 'Failed to write to NFC tag.');
    } finally {
      NfcManager.cancelTechnologyRequest();
    }
  };

  return (
    <View style={styles.container}>
      <View ref={imageRef} style={styles.imageContainer}>
        {!imageLoaded ? (
          <ActivityIndicator size="large" color="#FF6347" />
        ) : (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            onLoad={() => setImageLoaded(true)}
          />
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={captureImage}>
        <Text style={styles.buttonText}>
          Hadi Çizelim! <Text style={styles.emoji}>✏️</Text>
        </Text>
      </TouchableOpacity>

      {svgPathData && (
        <>
          <Svg height="300" width="100%" viewBox="0 0 100 100" style={styles.capturedImage}>
            <Path d={svgPathData} fill="none" stroke="white" strokeWidth="1" />
          </Svg>
          <TouchableOpacity style={styles.button} onPress={writeToNFC}>
            <Text style={styles.buttonText}>
              NFC'ye Aktar <Text style={styles.emoji}>📲</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  imageContainer: {
    width: '100%',
    height: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  button: {
    width: '100%',
    paddingVertical: 15,
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  capturedImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginTop: 20,
  },
});

export default ImageScreen;
