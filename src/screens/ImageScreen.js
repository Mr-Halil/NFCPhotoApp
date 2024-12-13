import React, { useLayoutEffect } from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ImageScreen = ({ route, navigation }) => {
  const { imageUrl } = route.params; // Get the image URL from the route params

  // Remove the navigation bar and change the header title when this screen is loaded
  useLayoutEffect(() => {
    navigation.setOptions({ 
      headerShown: true,      // Eğer header'ı göstermek isterseniz
      title: ''    // Burada başlık metnini değiştirebilirsiniz
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      
      {/* Button below the image */}
      <TouchableOpacity style={styles.button} onPress={() => alert('Hadi Çizelim!')}>
        <Text style={styles.buttonText}>
          Hadi Çizelim! <Text style={styles.emoji}>✏️</Text>
        </Text>
      </TouchableOpacity>
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
  image: {
    width: '100%',
    height: '80%', // Görselin yüksekliğini %80 yapabilirsiniz
    resizeMode: 'contain',
  },
  button: {
    width: '100%',          // Buton yatayda %100 genişlikte
    paddingVertical: 15,    // Dikeyde biraz boşluk ekliyoruz
    backgroundColor: '#FF6347', // Buton rengi
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,          // Görselin altına biraz mesafe ekliyoruz
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emoji: {
    fontSize: 20,   // Emoji boyutu
    marginLeft: 10, // Yazı ile emoji arasına boşluk
  },
});

export default ImageScreen;
