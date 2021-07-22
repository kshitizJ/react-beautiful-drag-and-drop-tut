import React, { Component } from 'react'
import styled from 'styled-components'
import Task from './Task'
import { Droppable } from 'react-beautiful-dnd'


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
`
const TaskList = styled.div`
   padding: 8px;
   transition: background-color 0.1s ease;
   background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
   flex-grow: 1;
   min-height: 100px;
`


export default class Column extends Component {
   render() {
      return (
         <Container>
            <Title>{this.props.column.title}</Title>
            {/* <Droppable> tag is used so that we can tell that the column is of droppable type and we can drop list in it. We need to pass a prop to this tag which is droppableId to tell the tag that which column is droppable. The tag has children prop which is a function so we wrap anything inside the tag in a function.  */}
            <Droppable droppableId={this.props.column.id}>
               {(provided, snapshot) => (
                  // (provided.innerRef) function is provided to an HTMLElement and not to an instance of the class. Our <Draggable /> and <Droppable /> components both require a HTMLElement to be provided to them. This is done using the innerRef property on the DraggableProvided and DroppableProvided objects.
                  <TaskList ref={provided.innerRef} {...provided.droppableProps} isDraggingOver={snapshot.isDraggingOver} >
                     {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                     {provided.placeholder}
                  </TaskList>
               )}
            </Droppable>
         </Container>
      )
   }
}
