import React from "react";
import ContentLoader from "react-content-loader";

const CardSkeletonLoader = (props) => (
  <ContentLoader
    speed={2}
    width={300}
    viewBox="0 0 400 460"
    backgroundColor="#d1d1d1"
    foregroundColor="#ecebeb"
  >
    <circle cx="31" cy="31" r="15" />
    <rect x="58" y="18" rx="2" ry="2" width="140" height="10" />
    <rect x="58" y="34" rx="2" ry="2" width="140" height="10" />
    <rect x="0" y="60" rx="2" ry="2" width="357" height="250" />
    <rect x="0" y="330" rx="2" ry="2" width="357" height="10" />
    <rect x="0" y="350" rx="2" ry="2" width="357" height="10" />
  </ContentLoader>
);

export default CardSkeletonLoader;

