import { FontAwesome6 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import Task, { TaskType } from "./components/task";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-items", jsonValue);
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-items");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export default function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);
  const [currentEdit, setCurrentEdit] = useState<string | null>(null);

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setTasks(data);
      }
    });
  }, []);

  const onNameChange = (id: string, name: string, newName: string) => {
    if (newName === name) return;
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, name: newName };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onIncrement = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, count: task.count + 1 };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onDecrement = (id: string) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, count: task.count - 1 };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onDelete = (id: string) => {
    const newTasks = tasks.filter((task) => task.id !== id);
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onAddTask = () => {
    const newTasks = [
      ...tasks,
      {
        name: `Task ${tasks.length + 1}`,
        count: 0,
        id: uuid.v4().toString(),
        editing: false,
      },
    ];
    storeData(newTasks);
    setTasks(newTasks);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {tasks.length === 0 ? (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ color: "black", fontSize: 24 }}>
              Create Your First Task
            </Text>
          </View>
        ) : (
          <KeyboardAvoidingView behavior="position">
            <ScrollView>
              {tasks.map((task) => {
                return (
                  <Task
                    task={task}
                    onDeleteTask={onDelete}
                    onIncrement={onIncrement}
                    onDecrement={onDecrement}
                    onEditTask={onNameChange}
                    key={task.id}
                  />
                );
              })}
            </ScrollView>
          </KeyboardAvoidingView>
        )}
        <TouchableOpacity
          style={{
            position: "absolute",
            width: 60,
            height: 60,
            backgroundColor: "#0b5563",
            bottom: 20,
            right: 20,
            borderRadius: 50,
          }}
          onPress={onAddTask}
        >
          <View
            style={{
              position: "relative",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FontAwesome6 name="edit" size={22} color="white" />
          </View>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar style="dark" translucent={true} hidden={false} />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
