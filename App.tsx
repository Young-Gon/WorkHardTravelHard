import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { theme } from './colors';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ToDoItem from './components/ToDoItem';

export default function App() {
  type ToDo = {
    text: string;
    work: boolean;
    finished: boolean;
  };
  const [working, setWorking] = useState(true);
  const [input, setInput] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [toDos, setToDos] = useState<{ [key: string]: ToDo }>({});

  function onTabClick(tab: boolean) {
    setWorking(tab);
    setInput("");
  }

  function addToDo(): void {
    if (input === "") {
      return;
    }
    const id = Date.now().toString();
    const newToDos = { ...toDos, [id]: { text: input, work: working, finished: false } };
    setToDos(newToDos);
    saveToDos(newToDos);
    setInput("");
  }

  async function saveToDos(toSave: { [key: string]: ToDo }) {
    await AsyncStorage.setItem("toDos", JSON.stringify(toSave));
  }

  async function loadToDos() {
    const toDos = await AsyncStorage.getItem("toDos");
    console.log("Loaded ToDos: ", toDos);
    if (toDos !== null) {
      setToDos(JSON.parse(toDos));
    }
  }

  function deleteToDo(id: string) {
    Alert.alert("Delete To Do", "Are you sure?", [
      {
        text: "Cancel",
        style: "cancel"
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: () => {
          const newToDos = { ...toDos };
          delete newToDos[id];
          setToDos(newToDos);
          saveToDos(newToDos);
        }
      }
    ]);
  }

  useEffect(() => {
    loadToDos();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onTabClick(true)}>
          <Text style={{ ...styles.btnText, color: working ? "white" : theme.grey }}>Work</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onTabClick(false)}>
          <Text style={{ ...styles.btnText, color: !working ? "white" : theme.grey }}>Travel</Text>
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
            <ToDoItem
              key={key}
              id={key}
              text={value.text}
              finished={value.finished}
              onFinished={(newValue) => {
                const newToDos = { ...toDos, [key]: { ...toDos[key], finished: newValue } };
                setToDos(newToDos);
                saveToDos(newToDos);
              }}
              onEdit={() => {
                setEditingId((prev) => {
                  if (prev === key){
                    loadToDos();
                    return null;
                  }
                  return key;
                }); /* setInput(value.text);  */
              }}
              editting={editingId === key}
              onChangeText={(newText) => {
                const newToDos = { ...toDos, [key]: { ...toDos[key], text: newText } };
                setToDos(newToDos);
                // saveToDos(newToDos);
              }}
              onSubmitEditing={() => {
                setEditingId(null);
                saveToDos(toDos);
              }}
              onDelete={() => deleteToDo(key)}
            />
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
  header: {
    flexDirection: 'row',
    marginTop: 100,
    justifyContent: 'space-between',
  }
  , btnText: {
    color: 'white',
    fontSize: 44,
    marginHorizontal: 12,
    fontWeight: '600',
  }
  , input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginVertical: 20,
    fontSize: 18,
  }
});
