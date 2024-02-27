import { useEffect, useState } from 'react';
import { Navbar, Container, Nav, Card } from 'react-bootstrap'
import './App.css';
import data from './data.js'
import { Routes, Route, Link } from 'react-router-dom'
import Detail from './routes/Detail.js'
import axios from 'axios';
import Cart from './routes/Cart.js'

function App() {

  useEffect(()=>{
    if(!localStorage.getItem('watched')) {
      localStorage.setItem('watched', JSON.stringify([]))
    }
  }, [])

  const [shoes, setShoes] = useState(data);
  const [clickButton, setClickButton] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <div className="App">
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href="#home">ShoeShop</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/cart'>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path='/' element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                {
                  shoes.map((a, i) => {
                    return <Goods shoes={shoes[i]} i={i+1} key={i}></Goods>
                  })
                }
              </div>
            </div>
            {
              loading == true? <div>로딩중</div> : null
            }
            <button onClick={()=>{
              setLoading(true);
              setClickButton(clickButton + 1);
              console.log(clickButton);
              if(clickButton == 1) {
                axios.get('https://codingapple1.github.io/shop/data2.json')
                .then((result)=>{
                  const copy = [...shoes, ...result.data];
                  setShoes(copy);
                  setLoading(false);
                })
                .catch(()=>{
                  console.log('fail')
                  setLoading(false);
                })
              } else if(clickButton == 2) {
                axios.get('https://codingapple1.github.io/shop/data3.json')
                .then((result)=>{
                  const copy = [...shoes, ...result.data];
                  setShoes(copy);
                  setLoading(false);
                })
                .catch(()=>{
                  console.log('fail')
                  setLoading(false);
                })
              } else {
                setLoading(false);
                alert('상품 없음')
              }
            }}>더보기</button>
          </>
        } />
        <Route path="/detail/:id" element={ <Detail shoes={shoes}/> }/>
        <Route path="cart" element={<Cart />}></Route>
      </Routes>

    </div>
  );
}

function Goods(props){
  return (
    <div className="col-md-4">
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" alt=""/>
      <h4>{ props.shoes.title }</h4>
      <p>{ props.shoes.price }</p>
    </div>
  )
}

export default App;
