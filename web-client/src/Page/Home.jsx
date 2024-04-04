import React from "react";

const Home = ({ id }) => {
  return (
    <div className="homepage-top">
      <div className="home-inner">
        <img
          src="https://github.com/AnuragRoshan/images/blob/main/Pixel_Working_03.jpg?raw=true"
          alt=""
          srcset=""
          cd
        />
        {id ? (
          <>
            <div className="img-desc">
              No book mark found in collection{" "}
              <span className="collection-highlight">{id}</span>
            </div>
          </>
        ) : (
          <>
            <div className="img-desc">Get Extension for Better Experience</div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
