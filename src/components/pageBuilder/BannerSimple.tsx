
import Link from "next/link";
import Button from "../Button2";
import Image from "next/image";
import type { BannerSimple } from "@/lib/sanity.queries";


type BannerSimpleProps = {
  title: BannerSimple["title"];
  content: BannerSimple["content"];
  cta: BannerSimple["cta"];
  image: BannerSimple["image"];
};

const BannerSimple = ({ title, content, cta, image }:BannerSimpleProps) => {
  return (
    <div>
      {/* <div className="w-full h-3 gradient-fill"></div> */}
      <div className="bg-gray-800">
        <div className="mx-auto flex flex-col max-w-5xl py-12 px-4 sm:px-6 lg:items-center  lg:justify-between md:py-20 lg:px-8 lg:pb-9">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="font-medium tracking-tight text-gray-50 text-2xl pb-6">
                {title}
            </h2>
            <p className="block text-gray-300 pb-10">
            {content}
            </p>
          </div>
          <div className="md:pb-10 relative w-full">
            <Image
              src={image?.asset?.url}
              alt={image?.alt || title}
              width={image?.asset?.metadata?.dimensions?.width}
              height={image?.asset?.metadata?.dimensions?.height}
              placeholder="blur"
              blurDataURL={image?.asset?.metadata?.lqip}
              sizes="(max-width: 1024px) 100vw, 880px"
            />
          </div>
          <div className="mt-8 md:mt-0 mx-auto">
            <Button href="#form">{cta ? cta : "Get a quote"}</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BannerSimple;
