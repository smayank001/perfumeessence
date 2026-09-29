import { connectDB } from '@/lib/config/database'
import { serif } from '@/lib/fonts'
import { Media } from '@/lib/models/MediaSchema'
import { mediaType } from '@/type'
import Image from 'next/image'

const Gallery = async () => {
  const isDatabaseConnected = await connectDB()

  if (!isDatabaseConnected) {
    return null
  }

  const res = await Media.find({}).lean()

  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <h3 className={`${serif.className} text-4xl  text-center mb-10`}>
        Gallery
      </h3>

      {res.length === 0 ? (
        <p className="text-center text-gray-500">No media found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {res.map((item: mediaType) => (
            <div
              key={item._id}
              className="relative overflow-hidden "
            >
              {item.mediaType === 'image' ? (
                <Image
                  src={item.media}
                  alt="Gallery media"
                  width={400}
                  height={400}
                  className="h-full max-h-120 w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                />
              ) : (
                <video
                  src={item.media}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className=" w-full object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery
