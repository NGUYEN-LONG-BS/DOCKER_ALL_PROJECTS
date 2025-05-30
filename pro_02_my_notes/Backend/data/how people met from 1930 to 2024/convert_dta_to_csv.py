import pandas as pd
from tkinter import Tk, filedialog
import os

# Tạo cửa sổ ẩn của Tkinter
root = Tk()
root.withdraw()  # Ẩn cửa sổ chính

# Mở hộp thoại chọn file .dta
input_path = filedialog.askopenfilename(
    title="Chọn file .dta",
    filetypes=[("DTA files", "*.dta")]
)

# Kiểm tra nếu người dùng đã chọn file .dta
if input_path:
    try:
        # Đọc file .dta
        df = pd.read_stata(input_path)
        
        # Lấy tên file gốc (không có đuôi)
        base_name = os.path.splitext(os.path.basename(input_path))[0]
        
        # Mở hộp thoại để chọn vị trí lưu file .csv
        output_path = filedialog.asksaveasfilename(
            title="Chọn nơi lưu file .csv",
            defaultextension=".csv",
            initialfile=base_name,
            filetypes=[("CSV files", "*.csv")]
        )
        
        # Kiểm tra nếu người dùng đã chọn vị trí lưu
        if output_path:
            # Kiểm tra và đổi tên nếu file đã tồn tại
            counter = 1
            original_output_path = output_path
            while os.path.exists(output_path):
                # Thêm số thứ tự vào tên file (ví dụ: name.csv -> name_1.csv)
                base, ext = os.path.splitext(original_output_path)
                output_path = f"{base}_{counter}{ext}"
                counter += 1
            
            # Lưu file CSV
            df.to_csv(output_path, index=False, encoding='utf-8')
            print(f"Đã lưu file thành công tại: {output_path}")
        else:
            print("Không chọn vị trí lưu file.")
            
    except Exception as e:
        print(f"Lỗi khi chuyển file: {str(e)}")
else:
    print("Không có file .dta nào được chọn.")

# Đóng Tkinter
root.destroy()