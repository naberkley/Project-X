import React from "react";
import { useState } from "react";
import "../assets/css/components/carousel.css";

import Carousel from "react-bootstrap/Carousel";
import hero1 from "../assets/hero_carousel_imgs/hero1.jpg";
import hero2 from "../assets/hero_carousel_imgs/hero2.jpg";
import hero3 from "../assets/hero_carousel_imgs/hero3.jpg";
import hero4 from "../assets/hero_carousel_imgs/hero4.jpg";
import hero5 from "../assets/hero_carousel_imgs/hero5.jpg";
import hero6 from "../assets/hero_carousel_imgs/hero6.jpg";
import hero7 from "../assets/hero_carousel_imgs/hero7.jpg";
import hero8 from "../assets/hero_carousel_imgs/hero8.jpg";
import hero9 from "../assets/hero_carousel_imgs/hero9.jpg";
import hero10 from "../assets/hero_carousel_imgs/hero10.jpg";
import hero11 from "../assets/hero_carousel_imgs/hero11.jpg";

const heroData = [
  {
    id: 1,
    image: hero1,
    title: "First slide label",
    description: "Nulla vitae elit libero, a pharetra augue mollis interdum.",
    link: "#",
  },
  {
    id: 2,
    image: hero2,
    title: "Second slide label",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    link: "#",
  },
  {
    id: 3,
    image: hero3,
    title: "Third slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 4,
    image: hero4,
    title: "Fourth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 5,
    image: hero5,
    title: "Fifth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 6,
    image: hero6,
    title: "Sixth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 7,
    image: hero7,
    title: "Seventh slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 8,
    image: hero8,
    title: "Eighth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 9,
    image: hero9,
    title: "Ninth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 10,
    image: hero10,
    title: "Tenth slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
  {
    id: 11,
    image: hero11,
    title: "Eleventh slide label",
    description:
      "Praesent commodo cursus magna, vel scelerisque nisl consectetur.",
    link: "#",
  },
];

function Hero() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex = 0) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel
      activeIndex={index}
      onSelect={handleSelect}
      className="fixed-height-carousel"
      role="region"
      aria-label="carousel"
    >
      {heroData.map((hero) => (
        <Carousel.Item key={hero.id}>
          <img className="d-block w-100" src={hero.image} alt={hero.title} />
          <Carousel.Caption className="carousel-caption">
            <h3>{hero.title}</h3>
            <p>{hero.description}</p>
            <a href={hero.link} className="btn btn-light">
              Go somewhere
            </a>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
      <a
        className="carousel-control-prev"
        href="#"
        role="button"
        aria-label="Previous"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </a>
      <a
        className="carousel-control-next"
        href="#"
        role="button"
        aria-label="Next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </a>
    </Carousel>
  );
}

export default Hero;
