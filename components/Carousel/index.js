import Image from "next/image";

export default function Carousel() {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item position-relative hero-img active">
          <Image
            src="/img/slides/slide-1.jpg"
            layout="fill"
            alt="..."
            objectFit="cover"
          />
        </div>
        <div className="carousel-item position-relative hero-img">
          <Image
            src="/img/slides/slide-2.jpg"
            layout="fill"
            alt="..."
            objectFit="cover"
          />
        </div>
        <div className="carousel-item position-relative hero-img">
          <Image
            src="/img/slides/slide-3.jpg"
            layout="fill"
            alt="..."
            objectFit="cover"
          />
        </div>
        <div className="carousel-item position-relative hero-img">
          <Image
            src="/img/slides/slide-4.jpg"
            layout="fill"
            alt="..."
            objectFit="cover"
          />
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span
          className="fas fa-arrow-circle-left fs-2"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span
          className="fas fa-arrow-circle-right fs-2"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
