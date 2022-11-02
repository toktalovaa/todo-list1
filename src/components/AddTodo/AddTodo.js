import React, { useState } from 'react';
import { v1 as uuidv1 } from 'uuid';
import s from './AddTodo.module.css';
import {Row, Col, Button, FormControl} from 'react-bootstrap';

const AddTodo = ({todo,setTodo}) => {
    const [value, setValue]= useState('')
  
    const saveTodo=()=>{
        if(value){
       setTodo(
        [...todo,{
            id:uuidv1(),
            title:value,
            status:true
        }]
       )
       setValue('')
    }
    }
  
  
  
return (
    <div>
        <Row>
            <Col className={s.input}>
            <FormControl  placeholder='Введите задачу' value={value} onChange={(e)=>setValue(e.target.value)}/>
            <Button  variant="outline-dark" onClick={saveTodo} className={s.btn}>Добавить</Button>
            </Col>
        </Row>
    </div>
  )
}

export default AddTodo;