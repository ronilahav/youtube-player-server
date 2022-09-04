import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { reorder } from "../../utils/logic";

import PlayListItem from "../PlayListItem/PlayListItem";
import { List } from "./PlayList.styles";

const PlayList = ({ playList, onRemove, onListChange }) => {
  const onDragEnd = (result) => {
    if (result.destination) {
      const items = reorder(
        playList,
        result.source.index,
        result.destination.index
      );
      onListChange(items);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <List {...provided.droppableProps} ref={provided.innerRef}>
            {playList.map(({ id, title, length, url }, index) => (
              <PlayListItem
                key={id}
                id={id}
                index={index}
                title={title ? title : url}
                length={length}
                onRemove={onRemove}
              />
            ))}
            {provided.placeholder}
          </List>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PlayList;
