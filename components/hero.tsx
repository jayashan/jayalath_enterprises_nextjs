
import slider from '@/assets/images/slider.jpg'
import Image from "next/image"

export default function Hero() {
  return (
    <div className="relative">
      
      <div className="">
        <Image
          className="h-60 w-full sm:h-72 md:h-96 lg:w-full lg:h-full object-center shadow-xl cursor-pointer transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
          src={slider}
          alt="Business team"
        />
      </div>
    </div>
  )
}

