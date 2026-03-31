"use client";

import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
    title: "โรงพยาบาลชุมชนที่ทันสมัย",
    subtitle: "บริการดีวิถีใหม่ บูรณาการสู่ชุมชนเพื่อประชาชนสุขภาพดี"
  },
  {
    image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=2000",
    title: "พัฒนาคุณภาพชีวิต",
    subtitle: "มุ่งมั่นยกระดับบริการทางการแพทย์ตลอด 24 ชั่วโมง"
  },
  {
    image: "https://images.unsplash.com/photo-1551076805-e166946e0e11?auto=format&fit=crop&q=80&w=2000",
    title: "เทคโนโลยีการแพทย์ก้าวหน้า",
    subtitle: "นำนวัตกรรมมาประยุกต์ใช้เพื่อการรักษาที่แม่นยำ"
  }
];

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })])
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi, setSelectedIndex])

  useEffect(() => {
    if (!emblaApi) return
    emblaApi.on('select', onSelect)
  }, [emblaApi, onSelect])

  return (
    <div className="relative overflow-hidden w-full h-[300px] md:h-[500px]" ref={emblaRef}>
      <div className="flex h-full Touch-pan-y">
        {slides.map((slide, index) => (
          <div className="relative flex-[0_0_100%] min-w-0 h-full" key={index}>
            <img src={slide.image} className="w-full h-full object-cover" alt={slide.title} />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
              <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 drop-shadow-lg transform transition-all translate-y-0 opacity-100">{slide.title}</h2>
              <p className="text-lg md:text-2xl text-white/90 drop-shadow-md font-medium max-w-2xl">{slide.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === selectedIndex ? 'bg-secondary w-8' : 'bg-white/50'}`}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <button className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors" onClick={scrollPrev}>
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors" onClick={scrollNext}>
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
