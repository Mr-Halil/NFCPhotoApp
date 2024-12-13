import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import NfcManager, { NfcTech } from 'react-native-nfc-manager';

const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params;
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageSize, setImageSize] = useState({ width: '100%', height: 300 }); // Başlangıç boyutları
  const [imageResized, setImageResized] = useState(false); // Yeni state, görselin boyutlandırılıp boyutlandırılmadığını kontrol eder

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: '',
    });
  }, [navigation]);

  useEffect(() => {
    NfcManager.start()
      .then(() => {
        console.log('NFC Manager started');
      })
      .catch((e) => console.log('Error starting NFC Manager:', e));

    return () => {
      NfcManager.stop();
      NfcManager.setEventListener('stateChange', 'off');
    };
  }, []);

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
      setImageSize({ width: 200, height: 416 });
      setImageResized(true);
    }
  };

  const handleNfcTransfer = async () => {
    try {
      // NFC ile aktarım işlemi
      await NfcManager.setEventListener('stateChange', 'on');
      
      // NFC yazma işlemi
      await NfcManager.requestTechnology(NfcTech.NfcA);
      const data = imageUrl; // Aktarılacak görselin URL'si
      const message = [{
        type: 'text',
        value: data,
      }];
      
      await NfcManager.writeNfcTag(message);
      Alert.alert('Başarılı', 'Görsel NFC ile aktarılıyor...');
    } catch (error) {
      console.log('NFC aktarım hatası: ', error);
      Alert.alert('Hata', 'Görsel aktarımında bir hata oluştu.');
    } finally {
      await NfcManager.setEventListener('stateChange', 'off');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.imageContainer}>
        <Image
          source={{ uri: imageUrl }}
          style={[styles.image, imageSize]} // Burada imageSize state'ini kullanıyoruz
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
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
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
