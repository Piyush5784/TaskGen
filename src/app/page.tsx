import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home</div>
      <Button asChild>
        <Link href={"/dashboard"}>Dashbaord</Link>
      </Button>
    </>
  );
}
