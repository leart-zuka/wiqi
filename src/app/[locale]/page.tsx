"use client";
import CustomLink from "../components/CustomLink";
import SuperpositionButton from "../components/SuperpositionButton";
import MindMap from "../components/mindmap";

export default function Home() {
  return (
    <div className="text-center top-24 h-fit">
      <h1 className="text-5xl"> Map of Quantum </h1>
      <div>
        <CustomLink href="https://www.pushquantum.tech/">test</CustomLink>
        <p>blablaba</p>
      </div>
      <SuperpositionButton>
        This is a superposition button, hover above me and see what happens
      </SuperpositionButton>
      <MindMap />
      { /*
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1>
      <h1> Hi this is a text </h1> */}
    </div>
  );
}

const main_colors = {
  dark_blue: "#06014a",
  pink: "#fe2a77",
};
