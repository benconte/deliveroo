import { View, StyleSheet, StatusBar } from 'react-native'
import React, {useEffect} from 'react'
import * as Animatable from 'react-native-animatable'
import LottieView from 'lottie-react-native';
import * as Progress from 'react-native-progress'
import { useNavigation } from '@react-navigation/native';

const loader = require('../assets/animations/delivery-animation.json')

const PreparingScreen = () => {
    const navigation = useNavigation()

    useEffect(() => {
      setTimeout(() => {
        navigation.navigate('Delivery')
      }, 4000)
    }, [])
    
  return (
    <View style={styles.container} className="bg-[00CCBB] flex-1 justify-center items-center">
      <LottieView
            source={loader}
            autoPlay={true}
            loop={true}
            style={{
                width: 200,
                height: 200,
                alignSelf: 'center',
                justifyContent: 'center',
            }}
            speed={0.5}
        />

        <Animatable.Text 
            animation="slideInUp" 
            iterationCount={1}
            className="text-lg my-10 text-white font-bold text-center"
        >
            Waiting for Restaurant to accept your order!
        </Animatable.Text>

        <Progress.Circle size={70} indeterminate={true} color="white" />
    </View>
  )
}

export default PreparingScreen

const styles = StyleSheet.create({
    container: {
      paddingTop: StatusBar.currentHeight + 1,
    }
  })