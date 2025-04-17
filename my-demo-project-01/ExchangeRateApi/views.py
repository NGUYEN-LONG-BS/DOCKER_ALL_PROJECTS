import requests
from xml.etree import ElementTree
from django.shortcuts import render

def get_exchange_rate(request):
    url = "https://portal.vietcombank.com.vn/Usercontrols/TVPortal.TyGia/pXML.aspx?b=10"
    response = requests.get(url)
    
    # Đảm bảo dữ liệu trả về có mã hóa UTF-8
    response.encoding = 'utf-8'
    
    # Loại bỏ BOM nếu có
    response_text = response.text.lstrip('\ufeff')  # Loại bỏ BOM
    
    if response.status_code == 200:
        try:
            # Tiến hành phân tích XML sau khi loại bỏ BOM
            tree = ElementTree.ElementTree(ElementTree.fromstring(response_text))
            root = tree.getroot()
            
            exchange_rates = []
            for exrate in root.findall('Exrate'):
                exchange_rates.append({
                    'currency_code': exrate.get('CurrencyCode'),
                    'currency_name': exrate.get('CurrencyName'),
                    'buy': exrate.get('Buy'),
                    'transfer': exrate.get('Transfer'),
                    'sell': exrate.get('Sell')
                })
            
            return render(request, 'exchange_rate.html', {'exchange_rates': exchange_rates})
        
        except ElementTree.ParseError as e:
            return render(request, 'exchange_rate.html', {'error': f'Lỗi phân tích XML: {str(e)}'})
    else:
        return render(request, 'exchange_rate.html', {'error': 'Không thể lấy dữ liệu từ API'})

def gold_price(request):
    return render(request, 'gia_vang.html')