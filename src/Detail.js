import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function Detail(props) {

  const [discount, setDiscount] = useState(true)
  const [num, setNum] = useState("")

  useEffect(()=>{
    const timer = setTimeout(()=>{setDiscount(false)}, 2000)

    if(isNaN(num) == true) {
      alert('그러지마세요')
    }

    return ()=>{
      clearTimeout(timer);
    }
  }, [num])


  let {id} = useParams();
  let 찾은상품 = props.shoes.find(x => x.id == id);

  return(
    <div className="container">
      <input onChange={(e)=>{setNum(e.target.value)}}/>
      {
        discount == true? <div className="alert alert-warning" style={{opacity:1}}>2초 이내 구매 시 할인</div> : ""
      }
      <div className="row">
        <div className="col-md-6">
          <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" alt="" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}원</p>
          <button className="btn btn-danger">주문하기</button>
        </div>
      </div>
    </div>
  )

}

export default Detail;