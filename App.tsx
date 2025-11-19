import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import { useState } from 'react';

export default function App() {
  const [working, setWorking] = useState(true);
  const [input, setInput] = useState("");

  function onTabClick(tab: boolean) {
    setWorking(tab);
    setInput("");
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onTabClick(true)}>
          <Text style={{...styles.btnText, color: working?"white":theme.grey}}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClick(false)}>
          <Text style={{...styles.btnText, color: !working?"white":theme.grey}}>Travel</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={working ? "Add a To Do" : "Where do you want to go?"}
          style={styles.input}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
    paddingHorizontal: 20,
  },
  header:{
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between',
  }
  ,btnText: {
    fontSize: 44,
    marginHorizontal: 12,
    fontWeight: '600',
  }
  ,input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  }
});
