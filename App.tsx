import { FontAwesome6 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  View,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import Task, { TaskType } from "./components/task";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-items", jsonValue);
    console.log("Data Saved");
  } catch (e) {
    // saving error
    console.log(e);
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-items");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log(e);
  }
};

export default function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>([]);

  useEffect(() => {
    getData().then((data) => {
      if (data) {
        setTasks(data);
      }
    });
  }, []);

  const onNameChange = (name: string, newName: string) => {
    if (newName === name) return;
    const newTasks = tasks.map((task) => {
      if (task.name === name) {
        return { ...task, name: newName };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onIncrement = (name: string) => {
    const newTasks = tasks.map((task) => {
      if (task.name === name) {
        return { ...task, count: task.count + 1 };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onDecrement = (name: string) => {
    const newTasks = tasks.map((task) => {
      if (task.name === name) {
        return { ...task, count: task.count - 1 };
      } else {
        return task;
      }
    });
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onDelete = (name: string) => {
    const newTasks = tasks.filter((task) => task.name !== name);
    storeData(newTasks);
    setTasks(newTasks);
  };

  const onAddTask = () => {
    const newTasks = [
      ...tasks,
      { name: `Task ${tasks.length + 1}`, count: 0, id: uuid.v4().toString() },
    ];
    storeData(newTasks);
    setTasks(newTasks);
  };
  console.log(tasks.length);

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
          <FlatList
            data={tasks}
            renderItem={({ item }) => (
              <Task
                task={item}
                onDeleteTask={onDelete}
                onIncrement={onIncrement}
                onDecrement={onDecrement}
                onEditTask={onNameChange}
              />
            )}
            keyExtractor={(item) => item.name}
          />
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
