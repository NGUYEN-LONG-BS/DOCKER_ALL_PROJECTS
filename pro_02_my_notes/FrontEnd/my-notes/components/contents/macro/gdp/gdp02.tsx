import React from 'react';

const GDPPage: React.FC = () => {
    return (
        <div style={styles.container}>
            <h1>Đào Một Cái Hố, Lấp Lại Có Làm Tăng GDP Không?</h1>

            <h2 style={styles.subtitle}>GDP là gì?</h2>
            <p>
                GDP (Tổng sản phẩm quốc nội) đo lường tổng giá trị hàng hóa và dịch vụ được sản xuất trong một quốc gia trong một khoảng thời gian nhất định. Công thức tính GDP theo phương pháp chi tiêu là:
            </p>
            <div style={styles.highlight}>
                <p><strong>GDP = C + I + G + (X - M)</strong></p>
                <p>(C: tiêu dùng, I: đầu tư, G: chi tiêu chính phủ, X: xuất khẩu, M: nhập khẩu)</p>
            </div>

            <h2 style={styles.subtitle}>Đào hố và lấp hố ảnh hưởng thế nào?</h2>
            <ul style={styles.list}>
                <li style={styles.listItem}>Nếu việc đào hố và lấp hố được trả công (ví dụ, thuê công nhân), thì hoạt động này tạo ra thu nhập cho người lao động. Thu nhập này được tính vào GDP vì nó phản ánh một dịch vụ (lao động) được sản xuất và tiêu thụ.</li>
                <li style={styles.listItem}>Ví dụ: Chính phủ hoặc một công ty chi tiền để thuê người đào hố, sau đó lấp lại, thì khoản chi tiêu này được ghi nhận vào <strong>G</strong> (chi tiêu chính phủ) hoặc <strong>C/I</strong> (nếu là tư nhân). Điều này làm tăng GDP, dù hoạt động này không tạo ra giá trị kinh tế thực sự.</li>
            </ul>

            <h2 style={styles.subtitle}>Hạn chế và vấn đề</h2>
            <ul style={styles.list}>
                <li style={styles.listItem}>Hoạt động như đào hố rồi lấp lại không tạo ra giá trị lâu dài (như xây cầu, sản xuất hàng hóa, hay cải thiện cơ sở hạ tầng). Đây thường được gọi là <strong>“hoạt động kinh tế không hiệu quả”</strong> trong lý thuyết kinh tế.</li>
                <li style={styles.listItem}>Nếu việc này được thực hiện mà không trả công (ví dụ, tự bạn đào hố và lấp lại), thì không có giao dịch kinh tế nào được ghi nhận, và GDP không tăng.</li>
            </ul>

            <h2 style={styles.subtitle}>Kết luận</h2>
            <p style={styles.highlight}>
                Đào hố rồi lấp lại <strong>có thể làm tăng GDP</strong> nếu hoạt động này liên quan đến chi tiêu hoặc trả công lao động, vì GDP không phân biệt giữa các hoạt động hiệu quả hay không hiệu quả. Tuy nhiên, nó không đóng góp vào sự giàu có thực sự hay năng suất kinh tế của xã hội.
            </p>

        </div>
    );
}

const styles = {
    container: {
        maxWidth: '800px',
        background: '#fff',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        margin: '20px',
        display: 'flex' as 'flex',  // This is the correct type for `display` property
        flexDirection: 'column' as 'column', // This type ensures correct flexDirection values
        alignItems: 'center' as 'center',  // The correct type for alignItems
    } as React.CSSProperties,  // Explicitly define the type of the `container` object as CSSProperties
    title: {
        color: '#2c3e50',
        textAlign: 'center',
        fontSize: '2.2em',
        marginBottom: '20px',
    },
    subtitle: {
        color: '#34495e',
        fontSize: '1.5em',
        marginTop: '20px',
    },
    paragraph: {
        color: '#333',
        fontSize: '1.1em',
        marginBottom: '15px',
        textAlign: 'justify',
    },
    list: {
        listStyleType: 'disc',
        margin: '15px 0',
        paddingLeft: '30px',
    },
    listItem: {
        marginBottom: '10px',
        color: '#333',
    },
    highlight: {
        backgroundColor: '#e8f4f8',
        padding: '10px',
        borderLeft: '4px solid #3498db',
        margin: '10px 0',
    },
    footer: {
        textAlign: 'center',
        marginTop: '30px',
        fontSize: '0.9em',
        color: '#7f8c8d',
    },
};

export default GDPPage;
