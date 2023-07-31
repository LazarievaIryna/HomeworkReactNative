import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const CommentItem = ({ commentData }) => {
  const { login, comment, date } = commentData;
  return (
    <View style={styles.commentContainer}>
      <Text style={styles.nickname}>{login}</Text>
      <View style={styles.textContainer}>
        <Text style={styles.comment}>{comment}</Text>
        <Text
          style={styles.commentDate}
        >{`${date.fullDate} | ${date.time}`}</Text>
      </View>
    </View>
  );
};

export default CommentItem;

const styles = StyleSheet.create({
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  nickname: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  comment: {
    fontSize: 13,
    color: '#212121',
    lineHeight: 18,
    marginBottom: 5,
  },
  commentDate: {
    fontSize: 14,
    color: '#BDBDBD',
    alignSelf: 'flex-end',
  },
});