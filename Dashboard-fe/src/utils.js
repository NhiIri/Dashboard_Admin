//Kiểm tra chuỗi đầu vào (data) có là chuỗi Json hợp lệ
export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true
}

//Chuyển tệp (file) thành chuỗi Base64
//Sử dụng FileReader để đọc file
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });

//Tạo đối tượng với các thuộc tính label,key,icon...cho việc hiển thị Menu, danh sách
export function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


