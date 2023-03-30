import React from "react";
import { defineArrayMember, BlockStyleProps } from "sanity";

const Heading = (props: BlockStyleProps) => (
  <span style={{ fontFamily: 'Raleway,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Liberation Sans",Helvetica,Arial,system-ui,sans-serif', fontSize: "2.441rem", fontWeight: 500, color: "lightsalmon" }}>
    {props.children}
  </span>
);

const SubHeading = (props: BlockStyleProps) => (
  <span style={{ fontFamily: 'Raleway,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue","Liberation Sans",Helvetica,Arial,system-ui,sans-serif', fontSize: "1.563rem", fontWeight: 600 }}>
    {props.children}
  </span>
);




export const HeaderBlockEditor = defineArrayMember({
  name: "headerBlockEditor",
  title: "Header Block Editor",
  type: "block",
  styles: [
    { title: "Heading", value: "heading", component: Heading },
    { title: "Sub Heading", value: "subHeading", component: SubHeading  },
    { title: "Normal", value: "normal" },
  ],
  lists: [],
  marks: {
    decorators: [],
    annotations: [],
  },
});

const textEditor = {
  type: "block",
  styles: [
    { title: "Normal", value: "normal" },
    { title: "H3", value: "h3" },
  ],
  lists: [{ title: "Bullet", value: "bullet" }],
  marks: {
    decorators: [
      { title: "Strong", value: "strong" },
    ],
    annotations: [
    ],
  },
};

export const FeatureSectionBlockEditor = defineArrayMember({
  name: "block",
  title: "Header Block Editor",
  type: "block",
  styles: [
    { title: "Heading", value: "heading", component: Heading },
    { title: "H3", value: "h3"  },
    { title: "Normal", value: "normal" },
  ],
  lists: [],
  marks: {
    decorators: [],
    annotations: [],
  },
});


export const CaseStudyBlockEditor = defineArrayMember({
  name: "block",
  title: "Case Study Block Editor",
  type: "block",
  styles: [
    // { title: "Heading", value: "heading", component: Heading },
    // { title: "H3", value: "h3"  },
    { title: "Normal", value: "normal" },
  ],
  lists: [
    {title: 'Bullet', value: 'bullet'}
  ],
  marks: {
    decorators: [],
    annotations: [],
  },
});


// const textEditor = {
//   type: 'block',
//   // Only allow these block styles
//   styles: [
//     {title: 'Normal', value: 'normal'},
//   ],
//   // Only allow numbered lists
//   lists: [
//     {title: 'Bullet', value: 'bullet'}
//   ],
//   marks: {
//     // Only allow these decorators
//     decorators: [
//       // {title: 'Strong', value: 'strong'},
//       // {title: 'Emphasis', value: 'em', icon: myIcon}
//     ],
//     // Support annotating text with a reference to an author
//     annotations: [
//       // {name: 'author', title: 'Author', type: 'reference', to: {type: 'author'}}
//     ]
//   }
// }