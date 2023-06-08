import Image from 'next/image'

const getUsers = async () => {
  const res = await fetch('https://dog.ceo/api/breeds/image/random')

  return res.json()
}

export default async function Home() {
  const dog = await getUsers()

  return (
    <div>
      Home Page
      <ul>
        <img src={dog.message} alt="" />
      </ul>
    </div>
  )
}
