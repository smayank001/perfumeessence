import { connectDB } from '@/lib/config/database';
import { Media } from '@/lib/models/MediaSchema';
import { mediaType } from '@/type';
import Image from 'next/image';

const Gallery = async () => {
  const isDatabaseConnected = await connectDB();

  if (!isDatabaseConnected) {
    return null;
  }

  const res = await Media.find({}).lean();

  if (!res || res.length === 0) {
    return null;
  }

  return (
    <section className="relative w-full bg-[#F7F3EA] py-16 md:py-24 px-4 sm:px-6 lg:px-10 border-b border-[#E3DACD] font-serif">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.3em] text-[#C9A45C] font-normal block mb-2">
            VISUAL ARCHIVE
          </span>
          <h3 className="text-3xl sm:text-4xl md:text-5xl text-[#21152F] font-normal tracking-tight">
            The Atelier in Detail
          </h3>
          <p className="text-xs sm:text-sm text-[#5B5263] mt-2 font-normal tracking-wide">
            Moments of craftsmanship, rare essences, and timeless luxury pieces captured.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {res.map((item: mediaType) => (
            <div
              key={item._id}
              className="relative overflow-hidden bg-[#FFFFFF] border border-[#E3DACD] p-3 transition-all duration-500 hover:border-[#C9A45C] hover:shadow-[0_12px_32px_-12px_rgba(33,21,47,0.12)] group"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#F4EFE6]">
                {item.mediaType === 'image' ? (
                  <Image
                    src={item.media}
                    alt="Gallery item"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                ) : (
                  <video
                    src={item.media}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;

