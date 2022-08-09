import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

// project id and dataset name 

const client = sanityClient({
    projectId: "qwoxusny",
    dataset: "production",
    useCdn: true,
    apiVersion: '2021-10-21',
})

const builder = new imageUrlBuilder(client)

// RUN THIS to add exception for localhost 3000 CORS policy// issue
// sanity cors add http://localhost:3000
// You can add the exception through the Sanity admin panel in the api tab
//  or by running the following command:
// sanity cors add http://localhost:3000

export const urlFor = (source) => builder.image(source)

export default client