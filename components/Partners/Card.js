import Image from "next/image";
import styles from "./styles.module.css";

function Card() {
  return (
    <div>
      <Image
        src="/img/partners/Logo 02.png"
        height={200}
        width={300}
        alt="...."
      />
    </div>
  );
}

export default Card;
