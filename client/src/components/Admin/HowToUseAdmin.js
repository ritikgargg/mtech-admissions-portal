import React, {useState} from "react"
import SlidesDisplayModule from "./SlidesDisplayModule"
import AdminImage from "../../images/How-To-Use-9.jpg"
import ApplicationsImage from "../../images/How-To-Use-2.jpg"
import ProfileImage from "../../images/How-To-Use-3.jpg"
import HowToUse4 from "../../images/How-To-Use-4.jpg"
import TemplateImage from "../../images/How-To-Use-12.jpg"
import ExportDataImage from "../../images/How-To-Use-10.jpg"
import OfferingsImage from "../../images/How-To-Use-8.jpg"
import CalendarImage from "../../images/How-To-Use-11.jpg"

/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
const items = [
    {
      id: 0,
      name: 'Profile',
      // price: '$48',
      imageSrc: ProfileImage,
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
      slidesUrl: "https://docs.google.com/presentation/d/1Jgt9ZJkUtvY57UXBGhtDEpwdUgwJjUo4unVkf7juJk4/edit?usp=sharing",
    },
    {
      id: 1,
      name: 'Admission Cycles',
      // price: '$35',
      imageSrc: CalendarImage,
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
      slidesUrl: "https://docs.google.com/presentation/d/1PHv9eNzoXUyCE6uheTrzYHU1fXC2rB3brySMKNfDY48/edit?usp=sharing",
    },
    {
      id: 2,
      name: 'Offerings',
      // price: '$89',
      imageSrc: OfferingsImage,
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
      slidesUrl: "https://docs.google.com/presentation/d/1KNaEL0splRd6r8msgM1y6JF4dje4eAD7LRlz-OKhGzs/edit?usp=sharing",
    },
    {
      id: 3,
      name: 'Applications',
      // price: '$35',
      imageSrc: ApplicationsImage,
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
      slidesUrl: "https://docs.google.com/presentation/d/13Pmbzkon5ZCSL4V8UVnOBDTz0noNOMrggmnxU7g1G9o/edit?usp=sharing",
    },
    {
        id: 4,
        name: 'Admins',
        // price: '$35',
        imageSrc: AdminImage,
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        slidesUrl: "https://docs.google.com/presentation/d/1avsN2qbUUKuzI9_IOCOGpRr18WkRkIl1K0BvMjQelro/edit?usp=sharing",
      },
      {
        id: 5,
        name: 'Templates',
        // price: 'Templates',
        imageSrc: TemplateImage,
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        slidesUrl: "https://docs.google.com/presentation/d/1Oau0SEL_TwDhGfNXOTooMiUIwltsn2pgXoSukoBTJYg/edit?usp=sharing",
      },
      {
        id: 6,
        name: 'Export Data',
        // price: '$35',
        imageSrc: ExportDataImage,
        imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
        slidesUrl: "https://docs.google.com/presentation/d/1DprcXU5KXuDx9o50EdR5gGmzpv9Q5L7UK-k7A3ffNq4/edit?usp=sharing",
      },
  ]
  
  export default function HowToUseAdmin() {

    const [currentSlide, setCurrentSlide] = useState(0);

    return (
      <div className="bg-white pb-16">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {items.map((item) => (
              <button key={item.id} onClick={()=> {setCurrentSlide(item.id); window.scroll({ top: document.body.offsetHeight, left: 0,  behavior: 'smooth' });}} className="focus:outline-none group">
                <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                  <img
                    src={item.imageSrc} 
                    alt={item.imageAlt}
                    className="w-full h-full object-center object-cover group-hover:opacity-75"
                  />
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">{item.name}</h3>
                {/* <p className="mt-1 text-lg font-medium text-gray-900">{item.price}</p> */}
              </button>
            ))}
          </div>
        </div>
        <div className="">
            <div className="ml-10 text-gray-900 text-4xl font-bold mb-6">
                {items[currentSlide].name}
            </div>
            <SlidesDisplayModule slidesUrl={items[currentSlide].slidesUrl}/>
        </div>
      </div>
    )
  }
  