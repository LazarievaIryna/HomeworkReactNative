import React from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

// Component
const PostItem = ({
  image,
  title,
  id,
  location,
  comments = [],
  navigation,
}) => {
  const { locationTitle } = location;

  return (
    <View style={styles.PostContainer}>
      <Image style={styles.image} source={{ uri: image }} />
      <Text style={styles.Title}>{title}</Text>

      <View style={styles.addInfoContainer}>
        <TouchableOpacity
          style={styles.comments}
          onPress={() => {
            navigation.navigate('Коментарі', { postId: id, image });
          }}
        >
          <Feather name="message-circle" size={24} color="#BDBDBD" />
          <Text style={styles.addInfoText}>{comments.length}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.location}
          onPress={() => {
            navigation.navigate('Мапа', { location });
          }}
        >
          <Feather name="map-pin" size={24} color="#BDBDBD" />
          <Text
            style={{ ...styles.addInfoText, textDecorationLine: 'underline' }}
          >
            {locationTitle}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  PostContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginBottom: 32,
  },
  image: {
    height: 240,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  Title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 8,
  },
  addInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  comments: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addInfoText: {
    marginLeft: 6,
    color: '#212121',
  },
});