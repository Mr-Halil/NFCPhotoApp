// src/components/ImageItem.js

import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ImageItem = ({ imageSource }) => {
  return (
    <View style={styles.container}>
      <Image source={imageSource} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 150,
    height: 150,
    marginHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 20,
  },
});

export default ImageItem;
