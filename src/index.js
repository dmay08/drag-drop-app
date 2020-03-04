import React from 'react';
import ReactDOM from 'react-dom';
import initialData from './initial-data'
import Column from './column'
import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  justify-content: space-around;
  width: 800px;
`

class App extends React.Component {
  state = initialData

  // added 2nd
  onDragStart = () => {
    document.body.style.color = 'orange'
    document.body.style.transition = 'background-color 0.2s ease'
  }

  // added 3rd
  onDragUpdate = update => {
    const { destination } = update
    const opacity = destination ? destination.index / Object.keys(this.state.tasks).length : 0
    document.body.style.backgroundColor = `rgba(153, 141, 217, ${opacity})`
  }

  // added 1st >>> 'onDragEnd' === only callback necessary for <DragDropContext (2 others - onDragUpdate, onDragStart)
  onDragEnd = result => {
    document.body.style.color = 'inherit' // resets color
    document.body.style.backgroundColor = 'inherit' // resets color

    const { destination, source, draggableId } = result
    if (!destination) return

    // Check to see if location of draggable even moved
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return

    //--------- AFTER adding more columns >> replace 'const column' with 'start' and 'stop' -------
    // const column = this.state.columns[source.droppableId]     // this worked with only 1 column
    const start = this.state.columns[source.droppableId]
    const finish = this.state.columns[destination.droppableId]
    
    // >>>> now move all logic below into a NEW CONDITIONAL (now that we have multiple columns)
    if (start === finish) { // aka stayed in 1 column >>> just move previous logic (when we had 1 column) up into this conditional
      const newTaskIds = Array.from(start.taskIds) // changed from (column.taskIds) >> (start.taskIds)
  
      // Move taskId from OLD idx to NEW idx in arr
      newTaskIds.splice(source.index, 1) // From starting index, remove 1 item
      newTaskIds.splice(destination.index, 0, draggableId) // From destination index, remove nothing, insert draggableId (taskId)
  
      const newColumn = {
        // ...column,       // id, title
        ...start, // changed from '...column' >> AFTER adding more columns (and 'start' and 'finish' to replace single 'column')
        taskIds: newTaskIds // New array with the 'dragged' rearrangement 
      }
  
      const newState = {
        ...this.state,
        columns: {
          ...this.state.columns, // unnecessary b/c we only have 1 column, but good practice 
          [newColumn.id]: newColumn // Overrides existing column 
        }
      }
  
      this.setState(newState)

    }

  }

  render() {

    return (
      <DragDropContext
        onDragEnd={this.onDragEnd}  // 'onDragEnd' === only callback necessary for <DragDropContext (2 others - onDragUpdate, onDragStart)
        onDragUpdate={this.onDragUpdate}
        onDragStart={this.onDragStart}

      >
        <Container>
          {this.state.columnOrder.map((columnId) => {
            const column = this.state.columns[columnId]
            const tasks = column.taskIds.map(taskId => this.state.tasks[taskId])

            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </Container>
      </DragDropContext>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

// ------------- example of 'result' object passed into 'onDragEnd()' >>> user dragged it from index 0 >> index 1 -------------------------

// const resut = {
//   draggableId: 'task-1',
//   type: 'TYPE',
//   reason: 'DROP', 
//   source: {
//     droppableId: 'column-1',
//     index: 0
//   },
//   destination: {
//     droppableId: 'column-1',
//     index: 1
//   }
// }