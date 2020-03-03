import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

export default class Task extends React.Component {

  render() {

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // innerRef={provided.innerRef}     // deprecated >> replaced with 'ref'
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}    // for STYLING
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}

// ------------------- 'Snapshot' examples -------------------

// const draggableSnapshot = {
//   isDragging: true,
//   draggingOver: 'column-1'
// }

// const droppableSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1'
// }