import ReactGoogleSlides from "react-google-slides";

const SlidesDisplayModule = (props) => {
  return (
    <ReactGoogleSlides
      width={"100%"}
      height={600}
      slidesLink={props.slidesUrl}
      position={1}
      showControls
    />
  );
};
export default SlidesDisplayModule;
