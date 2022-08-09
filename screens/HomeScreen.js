import React, {useLayoutEffect, useEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StatusBar, StyleSheet, Image, TextInput, ScrollView } from 'react-native'
import {
    UserIcon,
    ChevronDownIcon,
    SearchIcon,
    AdjustmentsIcon
} from 'react-native-heroicons/outline'
import Categories from '../components/Categories'
import FeaturedRow from '../components/FeaturedRow'
import client from '../sanity'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [featuredCategories, setFeaturedCategories] = useState([])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        })
    }, [])

    useEffect(() => {
        client.fetch(`
        *[_type == "featured"] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->
          }
        }
        `).then(categories => {
            setFeaturedCategories(categories) 
        })
    }, [])
  return (
    <View style={styles.container} className="bg-white pt-4">
      {/* header */}
      <View className="flex-row pb-3 items-center mx-4 space-x-2">
        <Image 
         source={{uri: "https://links.papareact.com/wru"}}
         className="h-7 w-7 bg-grey-300 p-4 rounded-full"
        />
        <View className="flex-1">
            <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
            <Text className="font-bold text-xl">
                Current Location
                <ChevronDownIcon size={20} color="#00CCBB" />
            </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>
      <View className="flex-row items-center space-x-2 pb-2 mx-4">
        <View className="flex-row space-x-2 flex-1 bg-gray-200 p-2">
            <SearchIcon color="gray" size={20} />
            <TextInput 
            placeholder='Restaurants and cuisines'
            keyboardType='default' 
            />
        </View>
        <AdjustmentsIcon color="#00CCBB" />
      </View>

      {/* body */}
      <ScrollView 
        className="bg-gray-100"
        contentContainerStyle={{paddingBottom: 100}}
      >
        {/* categories */}
        <Categories />

        {/* featured rows */}

        {featuredCategories.map(category => (
            <FeaturedRow 
            key={category._id} 
            id={category._id}
            title={category.name}
            description={category.short_description} 
            />
        ))}

      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight + 1,
    }
})