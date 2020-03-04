import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  width: 220px;

  display: flex;
  flex-direction: column;
`
const Title = styled.h3`
  padding: 8px;
  text-align: center;
`
const TaskList = styled.div`
  padding: 8px;
  background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
  transition: background-color 0.2s ease;
  
  flex-grow: 1;          // fills up entire <Container> space >>> so the coloring on drag shows up in the entire div
  min-height: 100px;
`


export default class Column extends React.Component {
  render() {
    return (
      <Container>
        <Title>{this.props.column.title}</Title>

        <Droppable droppableId={this.props.column.id}> 
          {(provided, snapshot) => ( // droppable expects a FUNCTION that returns a React Component (<TaskList>)
            <TaskList
              // innerRef={provided.innerRef}       // deprecated >> replaced with 'ref'
              ref={provided.innerRef}
              {...provided.droppableProps}
              
              isDraggingOver={snapshot.isDraggingOver} // for STYLING during dragging
            >
              {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
              {provided.placeholder}
            </TaskList>

          )}
        </Droppable>

      </Container>
    )
  }
}

// ------------------- 'Snapshot' examples -------------------

// const droppableSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1'
// }