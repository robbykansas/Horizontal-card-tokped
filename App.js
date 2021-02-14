import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useFonts, NunitoSans_400Regular} from '@expo-google-fonts/nunito-sans'
import { OpenSans_400Regular} from '@expo-google-fonts/open-sans'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import store from './src/store'
import axios from 'axios'
import ProductCards from './src/components/ProductCards'

export default function App() {
  let [fontsLoaded] = useFonts(
    {
      NunitoSans_400Regular,
      OpenSans_400Regular
    }
  )

  const [items, setItems] = useState([])

  useEffect(() => {
    axios({
      method: 'GET',
      url: 'http://192.168.1.2:3000/data'
    })
    .then(response => {
      setItems(response.data)
    })
    .catch(e => console.log(e))
  },[])

  if (!fontsLoaded) {
    return <Text>Loading ...</Text>
  }

  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.textArea}>
          <Text style={styles.textNunito}>Terlaris Untukmu</Text>
          <Text style={styles.textSans}>Lihat Semua</Text>
        </View>
        <ScrollView horizontal={true} style={{flexDirection: 'row', flexWrap: 'nowrap', width: '100%'}}>
          {
            items.map(item => {
              return (
                <ProductCards key={item.id} item={item} />
              )
            })
          }
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexWrap: 'wrap'
  },
  textArea: {
    flexDirection: 'row',  
    paddingBottom: 16, 
    marginLeft: 8
  },
  textNunito: {
    fontFamily: "NunitoSans_400Regular", 
    fontWeight: "bold", 
    fontSize: 24
  },
  textSans: {
    fontFamily: "OpenSans_400Regular",
    fontWeight: "bold", 
    fontSize: 16, 
    paddingLeft: 12, 
    paddingTop: 8, 
    color: '#03AC0E'
  }
});
