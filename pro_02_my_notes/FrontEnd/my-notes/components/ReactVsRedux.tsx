// components/ReactVsRedux.tsx
'use client';

export default function ReactVsRedux() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 animate__animated animate__fadeIn">React vs Redux</h1>

      <div className="row g-4">
        {/* React Section */}
        <div className="col-md-6">
          <div className="card animate__animated animate__fadeInLeft">
            <div className="card-header react-bg">
              <h3 className="mb-0">React</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Vai trò:</strong> React là một thư viện JavaScript dùng để xây dựng giao diện người dùng (UI). Nó giúp bạn tạo ra các component tái sử dụng, giúp xây dựng giao diện hiệu quả.
              </p>
              <p>
                <strong>Chức năng:</strong> React quản lý việc hiển thị giao diện và tương tác của người dùng với ứng dụng. Nó không quản lý trạng thái toàn cục của ứng dụng mà chỉ làm việc với trạng thái của các component riêng biệt.
              </p>
              <p>
                <strong>Khả năng tái sử dụng:</strong> React giúp chia giao diện thành các component nhỏ, dễ tái sử dụng và duy trì.
              </p>
              <p>
                <strong>Cách thức hoạt động:</strong> React dựa vào Virtual DOM để tăng hiệu suất render, chỉ cập nhật những phần giao diện cần thiết khi có sự thay đổi trong state.
              </p>
              <hr />
              <h5>Thông tin thêm:</h5>
              <p>
                <strong>Người sáng lập:</strong> Jordan Walke là người sáng lập ra React. Anh làm việc tại Facebook khi phát triển React.
              </p>
              <p>
                <strong>Thời gian tạo:</strong> React được ra mắt vào năm 2013. Phiên bản đầu tiên của React được phát triển và sử dụng nội bộ tại Facebook trước khi được công khai ra cộng đồng.
              </p>
            </div>
          </div>
        </div>

        {/* Redux Section */}
        <div className="col-md-6">
          <div className="card animate__animated animate__fadeInRight">
            <div className="card-header redux-bg">
              <h3 className="mb-0">Redux</h3>
            </div>
            <div className="card-body">
              <p>
                <strong>Vai trò:</strong> Redux là một thư viện quản lý trạng thái dành cho JavaScript, giúp quản lý trạng thái toàn cục của ứng dụng, làm cho việc chia sẻ dữ liệu giữa các component trở nên dễ dàng hơn.
              </p>
              <p>
                <strong>Chức năng:</strong> Redux lưu trữ trạng thái của ứng dụng trong một <strong>store</strong> duy nhất và các thay đổi trạng thái được xử lý thông qua các <strong>actions</strong> và <strong>reducers</strong>.
              </p>
              <p>
                <strong>Khả năng chia sẻ trạng thái:</strong> Redux đặc biệt hữu ích khi ứng dụng có nhiều component cần chia sẻ trạng thái. Thay vì phải truyền dữ liệu qua props, Redux cung cấp một store duy nhất để tất cả các component có thể truy cập và thay đổi trạng thái chung.
              </p>
              <p>
                <strong>Cách thức hoạt động:</strong> Redux sử dụng một <strong>store</strong> để lưu trữ trạng thái, với các <strong>actions</strong> (hành động) và <strong>reducers</strong> (hàm xử lý) để thay đổi trạng thái và cập nhật lại giao diện ứng dụng thông qua React.
              </p>
              <hr />
              <h5>Thông tin thêm:</h5>
              <p>
                <strong>Người sáng lập:</strong> Dan Abramov và Andrew Clark là những người sáng lập Redux. Dan Abramov cũng là một thành viên nổi bật trong cộng đồng React.
              </p>
              <p>
                <strong>Thời gian tạo:</strong> Redux được ra mắt vào năm 2015, mặc dù trước đó đã được phát triển như một dự án cá nhân của Dan Abramov. Redux được xây dựng để giải quyết vấn đề quản lý trạng thái trong ứng dụng JavaScript phức tạp, đặc biệt là các ứng dụng sử dụng React.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12">
          <h3 className="text-center mb-4 animate__animated animate__fadeInUp">Sự khác biệt chính</h3>
          <ul className="list-group animate__animated animate__fadeInUp">
            <li className="list-group-item">
              <strong>React</strong> tập trung vào việc xây dựng giao diện người dùng (UI), còn <strong>Redux</strong> quản lý trạng thái toàn cục của ứng dụng.
            </li>
            <li className="list-group-item">
              <strong>React</strong> quản lý trạng thái của các component riêng lẻ, còn <strong>Redux</strong> quản lý trạng thái của toàn bộ ứng dụng thông qua một store duy nhất.
            </li>
            <li className="list-group-item">
              <strong>React</strong> có thể hoạt động độc lập, nhưng <strong>Redux</strong> thường được sử dụng kết hợp với React để giải quyết vấn đề quản lý trạng thái phức tạp trong ứng dụng lớn.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}