import React, { useLayoutEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageSize, setImageSize] = useState({ width: 200, height: 416 }); // Boyutları 200x416 olarak ayarladık
  const [imageResized, setImageResized] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
    });
  }, [navigation]);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageLoadError(false);
  };

  const handleImageError = () => {
    setImageLoadError(true);
    setImageLoaded(false);
  };

  const handleResizeImage = () => {
    if (!imageResized) {
      setImageSize({ width: 200, height: 416 }); // Boyutları burada da belirledik
      setImageResized(true);
    }
  };

  const handleNfcTransfer = async () => {
    try {
      // NFC transfer işlemi
      await NfcManager.requestTechnology(NfcTech.NfcA); // NFC teknolojisini kullan
      const data = imageUrl; // Göndermek istediğiniz görselin URL'si
      const message = [{
        type: 'text',
        value: data,
      }];
      
      // NFC etiketi yazma
      await NfcManager.writeNfcTag(message); 
      Alert.alert('Success', 'Image is being transferred via NFC...');
    } catch (error) {
      console.log('NFC transfer error: ', error);
      Alert.alert('Error', 'There was an error during image transfer.');
    } finally {
      await NfcManager.setEventListener('stateChange', 'off');
      await NfcManager.setEventListener('stateChange', 'on'); // Durum sıfırlama (isteğe bağlı)
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, imageSize]} // Boyutları imageSize state'inden alıyoruz
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      </TouchableOpacity>

      {!imageLoadError && !imageResized && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleResizeImage}
          disabled={!imageLoaded}
        >
          <Text style={styles.buttonText}>
            Hadi Çizelim! <Text style={styles.emoji}>✏️</Text>
          </Text>
        </TouchableOpacity>
      )}

      {imageResized && (
        <TouchableOpacity
          style={styles.button}
          onPress={handleNfcTransfer}
        >
          <Text style={styles.buttonText}>
            NFC ile Aktar <Text style={styles.emoji}>📲</Text>
          </Text>
        </TouchableOpacity>
      )}

      {imageLoadError && (
        <Text style={styles.errorText}>Görsel yüklenirken bir hata oluştu.</Text>
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
    height: 416, // Görselin boyutuna uygun bir container yüksekliği
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch', // Zorla boyutlara uydurmak için stretch
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
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 20,
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default ImageScreen;
