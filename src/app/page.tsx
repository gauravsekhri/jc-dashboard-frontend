import { Button } from "@/components/ui/button";
import { PartyPopper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <div className="mt-52 w-fit mx-auto text-center">
          <div className="font-bold text-5xl mb-6">Assignment</div>
          <Link href="/products">
            <Button size="lg">
              Let's go <PartyPopper />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
