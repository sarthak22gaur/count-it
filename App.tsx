import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Task, { TaskType } from "./components/task";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

const dummyTasks: Array<TaskType> = [
  { name: "Task 1", count: 0 },
  { name: "Task 2", count: 0 },
  { name: "Task 3", count: 0 },
  { name: "Task 4", count: 0 },
  { name: "Task 5", count: 0 },
  { name: "Task 6", count: 0 },
  { name: "Task 7", count: 0 },
];

export default function App() {
  const [tasks, setTasks] = useState<Array<TaskType>>(dummyTasks);

  const onNameChange = (name: string, newName: string) => {
    setTasks(
      tasks.map((task) => {
        if (task.name === name) {
          return { ...task, name: newName };
        } else {
          return task;
        }
      }),
    );
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
  };

  const onDelete = (name: string) => {
    setTasks(tasks.filter((task) => task.name !== name));
  };

  const onAddTask = () => {
    setTasks([...tasks, { name: `Task ${tasks.length + 1}`, count: 0 }]);
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
