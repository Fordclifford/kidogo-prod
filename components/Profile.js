
import React, { Component,useEffect,useState} from 'react';
import userStore from '../utilities/store';
import {
  StyleSheet,
  Text,
  View,

} from 'react-native';
import { Icon } from 'react-native-elements'
import { FetchCaregiver } from '../utilities/auth';
import Backdrop from '../components/Backdrop';
import Spacer from '../components/Spacer';
import Message from '../components/Message';
import { GetCaregiver } from "../utilities/localstore";
import Loading from '../components/Loading';
import { Styles } from '../constants/Style';



const Profile = (props) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})

  useEffect(() => {
   setLoading(true)

 GetCaregiver()
           
        .then((json) =>  setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
 

      }, [])
    

    return (
      <Backdrop>
      { loading 
        ? <Loading />
        : <View style={Styles.loading} >
      
    
        <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Icon style={styles.avatar} name="account-circle" size={150}
            />

         
            <Text style={styles.name}>NAME: { data.firstName+" "+data.lastName  } </Text>
            <Text style={styles.userInfo}>EMAIL: {data.email} </Text>
            <Text style={styles.userInfo}>MOBILE: {data.phone} </Text>
            <Text style={styles.userInfo}>CENTER: {data.centreName} </Text>
            <Text style={styles.userInfo}>CITY: {data.city} </Text>
            <Text style={styles.userInfo}>LOCATION: {data.location} </Text>
            

          </View>
        </View>
        </View>
        </View>
      }
        </Backdrop>
    
    );

  }

export default Profile

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },


  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize : 22,
    color: "#000000",
    fontWeight: '600',
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: '600',
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: 'center',
  },
  item: {
    flexDirection: 'row',
  },
  infoContent: {
    flex: 1,
    alignItems: 'flex-start',
    paddingLeft: 5
  },
  iconContent: {
    flex: 1,
    alignItems: 'flex-end',
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  }
});

