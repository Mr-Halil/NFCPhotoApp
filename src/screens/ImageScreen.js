import React, { useLayoutEffect, useRef, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { captureRef } from 'react-native-view-shot';
import Svg, { Path } from 'react-native-svg';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

NfcManager.start();

const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params;
  const imageRef = useRef(null);
  const [capturedImageUri, setCapturedImageUri] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
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
        console.error('Capture failed', error);
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

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setImageLoadError(true);
    setImageLoaded(false);
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity ref={imageRef} style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </TouchableOpacity>

      {/* SVG image placed below the main image */}
      {svgPathData && (
        <>
          <Svg height="400" width="100%" viewBox="0 0 100 100" style={styles.capturedImage}>
            <Path d={svgPathData} fill="none" stroke="white" strokeWidth="1" />
          </Svg>
          <TouchableOpacity style={styles.button} onPress={writeToNFC}>
            <Text style={styles.buttonText}>
              Kılıfa Aktar <Text style={styles.emoji}>📲</Text>
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Button for capturing image */}
      {!svgPathData && (
        <TouchableOpacity style={styles.button} onPress={captureImage} disabled={!imageLoaded || imageLoadError}>
          <Text style={styles.buttonText}>
            Hadi Çizelim! <Text style={styles.emoji}>✏️</Text>
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  imageContainer: {
    width: '100%',
    height: 300, // Adjusted for image display
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
    height: 50,
    paddingVertical: 15,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 20,
    height: '100%',
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
    height: 300, // Increased height for SVG display
    resizeMode: 'contain',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ImageScreen;
