import { FontAwesome6 } from "@expo/vector-icons";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import Task, { TaskType } from "./components/task";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useState } from "react";

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("my-items", jsonValue);
    console.log("Data saved");
  } catch (e) {
    // saving error
  }
};

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("my-items");
    console.log("Data retrieved");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
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
    setTasks(
      tasks.map((task) => {
        if (task.name === name) {
          return { ...task, name: newName };
        } else {
          return task;
        }
      }),
    );
    storeData(tasks);
  };

  const onIncrement = (name: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.name === name) {
          return { ...task, count: task.count + 1 };
        } else {
          return task;
        }
      }),
    );
    storeData(tasks);
  };

  const onDecrement = (name: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.name === name) {
          return { ...task, count: task.count - 1 };
        } else {
          return task;
        }
      }),
    );
    storeData(tasks);
  };

  const onDelete = (name: string) => {
    setTasks(tasks.filter((task) => task.name !== name));
    storeData(tasks);
  };

  const onAddTask = () => {
    setTasks([
      ...tasks,
      { name: `Task ${tasks.length + 1}`, count: 0, id: uuid.v4().toString() },
    ]);
    storeData(tasks);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
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
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
