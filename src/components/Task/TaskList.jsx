import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { TaskContext } from '../../TaskContext/TaskContext';
import Task from './Task';


// this is used to render each task and hadle the logic for drag and drop

const TaskList = () => {
  const context = useContext(TaskContext);
  const { state: { tasks }, dispatch } = context;

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const fromIndex = result.source.index || 0;
    const toIndex = result.destination.index || 0;
    const newTasks = [...tasks];
    const item = newTasks.splice(fromIndex, 1)[0];
    newTasks.splice(toIndex, 0, item);
    dispatch({type: 'REARRANGE_TASKS', payload:  newTasks});
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="droppable">
      {(provided, snapshot) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {tasks.map((item, index) => (
            <Draggable key={item.id} draggableId={item.title} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  
                >
                  <Task 
                    title={item.title}
                    id={item.id}
                    body={item.body}
                    status={item.status}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
  )
}

export default TaskList;