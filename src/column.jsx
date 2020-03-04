import React from 'react'
import styled from 'styled-components'
import { Droppable } from 'react-beautiful-dnd'
import Task from './task'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  align-items: center;
  border-bottom: ${prop => prop.column.id === 'column-3' ? 'none' : '1px solid black'};
`
const Title = styled.h5`
  text-align: center;
  margin: 2px;
`
const TaskList = styled.div`
  width: 250px;
  padding: 5px;
  background-color: ${props => (props.isDraggingOver ? 'lightgrey' : 'white')};
  transition: background-color 0.2s ease;
  flex-grow: 1;          // fills up entire <Wrapper> space >>> so the coloring on drag shows up in the entire div
  
`


export default class Column extends React.Component {
  render() {

    return (
      <Wrapper column={this.props.column} >
        <Title column={this.props.column} >{this.props.column.title}</Title>

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

      </Wrapper>
    )
  }
}

// ------------------- 'Snapshot' examples -------------------

// const droppableSnapshot = {
//   isDraggingOver: true,
//   draggingOverWith: 'task-1'
// }