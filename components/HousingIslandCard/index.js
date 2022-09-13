import Link from "next/link";
import Image from "next/image";

export default function HousingIslandCard({ title, url, img }) {
  return (
    <div className="card bg-dark text-white card-shadow border-0" style={{}}>
      <Image src={img} className="h-100" width={250} height={250} alt="..." />
      <div className="card-img-overlay bg-overlay">
        <div className="d-flex justify-content-center align-items-center h-100">
          <Link href={url}>
            <a className="btn btn-green">{title}</a>
          </Link>
        </div>
      </div>
    </div>
  );
}
