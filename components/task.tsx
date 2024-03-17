import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";

export default function Task({
  task,
  onDeleteTask,
  onDecrement,
  onIncrement,
  onEditTask,
}: TaskProps) {
  const [editing, setEditing] = useState<Boolean>(false);
  const [newName, setNewName] = useState<string>(task.name);

  const onNameChange = (newName: string) => {
    setNewName(newName);
  };

  const onSave = () => {
    onEditTask(task.id, task.name, newName);
    setEditing(false);
  };
  return (
    <View
      style={
        !editing
          ? {
              flex: 1,
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#e1e1e1",
              backgroundColor: "#efefef",
            }
          : {
              flex: 1,
              flexDirection: "row",
              marginVertical: 10,
              marginHorizontal: 10,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: "#e1e1e1",
              backgroundColor: "#2e4057",
            }
      }
    >
      <View
        style={{
          width: "80%",
          borderRightWidth: 2,
          borderRightColor: "#e1e1e1",
        }}
      >
        <View style={{ flexDirection: "row", flex: 1 }}>
          {editing ? (
            <View
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <TextInput
                value={newName}
                onChangeText={onNameChange}
                onSubmitEditing={onSave}
                style={{
                  color: "white",
                  fontSize: 20,
                }}
              />
            </View>
          ) : (
            <View
              style={{
                flex: 1,
                padding: 10,
              }}
            >
              <Text style={{ fontSize: 20 }}>{task.name}</Text>
            </View>
          )}
          {editing ? (
            <View
              style={{
                width: "30%",
                flexDirection: "row",
                alignSelf: "center",
                padding: 10,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  margin: 5,
                }}
                onPress={() => setEditing(false)}
              >
                <MaterialIcons
                  name="cancel"
                  size={22}
                  color={editing ? "white" : "black"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  margin: 5,
                }}
                onPress={onSave}
              >
                <FontAwesome6
                  name="square-check"
                  size={22}
                  color={editing ? "white" : "black"}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                width: "30%",
                alignSelf: "center",
                padding: 10,
                alignItems: "center",
              }}
              onPress={() => setEditing(true)}
            >
              <MaterialIcons
                name="edit-note"
                size={22}
                color={editing ? "white" : "black"}
              />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            height: 2,
            backgroundColor: "#e1e1e1",
            marginVertical: 10,
          }}
        />
        <View style={{ flexDirection: "row", flex: 1 }}>
          <TouchableOpacity
            style={{
              width: "30%",
              alignSelf: "center",
              padding: 10,
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => onDeleteTask(task.id)}
          >
            <FontAwesome6
              name="trash-can"
              size={24}
              color={editing ? "white" : "red"}
            />
          </TouchableOpacity>

          <View
            style={{
              height: 50,
              width: 2,
              backgroundColor: "#e1e1e1",
            }}
          />
          <TouchableOpacity
            style={{
              width: "30%",
              alignSelf: "center",
              padding: 10,
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => onDecrement(task.id)}
            disabled={task.count < 1}
          >
            <FontAwesome6
              name="minus"
              size={24}
              color={editing ? "white" : "black"}
            />
          </TouchableOpacity>
          <View
            style={{
              height: 50,
              width: 2,
              backgroundColor: "#e1e1e1",
            }}
          />
          <TouchableOpacity
            style={{
              width: "30%",
              alignSelf: "center",
              padding: 10,
              alignItems: "center",
              alignContent: "center",
            }}
            onPress={() => onIncrement(task.id)}
            disabled={task.count >= 99}
          >
            <FontAwesome6
              name="add"
              size={24}
              color={editing ? "white" : "black"}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          alignSelf: "center",
        }}
      >
        <Text
          style={
            editing
              ? { fontSize: 40, color: "white" }
              : { fontSize: 40, color: "black" }
          }
        >
          {task.count}
        </Text>
      </View>
    </View>
  );
}

export type TaskType = {
  name: string;
  count: number;
  id: string;
};

type TaskProps = {
  task: TaskType;
  onIncrement: (name: string) => void;
  onDecrement: (name: string) => void;
  onDeleteTask: (name: string) => void;
  onEditTask: (id: string, name: string, newName: string) => void;
};
