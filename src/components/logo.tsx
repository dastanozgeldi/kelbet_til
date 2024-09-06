import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
  return (
    <Link href="/" className="flex items-center space-x-2.5">
      <Image src="/logo.png" width={32} height={32} alt="Logo" />
      <div className="font-bold text-xl">kelbet-til.kz</div>
    </Link>
  );
};
