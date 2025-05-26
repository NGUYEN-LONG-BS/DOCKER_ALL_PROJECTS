// components/UseStateVsUseReducer.tsx
'use client';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

export default function UseStateVsUseReducer() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 animate__animated animate__fadeIn">
        Phân biệt hook useState và useReducer
      </h1>

      {/* useState Section */}
      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="card animate__animated animate__fadeInUp">
            <div className="card-header usestate-bg">
              <h3 className="mb-0">1. useState</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>useState</strong> là hook đơn giản và phổ biến nhất để quản lý trạng thái trong React. Bạn sử dụng <strong>useState</strong> khi cần quản lý trạng thái của một giá trị duy nhất hoặc khi giá trị trạng thái không phụ thuộc vào các biến trạng thái khác.
              </p>

              <h4>Cách sử dụng:</h4>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const [state, setState] = useState(initialState);`}
              </SyntaxHighlighter>
              <ul>
                <li><strong>state</strong>: Trạng thái hiện tại.</li>
                <li><strong>setState</strong>: Hàm để cập nhật trạng thái.</li>
                <li><strong>initialState</strong>: Giá trị ban đầu của trạng thái.</li>
              </ul>

              <h4>Ví dụ:</h4>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`
const [count, setCount] = useState(0);

const increment = () => {
  setCount(count + 1);
};
                `}
              </SyntaxHighlighter>

              <p>
                <strong>Dùng useState</strong> khi bạn chỉ cần một giá trị đơn giản để theo dõi và cập nhật (ví dụ: một biến đếm, một flag boolean, hoặc một input value).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* useReducer Section */}
      <div className="row g-4 mb-5">
        <div className="col-12">
          <div className="card animate__animated animate__fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="card-header usereducer-bg">
              <h3 className="mb-0">2. useReducer</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>useReducer</strong> được sử dụng khi trạng thái trong ứng dụng của bạn có cấu trúc phức tạp hơn hoặc khi cần xử lý các hành động cập nhật trạng thái trong nhiều tình huống khác nhau (giống như Redux nhưng ở phạm vi local).
              </p>

              <h4>Cách sử dụng:</h4>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`const [state, dispatch] = useReducer(reducer, initialState);`}
              </SyntaxHighlighter>
              <ul>
                <li><strong>state</strong>: Trạng thái hiện tại.</li>
                <li><strong>dispatch</strong>: Hàm dùng để gửi (dispatch) các hành động (actions).</li>
                <li><strong>reducer</strong>: Một hàm nhận vào trạng thái hiện tại và hành động, sau đó trả về trạng thái mới.</li>
                <li><strong>initialState</strong>: Giá trị ban đầu của trạng thái.</li>
              </ul>

              <h4>Ví dụ:</h4>
              <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {`
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const [state, dispatch] = useReducer(reducer, initialState);

const increment = () => {
  dispatch({ type: 'increment' });
};
                `}
              </SyntaxHighlighter>

              <p>
                <strong>Dùng useReducer</strong> khi bạn cần xử lý các hành động phức tạp hơn, đặc biệt là khi trạng thái có nhiều thuộc tính hoặc khi có logic xử lý điều kiện nhiều hơn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="row">
        <div className="col-12">
          <h3 className="text-center mb-4 animate__animated animate__fadeInUp" style={{ animationDelay: '0.4s' }}>
            So sánh useState và useReducer
          </h3>
          <div className="table-responsive animate__animated animate__fadeInUp" style={{ animationDelay: '0.6s' }}>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Tiêu chí</th>
                  <th>useState</th>
                  <th>useReducer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Khi nào sử dụng</strong></td>
                  <td>Quản lý trạng thái đơn giản (1 hoặc 2 giá trị)</td>
                  <td>Quản lý trạng thái phức tạp hoặc nhiều trạng thái liên quan</td>
                </tr>
                <tr>
                  <td><strong>Dễ sử dụng</strong></td>
                  <td>Đơn giản, dễ hiểu cho các giá trị đơn lẻ</td>
                  <td>Cần phải hiểu về reducer và actions</td>
                </tr>
                <tr>
                  <td><strong>Cập nhật trạng thái</strong></td>
                  <td>Cập nhật trực tiếp giá trị</td>
                  <td>Cập nhật trạng thái thông qua một reducer function</td>
                </tr>
                <tr>
                  <td><strong>Khi nào sử dụng tốt nhất</strong></td>
                  <td>Khi có ít trạng thái, hoặc trạng thái đơn giản</td>
                  <td>Khi có nhiều trạng thái hoặc khi cần xử lý logic phức tạp cho việc cập nhật trạng thái hoặc xử lý nhiều hành động khác nhau</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}