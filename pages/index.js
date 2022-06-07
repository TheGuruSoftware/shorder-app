import { useState } from 'react'
import Spinner from '../components/Spinner'
import IMG from '../components/IMG'
import { useAuth } from '../auth'
import { getImages, getUsers } from '../sb'

export async function getServerSideProps() {
  const users = await getUsers()
  const images = await getImages()
  return {
    props: {
      loadedImages: images || {},
      loadedUsers: users || {},
    }
  }
}
export default function Home({ loadedUsers, loadedImages }) {
  const [images, setImages] = useState(loadedImages)
  const [users, setUsers] = useState(loadedUsers)
  const { user } = useAuth()

  if (!(images && users)) return (
    <div className="flex w-100 justify-center align-middle">
      <Spinner className="w-10 h-10" />
    </div>
  )
  return (
    <main className="text-sm p-4 grid xs:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 w-full h-fit">
      {images.length && images.map(image => (
        <IMG key={image.id} author={users.find(u => u.id === image.author)} url={image.url} id={image.id} alllikes={image.likes} user={user} />
      ))}
    </main>
  )
}
