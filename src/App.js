import React, { useState, useMemo, useEffect } from "react";
import styled from "styled-components";

const MAX_PAGE_INDEX = 41;
const VIDEO_PLAY_INDEX = 39;

const SliderRender = ({ index }) => {
  if (index + 1 === VIDEO_PLAY_INDEX)
    return (
      <VideoWrapper>
        <Title src={require("./assets/USVILLAGE_TITLE_39.jpg")} />
        <Video controls>
          <source src={require("./assets/usvil_vidieo.mp4")} type="video/mp4" />
        </Video>
      </VideoWrapper>
    );
  return (
    <PageWrapper>
      <PageImage
        alt={`slider ${index + 1} page`}
        src={require(`./assets/usvillage_${index + 1}.jpg`)}
      />
    </PageWrapper>
  );
};

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  // console.log(currentIndex);
  const prevIndex = useMemo(() => {
    if (currentIndex === 0) return MAX_PAGE_INDEX;
    return currentIndex - 1;
  }, [currentIndex]);

  const nextIndex = useMemo(() => {
    if (currentIndex === MAX_PAGE_INDEX) return 0;
    return currentIndex + 1;
  }, [currentIndex]);

  const preload = (images) => {
    images.forEach((v) => {
      if (v === null) return;
      const img = new Image();
      img.src = v;
    });
  };

  useEffect(() => {
    preload(
      new Array(MAX_PAGE_INDEX + 1)
        .fill(null)
        .map((_, i) =>
          i !== VIDEO_PLAY_INDEX - 1
            ? require(`./assets/usvillage_${i + 1}.jpg`)
            : null
        )
    );
  }, []);

  return (
    <SlideWrapper>
      {currentIndex === 0 ? (
        <NullIcon src={require("./assets/nobutton.png")} />
      ) : (
        <Icon
          src={require("./assets/prev_button.png")}
          alt="prev"
          onClick={() => setCurrentIndex(prevIndex)}
        />
      )}

      <SliderRender index={currentIndex} />
      {currentIndex === MAX_PAGE_INDEX ? (
        <NullIcon src={require("./assets/nobutton.png")} />
      ) : (
        <Icon
          src={require("./assets/next_button.png")}
          alt="next"
          onClick={() => setCurrentIndex(nextIndex)}
        />
      )}
    </SlideWrapper>
  );
};

const SlideWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Icon = styled.img`
  width: 5vw;
  height: 5vw;
  cursor: pointer;
  margin: 0 4.5vw;
`;

const NullIcon = styled(Icon)`
  cursor: default;
`;

const PageWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const VideoWrapper = styled(PageWrapper)`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const PageImage = styled.img`
  width: 90%;
`;

const Video = styled.video`
  width: 88%;
`;

const Title = styled.img`
  width: 90%;
  margin-bottom: 2vh;
`;

export default App;
