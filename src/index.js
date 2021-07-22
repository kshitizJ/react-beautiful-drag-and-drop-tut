import React from 'react';
import ReactDOM from 'react-dom';
import Column from './Column';

// getting the initial data
import initialData from './initial-data';

// This package exports a CSS file which provides a minimal reset along with base styles for many HTML elements. It is meant to be used as a basis for all styling to be built upon.
import '@atlaskit/css-reset'

import { DragDropContext } from 'react-beautiful-dnd'
import styled from 'styled-components';


const Container = styled.div`
   display: flex;
`


class App extends React.Component {
   state = initialData

   // onDragEnd is only required here. This function gets a result (which is an object) after the end of drag.
   onDragEnd = result => {
      // console.log("Result ", result);
      // extracting the destination, source and draggableId from the result object.
      const { destination, source, draggableId } = result

      // if there is no destination then simply return. No state change will happen here
      if (!destination) {
         return;
      }

      // if the destination's droppableId and index matches with the source's droppableId and index that means the drag happened but the destination of the drag was same as the source of the drag.
      if (destination.droppableId === source.droppableId && destination.index === source.index) {
         return;
      }

      // // this is only for 1 column, getting the columns from the state
      // const column = this.state.columns[source.droppableId]
      // console.log(source.droppableId);



      const start = this.state.columns[source.droppableId]
      const finish = this.state.columns[destination.droppableId]


      if (start === finish) {

         // getting the taskIds from the column in the form of array
         const newTaskIds = Array.from(start.taskIds)
         // console.log(newTaskIds);

         // at position source.index remove 1 item
         newTaskIds.splice(source.index, 1)

         // at position destination.index remove 0 elements and add draggableId (task's id which was dragged)
         newTaskIds.splice(destination.index, 0, draggableId)


         // creating the newArray of the taskIds in the column
         const newColumn = {
            ...start,
            taskIds: newTaskIds
         }


         // updating the state with the updated column
         const newState = {
            ...this.state,
            columns: {
               ...this.state.columns,
               [newColumn.id]: newColumn
            }
         }

         this.setState(newState)

         return;
      }

      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
         ...start,
         taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
         ...finish,
         taskIds: finishTaskIds,
      }

      const newState = {
         ...this.state,
         columns: {
            ...this.state.columns,
            [newStart.id]: newStart,
            [newFinish.id]: newFinish,
         }
      }

      this.setState(newState)

   }

   render() {
      return (
         // wrapping the entire application in <DragDropContext /> for drag and drop functionalities
         <DragDropContext onDragEnd={this.onDragEnd}>
            <Container>
               {this.state.columnsOrder.map(columnId => {
                  const column = this.state.columns[columnId]
                  const tasks = column.taskIds.map(taskID => this.state.tasks[taskID]);
                  return <Column key={column.id} column={column} tasks={tasks} />
               })}
            </Container>
         </DragDropContext>
      )
   }
}

ReactDOM.render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
   document.getElementById('root')
);
