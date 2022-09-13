import Footer from "components/Footer";
import LearnMore from "components/LearnMore";
import Navbar from "components/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

const islands = [
  {
    name: "Abaco",
    images: [
      "/img/islands/Abaco/1.jpg",
      "/img/islands/Abaco/2.jpg",
      "/img/islands/Abaco/3.jpg",
      "/img/islands/Abaco/4.jpg",
      "/img/islands/Abaco/5.jpg",
    ],
    description:
      "Subdivisions: Central Pines 1, Central Pines 2, Central Pines 3, Coopers Town, Crossing Rock, Dundas Town, Dundymar, Green Turtle, Marsh Habour, Murphy Town, North Abaco, Sands Cove 1, Sands Cove 2, Spring City, Treasure Cay, Central Pines Estate 1, Central Pines Estate 2, Coopers Town 1, Crossing Rocks 1,  Fox Town & Crown Heaven",
  },
  {
    name: "Grand Bahama",
    images: [
      "/img/islands/Bahama/1.jpg",
      "/img/islands/Bahama/2.jpg",
      "/img/islands/Bahama/3.jpg",
      "/img/islands/Bahama/4.jpg",
      "/img/islands/Bahama/5.jpg",
    ],
    description:
      "Subdivisions: Bahamia West Replat, East Coral 1, East Coral 2, East Coral 3, Pine Forest Eight Mile Rock, Hawks Bill, Wellington Pinder 1, Hawks Bill, Wellington Pinder 2, Freeport Heritage Subdivision 1, Freeport Heritage Subdivision 2, Freeport Heritage Subdivision 3, Eight Mile High Rocks, Pine Forest, Lawrence Close, McLean's Town, New Free Town, West Heights, Pine Tree Estates, Sunset, West End, West Heights, Yeaman Woods, Frobisher, Freeport City, Pine Forest, West End, Yeoman Wood",
  },
  {
    name: "Eluthera",
    images: [
      "/img/islands/Eluthera/1.jpg",
      "/img/islands/Eluthera/2.jpg",
      "/img/islands/Eluthera/3.jpg",
      "/img/islands/Eluthera/4.jpg",
      "/img/islands/Eluthera/5.jpg",
    ],
    description: "Subdivisions: Alice Town/Hatchet Bay, Tarpum Bay, Ocean Hole",
  },
  {
    name: "New Providence",
    images: [
      "/img/islands/Providence/1.jpg",
      "/img/islands/Providence/2.jpg",
      "/img/islands/Providence/3.jpg",
      "/img/islands/Providence/4.jpg",
      "/img/islands/Providence/5.jpg",
    ],
    description:
      "Subdivisions: Adastra Estates 1, Adastra Estates 2, Adastra Estates 3, Adelaide Village, Ann's Town, Bain & Grants Town, Cockburn Street, Cox Street, Dignity Crescent, Dignity Gardens 1, Dignity Gardens 2, Elizabeth Estates 1, Elizabeth Estates 2, Emerald Gardens, Excellence Estates 1, Excellence Estates 2, Fire Trail Gardens 1, Flamingo Gardens, Hope Gardens, Jasmine Gardens, Jubilee Gardens, Leonard Sugarman, Lionel Davis, Malcolm Allotment, Millar Road, Millenium Gardens 1, Millenium Gardens 2, Millenium Gardens Ext, Millennium Garden Extension 2, Nassau Village, Pastel Gardens, Pinewood Gardens, Pride Estates 1, Pride Estates 2, Pride Estates 3, Strachan's Hill, Sunlight Cottage, Sunlight Village, Sunset Close, Sunset, Yellow Elder 1, Yellow Elder 2",
  },
];
const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 3,
  initialSlide: 0,
};

export default function Island() {
  const router = useRouter();
  const [currentSlideImage, setCurrentSlideImage] = useState(null);

  const { pid } = router.query;

  useEffect(() => {
    pid && setCurrentSlideImage(islands[pid].images[0]);
  }, [pid]);

  return (
    <>
      <Navbar />
      <div className="text-center bg-gradient py-5">
        <h3>Housing on the Islands</h3>
      </div>
      {pid && (
        <div className="bg-light">
          <div className="container py-4">
            <h3>{islands[pid].name}</h3>

            {currentSlideImage && (
              <div>
                <Image
                  layout="responsive"
                  width="100%"
                  height={60}
                  objectFit="cover"
                  src={currentSlideImage}
                  alt="..."
                />
              </div>
            )}
            <div className="container mt-3">
              <Slider {...settings}>
                {islands[pid].images.map((item, i) => (
                  <div key={i}>
                    <Image
                      onClick={() => setCurrentSlideImage(item)}
                      layout="responsive"
                      objectFit="cover"
                      height="50%"
                      width="100%"
                      src={item}
                      alt=""
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="container py-5">
            <div className="row align-items-stretch">
              <div className="col-12 col-lg-8">
                <div className="card" style={{ height: "100%" }}>
                  <div className="card-body">
                    <h6 className="color-green">Description</h6>
                    <p className="small">{islands[pid].description}</p>
                  </div>
                </div>
              </div>
              <div className="col-12 col-lg-4 mt-3 mt-lg-0">
                <LearnMore />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
