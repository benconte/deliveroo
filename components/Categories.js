import { View, Text, ScrollView } from 'react-native'
import React, {useEffect, useState} from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity'
import { urlFor } from '../sanity'

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        client.fetch(`
        *[_type == "category"]`).then(data => {
            setCategories(data)
        })
    }, [])
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 10 }}
        >
            {/* category card */}
            {categories?.map(category => {
                return (
                    <CategoryCard key={category._id} id={category._id} title={category.name} imgUrl={urlFor(category.image).width(200).url()} />
                )
            })}
        </ScrollView>
    )
}

export default Categories