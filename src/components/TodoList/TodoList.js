import React, { useEffect, useState } from 'react';
import s from './TodoList.module.css';
import { Button, Row, Col, ButtonGroup } from 'react-bootstrap';
import { faCheck, faTrashCan, faPenToSquare, faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';
 import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const TodoList = ({todo, setTodo}) => {
    const [edit, setEdit]= useState(null);
    const [value, setValue]= useState('');
    const [filtered, setFiltred]= useState(todo)

    const todoFilter = (status) => {
      if(status === 'all'){
        setFiltred(todo)
      }else{
        let newTodo = [...todo].filter(item => item.status === status)
        setFiltred(newTodo)
        console.log(newTodo)
      }
    }

    const deleteTodo = (id)=>{
       let newTodo= [...todo].filter(item => item.id != id)
       setTodo(newTodo)
    }

    const statusTodo=(id)=>{
      let newTodo=[...todo].filter(item=>{
        if(item.id == id){
            item.status =! item.status
        }
        return item
      })
      setTodo(newTodo)
    }

    const editTodo= (id,title)=>{
        setEdit(id)
        setValue(title) //чтобы радактировать таск мы должны получить текущее значение title
    }    
    
    const saveTodo =(id)=>{
        let newTodo=[...todo].map(item=>{
            if(item.id == id){
                item.title = value
            }
            return item
        })
        setTodo(newTodo)
        setEdit(null)
    }


    useEffect(()=>{
        setFiltred(todo)
    }, [todo])

    return (
    <div>
        <Row>
            <Col className={s.filrer}>
            <ButtonGroup className={s.groupBtn} aria-label="Basic example">
                <Button variant="secondary" onClick={()=>todoFilter('all')}>Все задачи</Button>
                <Button variant="secondary" onClick={()=>todoFilter(true)}>Открытыe</Button>
                <Button variant="secondary" onClick={()=>todoFilter(false)}>Закрытые</Button>
            </ButtonGroup>
            </Col>
        </Row>
    
        {
            filtered.map(item=>(
            <div key={item.id} className={s.listItems}>
                {
                    edit == item.id ?  //сравнение тернарный оператор, откроется поле для редактирования
                    <div>
                        <input onChange={(e)=>setValue(e.target.value)} value={value} /> 
                    </div> :
                   <div className = { !item.status ? s.close : ''}>{item.title}</div>
                }

                {
                   edit == item.id ?
                   <div>
                <Button variant="outline-success" onClick={()=> saveTodo(item.id)}><FontAwesomeIcon icon={faCheck} /></Button> 
                   </div>:
                   <div>

                        
                        <Button variant="outline-warning" className={s.btn} onClick={()=> editTodo(item.id, item.title)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                        <Button variant="outline-secondary" className={s.btn} onClick={()=> statusTodo(item.id)}>
                            {
                                item.status ? <FontAwesomeIcon icon={faLockOpen} /> : <FontAwesomeIcon icon={faLock} />
                            }
                        </Button>
                            
                        <Button variant="outline-danger" className={s.btn} onClick={()=> deleteTodo(item.id)}><FontAwesomeIcon icon={faTrashCan}/></Button>

                   </div> 
                }

            </div>
            ))
        }
    </div>
  )
}

export default TodoList;