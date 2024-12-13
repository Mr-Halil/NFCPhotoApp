import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, StatusBar, Image } from 'react-native';
import axios from 'axios';

// Unsplash API setup
const UNSPLASH_ACCESS_KEY = 'kkCmW2WRvd6zfC8qQOk7-snvYog3_JTQIJs7DLRb29U'; // Replace with your own API key
const UNSPLASH_API_URL = 'https://api.unsplash.com/photos/?client_id=' + UNSPLASH_ACCESS_KEY;

const Slider = () => {
  return (
    <View style={styles.sliderContainer}>
      <Text style={styles.sliderTitle}>Kategoriler</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imageBox}>
          <Text style={styles.emoji}>🚀</Text>
        </View>
        <View style={styles.imageBox}>
          <Text style={styles.emoji}>🍼</Text>
        </View>
        <View style={styles.imageBox}>
          <Text style={styles.emoji}>💀</Text>
        </View>
        <View style={styles.imageBox}></View>
        <View style={styles.imageBox}></View>
      </ScrollView>
    </View>
  );
};

const ImageGrid = () => {
  const [images, setImages] = useState([]);

  // Fetch images from Unsplash API
  useEffect(() => {
    axios
      .get(UNSPLASH_API_URL)
      .then((response) => {
        setImages(response.data);
      })
      .catch((error) => {
        console.error('Error fetching images from Unsplash:', error);
      });
  }, []);

  return (
    <View style={styles.imageGridContainer}>
      <Text style={styles.gridTitle}>İlgini çekebilir</Text>

      {images.length > 0 ? (
        images.map((image, index) => (
          <View key={index} style={styles.imageRow}>
            <View style={styles.imageBox}>
              <Image
                source={{ uri: image.urls.small }}
                style={{ width: '100%', height: '100%', borderRadius: 10 }}
              />
            </View>
            {index + 1 < images.length && (
              <View style={styles.imageBox}>
                <Image
                  source={{ uri: images[index + 1].urls.small }}
                  style={{ width: '100%', height: '100%', borderRadius: 10 }}
                />
              </View>
            )}
          </View>
        ))
      ) : (
        <Text style={{ color: 'white' }}>Loading images...</Text>
      )}
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <View style={styles.backgroundComponent}></View>
        <Text style={styles.title}>NFC APP</Text>
        <Slider />
        <ImageGrid />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'relative',
    paddingTop: 160,
  },
  backgroundComponent: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: -1,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10,
    zIndex: 1,
    position: 'absolute',
    top: 20,
  },
  sliderContainer: {
    width: 350,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: -20,
  },
  sliderTitle: {
    fontSize: 25,
    marginBottom: 10,
    marginLeft: 25,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'left',
    width: '100%',
  },
  imageBox: {
    width: 150,
    height: 150,
    margin: 7,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  imageGridContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 30,
    paddingBottom: 30,
  },
  gridTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  emoji: {
    fontSize: 50,
    textAlign: 'center',
    alignSelf: 'center',
    marginTop: 50,
  },
});

export default HomeScreen;
