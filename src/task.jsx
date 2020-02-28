import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
  border: 1px solid lightgrey;
  padding: 8px;
  borderr-adius: 2px;
  margin-bottom: 8px;
  background-color: white;
`

export default class Task extends React.Component {

  render() {

    return (
      <Draggable draggableId={this.props.task.id} index={this.props.index}>
        {(provided) => (
          <Container
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // innerRef={provided.innerRef}     // deprecated >> replaced with 'ref'
            ref={provided.innerRef}
          >
            {this.props.task.content}
          </Container>
        )}
      </Draggable>
    )
  }
}