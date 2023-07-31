import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { doc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';

import { fireStore } from '../firebase/config';
import { getUserData } from '../redux/selectors';
import CommentItem from '../Components/CommentItem';


//Component
const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [allComments, setAllComments] = useState([]);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const { login } = useSelector(getUserData);
  const { postId, image } = route.params;

  // FUNCTIONS
  const getAllComments = async () => {
    try {
      const docRef = doc(fireStore, 'posts', postId);
      const thisDoc = await getDoc(docRef);
      setAllComments(() => thisDoc.data().comments);
    } catch (error) {
      console.log(error);
    }
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  // send comment
  const handleSendComment = async () => {
    const newComment = {
      login,
      comment,
      
    };

    try {
      const docRef = doc(fireStore, 'posts', postId);
      await updateDoc(docRef, {
        comments: arrayUnion(newComment),
      });
      setComment('');
      keyboardHide();
      getAllComments();
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getAllComments();
    }, [])
  );

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {!isShowKeyboard && (
          <>
            <Image style={styles.image} source={{ uri: image }} />

            <View style={styles.commentsContainer}>
              <FlatList
                data={allComments}
                renderItem={({ item }) => <CommentItem commentData={item} />}
                keyExtractor={(_, index) => index.toString()}
              />
            </View>
          </>
        )}

        <View style={styles.addComment}>
          <TextInput
            style={styles.input}
            placeholder="Коментувати..."
            value={comment}
            onChangeText={setComment}
            onFocus={() => {
              setIsShowKeyboard(true);
            }}
          />
          <TouchableOpacity
            disabled={!comment}
            style={{
              ...styles.addCommentButton,
              ...(comment ? styles.activeButton : styles.disabledButton),
            }}
            onPress={handleSendComment}
          >
            <Feather name="arrow-up" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 16,
    paddingRight: 16,
    paddingLeft: 16,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  image: {
    height: 240,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 16,
  },
  commentsContainer: {
    flex: 1,
  },
  addComment: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 100,
    marginTop: 8,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    marginRight: 16,
    paddingLeft: 16,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
    fontSize: 16,
  },
  addCommentButton: {
    justifyContent: 'center',
    alignItems: 'center',

    borderRadius: 100,
    width: 34,
    height: 34,
  },

  activeButton: { backgroundColor: '#FF6C00' },
  disabledButton: { backgroundColor: '#F6F6F6' },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 16,
    marginRight: 8,
    marginLeft: 8,
  },
  commentTextContainer: {
    flex: 1,
    marginLeft: 8,
  },
  commentText: {
    fontSize: 16,
  },
  commentDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    textAlign: 'right',
  },
});

export default CommentsScreen;