import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { getData, removeData } from '../storages/localStorage';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/atoms/Input';
import Add from '../components/atoms/Add';
import InputTodo from '../components/atoms/InputTodo';
import AddTodo from '../components/AddTodo';
import axios from 'axios';

const Home = ({ navigation }) => {
  const [todo, setTodo] = useState([]);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData('token').then(async res => {
      if (!res) {
        navigation.replace('Login');
      } else {
        setToken(res);
      }
    });

    getTodo();
  });

  const saveTodo = () => {
    setLoading(true);

    axios
      .post(
        'https://example-api.darms.my.id/api/todos',
        {
          task_name: todo,
          is_completed: false,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        Alert.alert('Todo Berhasil');
      })
      .catch(error => {
        const err = error.response.data;
        Alert.alert('Error', err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getTodo = () => {
    axios
      .get('https://example-api.darms.my.id/api/todos', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(
        response => {
          setTodo(response.data.data);
        },
        error => {
          console.log(error);
        },
      );
  };

  const updateTodo = id => {
    axios
      .put(
        `https://example-api.darms.my.id/api/todos/${id}/complete`,
        {
          is_completed: true,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(response => {
        Alert.alert('Update Berhasil');
        getTodo();
      })
      .catch(error => {
        const err = error.response.data;
        Alert.alert('Error', err.message);
      });
  };

  function submitLogout() {
    removeData('auth');
    removeData('token');
    navigation.replace('Login');
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.textTodo}>TODO</Text>
      <Text style={styles.textList}>LIST</Text>
      <View>
        <AddTodo />
      </View>
      <ScrollView>
        <View style={styles.lineTitle}></View>
        {todo.map((item, index) => {
          return (
            <View style={styles.itemTodo} key={index}>
              <View>
                <Text style={styles.title}>
                  {index + 1}. {item.task_name}
                </Text>
                <Text style={styles.status}>
                  {item.is_completed ? 'Selesai' : 'Belum Selesai'}
                </Text>
              </View>
              {item.is_completed === false && (
                <TouchableOpacity
                  onPress={() => updateTodo(item.id)}
                  style={styles.checklist}
                >
                  <Text style={styles.checklistLabel}>Checklist</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
        <View style={styles.line}></View>
        <TouchableOpacity onPress={submitLogout} style={styles.btn}>
          <Text style={styles.btntext}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  textTodo: {
    fontSize: 60,
    fontWeight: 'bold',
    marginTop: 15,
    marginLeft: 15,
    color: 'black',
  },
  textList: {
    fontSize: 50,
    fontWeight: '400',
    marginTop: -15,
    marginLeft: 15,
    color: '#ffde69',
  },
  addTodo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 1,
  },
  btn: {
    backgroundColor: '#ffde69',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
  },
  btntext: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemTodo: {
    backgroundColor: '#ffde69',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    borderWidth: 2,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  status: {
    color: 'grey',
  },
  checklist: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
  },
  checklistLabel: {
    color: 'black',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: 'lightgrey',
    marginVertical: 5,
  },
  lineTitle: {
    width: '100%',
    height: 2,
    backgroundColor: 'lightgrey',
    marginVertical: 12,
  },
});
