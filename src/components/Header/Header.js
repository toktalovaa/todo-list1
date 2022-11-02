import React from 'react';
import { Row , Col } from 'react-bootstrap';
import s from './Header.module.css'

const Header = () => {
  return (
 <Row>
    <Col>
      <h1 className={s.header} >TODO LIST</h1>
    </Col>
 </Row>
     
    
  )
}

export default Header;