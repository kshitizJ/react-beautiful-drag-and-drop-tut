import React, { Component } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

const Container = styled.div`
   border: 1px solid lightgrey;
   border-radius: 2px;
   padding: 8px;
   margin-bottom: 8px;
   background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`

export default class Task extends Component {
   render() {
      return (
         // <Draggable> tag is used so that we can tell that the list is draggable and 
         <Draggable draggableId={this.props.task.id} index={this.props.index} >
            {/* 2nd parameter that is snapshot can be used to style the <Draggable> component during a drag */}
            {(provided, snapshot) => (
               <Container
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} // the dragHandleProps is the path of the draggable that is used to control the dragging of the entire draggable 
                  ref={provided.innerRef}
                  isDragging={snapshot.isDragging}
               >
                  {this.props.task.content}
               </Container>
            )}
         </Draggable>
      )
   }
}
