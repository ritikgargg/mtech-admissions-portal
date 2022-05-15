import ReactGoogleSlides from "react-google-slides";

const SlidesDisplayModule = (props) => {
  return (
    <ReactGoogleSlides
      width={"100%"}
      height={600}
      slidesLink={props.slidesUrl}
      //   slideDuration={5}
      position={1}
      showControls
      //   loop
    />
  );
};
export default SlidesDisplayModule;
