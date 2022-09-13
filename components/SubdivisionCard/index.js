import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export default function SubdivisionCard({ subdivision }) {
  return (
    <div
      className="position-relative card border-0 card-shadow pb-2"
      style={{ maxWidth: 300 }}
    >
      {subdivision && subdivision.category && (
        <span className="position-absolute bg-red shadow top-0 start-0 translate-middle-y  px-2">
          {subdivision.category === "featured" ? "Featured" : "New Arrivals"}
        </span>
      )}
      {subdivision?.gallery ? (
        <Image
          style={{ objectFit: "cover" }}
          height={200}
          width={300}
          src={subdivision.gallery[0].thumb}
          alt="...."
        />
      ) : (
        <Skeleton height={200} />
      )}

      <div className="mt-3 px-4 color-dark">
        <h6 className="fw-bold">
          {subdivision?.heading || <Skeleton height={20} />}
        </h6>
        <div className="small mb-2">
          {subdivision?.location ? (
            <>
              <i className="color-green fas fa-map-marker-alt me-2 " />
              <span className="color-green fw-bold me-2">Location:</span>
              <span className="color-green">{subdivision.location}</span>
            </>
          ) : (
            <Skeleton inline={true} />
          )}
        </div>
        {subdivision ? (
          <Link href={`/subdivisions/${subdivision.id}`}>
            <a className="btn btn-sm btn-green">Read more</a>
          </Link>
        ) : (
          <Skeleton width={80} />
        )}
      </div>
    </div>
  );
}
