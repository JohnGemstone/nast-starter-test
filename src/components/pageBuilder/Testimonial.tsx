import { groq } from "next-sanity";
import Image from "next/image";
import type { Testimonial } from "@/lib/sanity.queries";



type TestimonialProps = {
  testimonialAuthor: Testimonial["testimonialAuthor"],
  testimonialCompany: Testimonial["testimonialCompany"],
  testimonialText: Testimonial["testimonialText"],
  image: Testimonial["image"],
  caseStudy?: Testimonial["caseStudy"],
  justification?: Testimonial["justification"],
}

const Testimonial = ({
  caseStudy,
  image,
  justification,
  testimonialAuthor,
  testimonialCompany,
  testimonialText,
}: TestimonialProps) => {
  // {
  //   if (testimonialCompany == "Blackburn Rovers") {
  //     return <></>;
  //   }
  // }

  return (
    <div className=" relative bg-gray-900">
      <div>
        <Image
          src={image.asset.url}
          alt={image.alt ? image.alt : "Testimonial"}
          className="object-cover"
          placeholder="blur"
          width={image.asset.metadata.dimensions?.width}
          height={image.asset.metadata.dimensions?.height}
          blurDataURL={image.asset?.metadata.lqip}
          style={{
            position: "absolute",
            minWidth: "100%",
            maxWidth: "100%",
            minHeight: "100%",
            maxHeight: "100%",
            objectPosition: image.hotspot
              ? `${image.hotspot?.x * 100}% ${
                  image?.hotspot?.y * 100
                }%`
              : "center",
          }}
          sizes="(max-width: 1420px) 100vw, 1420px"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, rgba(0.2, 0.2, 0.2, .5), rgba(0.2, 0.2, 0.2, 0.5), rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))`,
          }}
        />
      </div>
      <div className="relative mx-auto max-w-main px-6">
        <div className="flex h-full max-w-lg flex-col items-center justify-center py-24">
          <div className="flex flex-col items-center justify-center">
            <div className="text-left text-white">
              <div className="pb-6">
                <p className="text-2xl">{testimonialText}</p>
              </div>
              <p className="text-base pb-[0.75rem]">{testimonialAuthor}</p>
              <p className="font-semibold text-base">{testimonialCompany}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;

export const TestimonialGROQ = groq`
  _type == 'testimonial' => {
    ...,
    image {
      ...,
      ...asset-> 
    },
  }
`;
