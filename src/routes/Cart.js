import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux"
import { changeName, changeAge } from "../store/userSlice";
import { increaseCount } from "../store";

function Cart() {

  const cart = useSelector(((state)=> state.cart))
  const user = useSelector(((state)=> state.user))

  const dispatch = useDispatch()

  return(
    <div>

      <h6>{user.name}{user.age}의 장바구니</h6>
      <button onClick={()=>{
        dispatch(changeAge(100))
      }}>버튼</button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            cart.map((a, i)=>{
              return (
                <tr key={i}>
                  <td>{cart[i].id}</td>
                  <td>{cart[i].name}</td>
                  <td>{cart[i].count}</td>
                  <td>
                    <button onClick={()=>{
                      dispatch(increaseCount(cart[i].id))}}>+</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table> 
    </div>
  )
}

export default Cart;