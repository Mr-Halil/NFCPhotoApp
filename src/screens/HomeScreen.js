import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// Slider component (horizontal scrollable images)
const Slider = () => {
  return (
    <View style={styles.sliderContainer}>
      {/* Slider Title */}
      <Text style={styles.sliderTitle}>Kategoriler</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.imageBox}></View>
        <View style={styles.imageBox}></View>
        <View style={styles.imageBox}></View>
        <View style={styles.imageBox}></View>
        <View style={styles.imageBox}></View>
        {/* To add more images here */}
      </ScrollView>
    </View>
  );
};

const ImageGrid = () => {
  const images = new Array(5).fill(null); // Create an array of 10 images

  return (
    <View style={styles.imageGridContainer}>
      <Text style={styles.gridTitle}>İlgini çekebilir</Text>
      
      {images.map((_, index) => {
        return (
          <View key={index} style={styles.imageRow}>
            <View style={styles.imageBox}></View>
            <View style={styles.imageBox}></View>
          </View>
        );
      })}
    </View>
  );
};

const HomeScreen = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        {/* Background Component */}
        <View style={styles.backgroundComponent}></View>

        {/* NFC APP Title (on top of the background) */}
        <Text style={styles.title}>NFC APP</Text>

        {/* Horizontal Scrollable Images */}
        <Slider />

        {/* Image Grid with 10 images */}
        <ImageGrid />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start', // Align at the top
    alignItems: 'center',
    position: 'relative', // Stacking context
    paddingTop: 160, // Push content down to give space
  },
  backgroundComponent: {
    position: 'absolute',
    top: 100,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#1e2a47', // Dark blue color
    borderTopLeftRadius: 40, // Smooth top left corner
    borderTopRightRadius: 40, // Smooth top right corner
    zIndex: -1, // Keep it in the background
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 30, // Space between title and top
    zIndex: 1, // Title should be above the background
    position: 'absolute',
    top: 20, // Title's top margin
  },
  sliderContainer: {
    width: 350, // Restrict the slider width
    overflow: 'hidden', // Ensure images stay within bounds
    alignItems: 'center', // Center the images horizontally
    marginTop: -20, // Space between slider and title
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
  // New Styles for the Image Grid
  imageGridContainer: {
    flexDirection: 'column', // Stack images vertically
    alignItems: 'center', // Center images horizontally
    marginTop: 30, // Space before grid
    paddingBottom: 30, // Add space at the bottom of the screen
  },
  gridTitle: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20, // Space between title and grid
  },
  imageRow: {
    flexDirection: 'row', // Display images side by side
    justifyContent: 'space-between', // Space out images evenly
    marginBottom: 20, // Space between rows
    width: '100%', // Ensure the row spans the full width
    paddingHorizontal: 20, // Horizontal padding for the row
  },
});

export default HomeScreen;
