import { View, Text, StyleSheet, StatusBar, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { addToBasket, selectBasketTotal, removeFromBasket,selectBasketItems, selectBasketItemsWithId } from '../features/basektSlice'

import { XCircleIcon } from 'react-native-heroicons/outline'
import { urlFor } from '../sanity'


const BasketScreen = () => {
  const navigation = useNavigation()
  const restaurant = useSelector(selectRestaurant)
  const items = useSelector(selectBasketItems)
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([])
  const dispatch = useDispatch()
  const basketTotal = useSelector(selectBasketTotal)

  useEffect(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item)
      return results
    }, {})

    setGroupedItemsInBasket(groupedItems)
  }, [items])

  return (
    <View style={styles.container} className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>

          <TouchableOpacity 
            onPress={navigation.goBack} 
            className="rounded-ful bg-gray-100 absolute top-3 right-5"
          >
            <XCircleIcon color="#00CCBB" height={40} width={40} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{uri: "https://links.papareact.com/wru"}} 
          className="h-7 w-9 bg-gray-400 rounded-full" />
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, item]) => (
            <View 
            key={key} 
            className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{item.length} x</Text>
              <Image 
              source={{uri: urlFor(item[0]?.image).url()}} 
              className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{item[0]?.name}</Text>

              <Text className="text-gray-600">
                <Text>${item[0]?.price}</Text>
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              ${basketTotal}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              ${basketTotal}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              ${basketTotal + 5.9}
            </Text>
          </View>

          <TouchableOpacity 
          onPress={() => navigation.navigate('PreparingOrder')}
          className="rounded-lg bg-[#00CCBB] p-4">
            <Text className="text-center text-white text-lg font-bold">Place Order</Text>
          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default BasketScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight + 1,
  }
})