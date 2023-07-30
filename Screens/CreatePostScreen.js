import React, { useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from 'react-native';

//Firebase
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { fireStore } from '../firebase/config';

//Expo
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const cameraHeight = width - 32;

//Selector
import { getUserData } from '../redux/selectors';

//============= Component
const CreatePostScreen = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isScreenFocused, setScreenFocus] = useState(false);
  const [title, setTitle] = useState('');
  const [locationTitle, setLocationTitle] = useState('');
  const { login, uid } = useSelector(getUserData);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        await MediaLibrary.requestPermissionsAsync();
        await requestPermission();
        await Location.requestForegroundPermissionsAsync();
      })();

      setScreenFocus(true);
      return () => {
        setScreenFocus(false);
      };
    }, [navigation])
  );

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // add Photo
  const handleImageUpload = async () => {
    const { uri } = await cameraRef.takePictureAsync();
    setImage(uri);
  };

  // ========= Publication

  const addPhotoToServer = async () => {
    try {
      const response = await fetch(image);
      const file = await response.blob();
      const photoID = nanoid();

      const storage = getStorage();
      const storageRef = ref(storage, `postImages/${photoID}`);

      // add photo to storage
      await uploadBytes(storageRef, file);

      const downloadURL = await getDownloadURL(
        ref(storage, `postImages/${photoID}`)
      );
      return downloadURL;
    } catch (error) {
      console.log(error);
    }
  };

  // add photo to server
  const addPostToServer = async () => {
    try {
      const geoPosition = await Location.getCurrentPositionAsync({});
      const photoURL = await addPhotoToServer();
      await addDoc(collection(fireStore, 'posts'), {
        uid,
        login,
        title,
        locationData: { geoPosition, locationTitle },
        photoURL,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handlePublish = async () => {
    try {
      setLoading(true);

      await addPostToServer();

      setImage('');
      setTitle('');
      setLocationTitle('');
      setLoading(false);

      navigation.navigate('Пости');
    } catch (error) {
      console.log(error);
    }
  };

  // =========== Screen

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {isScreenFocused && (
          <View style={styles.cameraContainer}>
            <Camera
              style={{
                ...styles.camera,
                height: isShowKeyboard ? 100 : cameraHeight,
              }}
              type={CameraType.back}
              ref={setCameraRef}
              ratio="1:1"
            >
              {image && (
                <View style={styles.photoContainer}>
                  <Image
                    source={{ uri: image }}
                    style={{ height: 100, width: 100 }}
                  />
                </View>
              )}

              <TouchableOpacity
                style={styles.cameraIconContainer}
                onPress={handleImageUpload}
              >
                <Ionicons name="camera" size={24} color="#fff" />
              </TouchableOpacity>
            </Camera>
            <Text style={{ color: '#BDBDBD' }}>Завантажте фото</Text>
          </View>
        )}

        <TextInput
          style={styles.input}
          placeholder="Назва..."
          value={title}
          onChangeText={setTitle}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
        <TextInput
          style={styles.input}
          placeholder="Місцевість..."
          value={locationTitle}
          onChangeText={setLocationTitle}
          onFocus={() => {
            setIsShowKeyboard(true);
          }}
        />
        <TouchableOpacity
          disabled={!title || !locationTitle || !image || loading}
          style={{
            ...styles.uploadButton,
            ...(image && title && locationTitle
              ? styles.publishButton
              : styles.disabledButton),
          }}
          onPress={handlePublish}
        >
          <Text
            style={
              image && title && locationTitle
                ? styles.publishText
                : styles.disabledText
            }
          >
            {loading ? 'Завантажується...' : 'Опублікувати'}
          </Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 32,
    paddingRight: 16,
    paddingLeft: 16,
    backgroundColor: '#fff',
  },

  cameraContainer: {
    marginBottom: 32,
  },
  camera: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  photoContainer: {
    position: 'absolute',
    borderBottomWidth: 1,
    borderRightWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    top: 0,
    left: 0,
  },

  cameraIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  uploadText: {
    fontSize: 16,
    color: '#666',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',

    padding: 8,
    marginBottom: 16,
  },

  uploadButton: {
    padding: 12,
    borderRadius: 100,
    alignItems: 'center',
    marginTop: 32,
  },

  publishButton: {
    backgroundColor: '#FF6C00',
  },
  disabledButton: {
    backgroundColor: '#F6F6F6',
  },
  publishText: {
    color: '#fff',
    fontSize: 16,
  },
  disabledText: {
    color: '#BDBDBD',
    fontSize: 16,
  },
});

export default CreatePostScreen;