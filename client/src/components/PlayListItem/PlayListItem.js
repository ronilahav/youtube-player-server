import React from "react";
import { Draggable } from "react-beautiful-dnd";

import {
  ItemContainer,
  DetailsContainer,
  Title,
  Length,
  RemoveButton,
} from "./PlayListItem.styles";

const PlayListItem = ({ id, index, title, length, onRemove }) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <ItemContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <DetailsContainer>
            <Title>{title}</Title>
            {length && <Length>{length}</Length>}
          </DetailsContainer>
          <RemoveButton onClick={() => onRemove(id)} />
        </ItemContainer>
      )}
    </Draggable>
  );
};

export default PlayListItem;
