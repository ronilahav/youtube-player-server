import React, { useState, useEffect, useRef } from "react";

import { initSocketEvents } from "../../api/socket.io";
import { getVideos, deleteVideo } from "../../api/crudRequests";
import { onAdd } from "../../utils/logic";

import Form from "../Form/Form";
import PlayList from "../PlayList/PlayList";
import YouTubePlayer from "../YouTubePlayer/YouTubePlayer";

import { MainLayout, PlayListContainer } from "./App.styles";

function App() {
  const isEffectRan = useRef(false);

  const [playList, setPlayList] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(null);

  useEffect(() => {
    if (!isEffectRan.current) {
      getVideos().then((data) => setPlayList(data));
      initSocketEvents({
        onNewVideo: (data) => setPlayList((prev) => [...prev, data]),
      });
    }
    return () => {
      isEffectRan.current = true;
    };
  }, []);

  useEffect(() => {
    if (!playList.length) {
      setCurrentVideo(null);
    } else if (!currentVideo || playList[0].id !== currentVideo.id) {
      setCurrentVideo(playList[0]);
    }
  }, [playList]);

  const onRemoveVideoHandler = (id) => {
    deleteVideo(id);
    setPlayList((prev) => prev.filter((video) => id !== video.id));
  };

  return (
    <MainLayout>
      <PlayListContainer>
        <Form onAdd={onAdd} />
        {playList.length > 0 && (
          <PlayList
            playList={playList}
            onRemove={onRemoveVideoHandler}
            onListChange={setPlayList}
          />
        )}
      </PlayListContainer>
      {currentVideo && (
        <YouTubePlayer
          id={currentVideo.id}
          videoId={currentVideo.embedCode}
          onEnd={onRemoveVideoHandler}
        />
      )}
    </MainLayout>
  );
}

export default App;
