import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { theme } from '../colors';
import Checkbox from 'expo-checkbox';

type Props = {
  id: string | number;
  text: string;
  finished?: boolean;
  onFinished?: (value: boolean) => void;
  onEdit?: () => void;
  editting?: boolean;
  onChangeText?: (text: string) => void;
  onSubmitEditing?: () => void;
  onDelete: () => void;
};

export default function ToDoItem({ id, text, finished, onFinished, onEdit, editting, onChangeText, onSubmitEditing, onDelete }: Props) {
  return (
    <View style={styles.item}>
      <Checkbox style={styles.checkbox} value={!!finished} onValueChange={onFinished} />
      {editting ? (
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          returnKeyType='done'
          autoFocus
        />
      ) : (
        <Text style={[styles.text, finished && styles.finished]}>{text}</Text>
      )}
      <TouchableOpacity onPress={onEdit} style={{ margin: 10 }} disabled={finished}>
        <AntDesign name="edit" size={24} color={finished ? "#808386ff" : "white"} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete} style={{ margin: 10 }}>
        <FontAwesome name="trash-o" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: theme.grey,
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    flex: 1,
    color: 'white',
    fontSize: 24,
  },
  input: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 16,
    fontSize: 24,
    paddingVertical: 0,
  },
  finished: {
    textDecorationLine: 'line-through',
  },
  checkbox: {
    marginRight: 12,
  },
});