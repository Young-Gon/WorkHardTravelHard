import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [working, setWorking] = useState(true);
  const [input, setInput] = useState("");
  const [toDos, setToDos] = useState<{[key: number]: {text: string, work:boolean}}>({});

  function onTabClick(tab: boolean) {
    setWorking(tab);
    setInput("");
  }

  function addToDo(): void {
    if(input === "") {
      return;
    }
    const id = Date.now();
    const newToDos = {...toDos, [id]: {text: input, work: working}};
    setToDos(newToDos);
    saveToDos(newToDos);
    setInput("");
  }

  async function saveToDos(toSave: {[key: number]: {text: string, work:boolean}}) {
    await AsyncStorage.setItem("toDos", JSON.stringify(toSave));
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
      <TextInput
        value={input}
        onChangeText={setInput}
        onSubmitEditing={addToDo}
        returnKeyType='done'
        placeholder={working ? "Add a To Do" : "Where do you want to go?"}
        style={styles.input}
      />
      <ScrollView>
        {Object.entries(toDos).map(([key, value]) => 
          value.work === working && (
            <View key={key} style={{backgroundColor: theme.grey, padding: 20, borderRadius: 10, marginBottom: 10}}>
              <Text style={{color: "white", fontSize: 24}}>{value.text}</Text>
            </View>
          )
        )}
      </ScrollView>
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
