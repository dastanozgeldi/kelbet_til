import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" width={160} height={38} alt="Logo" />
    </Link>
  );
};
