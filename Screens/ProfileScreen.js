import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ImageBackground,
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';

import { fireStore } from '../firebase/config';
import PostItem from '../Components/PostItem'
import { getUserData } from '../redux/selectors';

// Component
const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login, uid } = useSelector(getUserData);

  // FUNCTIONS
  const getUserPosts = async () => {
    const postsRef = collection(fireStore, 'posts');
    const q = query(postsRef, where('uid', '==', uid));
    const querySnapshot = await getDocs(q);

    const postsArr = querySnapshot.docs.map(doc => {
      return { ...doc.data(), id: doc.id };
    });

    console.log(postsArr);
    setPosts(postsArr);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserPosts();
    }, [])
  );

  return (
    <ImageBackground
      style={styles.bcgImage}
      source={require('../assets/images/PhotoBG.jpeg')}
    >
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <Image
            style={styles.profilePhoto}
            source={require('../assets/images/avatar.jpg')}
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{login}</Text>
          </View>
        </View>

        <FlatList
          data={posts}
          renderItem={({ item }) => (
            <PostItem
              id={item.id}
              image={item.photoURL}
              title={item.title}
              location={item.locationData}
              comments={item.comments}
              navigation={navigation}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 100,
    marginBottom: -100,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    backgroundColor: '#fff',
  },
  bcgImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  profileContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    marginBottom: 16,
  },
  profilePhoto: {
    height: 120,
    width: 120,
    borderRadius: 16,
    marginBottom: 16,
    marginTop: -60,
  },
  profileInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileName: {
    fontSize: 30,
    lineHeight: 35,
    // fontWeight: 'bold',
    fontFamily: "Roboto-Bold",
  },
  profileMail: {
    fontSize: 16,
    color: 'gray',
  },
});

export default ProfileScreen;