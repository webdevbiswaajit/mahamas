import Link from "next/link";
import React from "react";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export default function HousingModelCard({ data }) {
  return (
    <div className="card border-0 card-shadow pb-2" style={{ maxWidth: 300 }}>
      {data ? (
        <Image
          width={300}
          height={200}
          alt="....."
          src={data.master_plan.thumb}
        />
      ) : (
        <Skeleton height={200} />
      )}
      <div className="mt-3 px-4 color-dark">
        <h6 className="fw-bold">{data?.heading || <Skeleton width="50%" />}</h6>
        <div className="d-flex justify-content-between mb-2 ">
          {data?.bedrooms ? (
            <div>
              <i className="fas fa-bed fs-5 color-green" />
              <span className="ms-1">{data.bedrooms}</span>
            </div>
          ) : (
            <Skeleton width={60} />
          )}
          {data?.bathrooms ? (
            <div>
              <i className="fas fa-shower fs-5 color-green" />
              <span className="ms-1">{data.bathrooms}</span>
            </div>
          ) : (
            <Skeleton width={60} />
          )}
          {data?.width ? (
            <div>
              <i className="fas fa-square fs-5 color-green" />
              <span className="ms-1">{data.width} SqFt.</span>
            </div>
          ) : (
            <Skeleton width={60} />
          )}
        </div>
        {data?.id ? (
          <Link href={`/housing-models/${data?.id}`}>
            <a className="btn btn-sm btn-green">Read more</a>
          </Link>
        ) : (
          <Skeleton width={80} />
        )}
      </div>
    </div>
  );
}
