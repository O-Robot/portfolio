import { Suspense } from "react";
import Scene from "@/components/Scene";
import Loader from "@/components/Loader";
import Header from "@/components/ui/Header";
import SideNav from "@/components/ui/SideNav";

export default function Home() {
  return (
    <div className="fixed inset-0">
      <Header />
      <SideNav />

      <div className="absolute inset-0">
        <Suspense fallback={<Loader />}>
          <Scene />
        </Suspense>
      </div>
    </div>
  );
}
