import { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { addCart } from "../store";

function Detail(props) {

  const [discount, setDiscount] = useState(true)
  const [num, setNum] = useState("")
  const [tab, setTab] = useState(0)

  const dispatch = useDispatch()

  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x => x.id == id);

  // useEffect(()=>{
  //   const timer = setTimeout(()=>{setDiscount(false)}, 2000)

  //   if(isNaN(num) == true) {
  //     alert('그러지마세요')
  //   }

  //   return ()=>{
  //     clearTimeout(timer);
  //   }
  // }, [num])
  
  

  useEffect(()=>{
    if (찾은상품) {
      let item = localStorage.getItem('watched')
      item = JSON.parse(item)
      item.push(id)
  
      item = new Set(item)
      item = Array.from(item)
  
      localStorage.setItem('watched', JSON.stringify(item))
      console.log(localStorage.getItem('watched'))
    }
  }, [])



  return(
    <div className="container detail">
    {
      찾은상품?
      <>
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger" onClick={()=>{
            dispatch(addCart( {id : 1, name : 'red knit', count : 1} ))
          }}>주문하기</button>
        </div>
      </div>

      <Nav variant="tabs"  defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      
      <TabContent tab={tab}></TabContent>
      </>
      : <Back></Back>
      
    }
      {/* <input onChange={(e)=>{setNum(e.target.value)}}/>
      {
        discount == true? <div className="alert alert-warning" style={{opacity:1}}>2초 이내 구매 시 할인</div> : ""
      } */}
    </div>
  )

}

function Back() {
  const navigate = useNavigate();

  alert("상품이 존재하지 않습니다.");
  useEffect(()=>{
    navigate(-1);
  })
}

function TabContent(props) {

  const [fade, setFade] = useState('')

  useEffect(()=>{

    const timer = setTimeout(()=>{setFade('end')}, 100)
    return ()=>{
      clearTimeout(timer)
      setFade('')
    }
  }, [props.tab])

  return (<div className={`start ` + fade}>
      { [<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][props.tab] }
    </div>) 
}

export default Detail;