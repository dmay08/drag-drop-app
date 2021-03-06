import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  border-radius: 2px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
  
  display: flex;
`

const Handle = styled.div`
  width: 20px;
  height: 20px;
  background-color: orange;
  border-radius: 4px;
  margin-right: 8px;
`

export default class Task extends React.Component {

  render() {

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided, snapshot) => (
          <Container
            {...provided.draggableProps}
            
            // {...provided.dragHandleProps}     // ***** if we want a SPECIFIC area for dragging >> move this prop down into <Handle /> 
              // if we do not move this^ prop OUT of the <Container /> then the entire task remains draggable (versus a specific <Handle />)


            // innerRef={provided.innerRef}     // deprecated >> replaced with 'ref'
            
            ref={provided.innerRef}
            
            isDragging={snapshot.isDragging}    // for STYLING during dragging 
          >
            <Handle {...provided.dragHandleProps}/>
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