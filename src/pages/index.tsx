import dynamic from "next/dynamic";

const Qrcode = dynamic(() => import("@/components/Qrcode"), { ssr: false });
export default function Home() {
  return <Qrcode />;
}
