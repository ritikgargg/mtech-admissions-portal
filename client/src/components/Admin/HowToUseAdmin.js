import React, { useState } from "react";
import SlidesDisplayModule from "./SlidesDisplayModule";
import AdminImage from "../../images/admin-use.svg";
import ApplicationsImage from "../../images/applications-use.svg";
import ProfileImage from "../../images/profile-use.svg";
import TemplateImage from "../../images/templates-use.svg";
import ExportDataImage from "../../images/applicant-data-use.svg";
import OfferingsImage from "../../images/offerings-use.svg";
import CalendarImage from "../../images/admission-cycles-use.svg";
import ArchiveImage from "../../images/archive-use.svg";

const items = [
  {
    id: 0,
    name: "Profile",
    imageSrc: ProfileImage,
    imageAlt: "Profile",
    slidesUrl:
      "https://docs.google.com/presentation/d/1Jgt9ZJkUtvY57UXBGhtDEpwdUgwJjUo4unVkf7juJk4/edit?usp=sharing",
  },
  {
    id: 1,
    name: "Admission Cycles",
    imageSrc: CalendarImage,
    imageAlt: "Admission Cycles",
    slidesUrl:
      "https://docs.google.com/presentation/d/1PHv9eNzoXUyCE6uheTrzYHU1fXC2rB3brySMKNfDY48/edit?usp=sharing",
  },
  {
    id: 2,
    name: "Offerings",
    imageSrc: OfferingsImage,
    imageAlt: "Offerings",
    slidesUrl:
      "https://docs.google.com/presentation/d/1KNaEL0splRd6r8msgM1y6JF4dje4eAD7LRlz-OKhGzs/edit?usp=sharing",
  },
  {
    id: 3,
    name: "Applications",
    imageSrc: ApplicationsImage,
    imageAlt: "Applications",
    slidesUrl:
      "https://docs.google.com/presentation/d/13Pmbzkon5ZCSL4V8UVnOBDTz0noNOMrggmnxU7g1G9o/edit?usp=sharing",
  },
  {
    id: 4,
    name: "Admins",
    imageSrc: AdminImage,
    imageAlt: "Admins",
    slidesUrl:
      "https://docs.google.com/presentation/d/1avsN2qbUUKuzI9_IOCOGpRr18WkRkIl1K0BvMjQelro/edit?usp=sharing",
  },
  {
    id: 5,
    name: "Templates",
    imageSrc: TemplateImage,
    imageAlt: "Templates",
    slidesUrl:
      "https://docs.google.com/presentation/d/1Oau0SEL_TwDhGfNXOTooMiUIwltsn2pgXoSukoBTJYg/edit?usp=sharing",
  },
  {
    id: 6,
    name: "Applicant Data",
    imageSrc: ExportDataImage,
    imageAlt: "Applicant Data",
    slidesUrl:
      "https://docs.google.com/presentation/d/1DprcXU5KXuDx9o50EdR5gGmzpv9Q5L7UK-k7A3ffNq4/edit?usp=sharing",
  },
  {
    id: 7,
    name: "Archive",
    imageSrc: ArchiveImage,
    imageAlt: "Archive",
    slidesUrl:
      "https://docs.google.com/presentation/d/1_uQOR5zWiHirEr7HnNNL0xWTKjELzP13_4BOvTiEW6g/edit?usp=sharing",
  },
];

export default function HowToUseAdmin() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="bg-white pb-16">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentSlide(item.id);
                window.scroll({
                  top: document.body.offsetHeight,
                  left: 0,
                  behavior: "smooth",
                });
              }}
              className="focus:outline-none group"
            >
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={item.imageSrc}
                  alt={item.imageAlt}
                  className="w-full h-full object-center object-cover group-hover:opacity-75"
                />
              </div>
              <h3 className="mt-4 text-lg font-medium text-gray-900">
                {item.name}
              </h3>
            </button>
          ))}
        </div>
      </div>
      <div className="">
        <div className="ml-10 text-gray-900 text-4xl font-bold mb-6">
          {items[currentSlide].name}
        </div>
        <SlidesDisplayModule slidesUrl={items[currentSlide].slidesUrl} />
      </div>
    </div>
  );
}
