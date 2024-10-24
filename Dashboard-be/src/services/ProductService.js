const Product = require("../models/ProductModel")
const Category = require("../models/CategoryModel")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, countInStock, price, description,discount,category } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'ERR',
                    message: 'The name of product is already'
                })
            }
            const newProduct = await Product.create({
                name, 
                image, 
                category : category, 
                countInStock: Number(countInStock), 
                price, 
                description,
                discount: Number(discount),
            })
            if (newProduct) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: newProduct
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

// const updateProduct = (id, data) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             const checkProduct = await Product.findOne({
//                 _id: id
//             })

//             if (checkProduct === null) {
//                 resolve({
//                     status: 'ERR',
//                     message: 'The product is not defined'
//                 })
//             }

//             const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true })
//             resolve({
//                 status: 'OK',
//                 message: 'SUCCESS',
//                 data: updatedProduct
//             })
//         } catch (e) {
//             reject(e)
//         }
//     })
// }
const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Kiểm tra xem sản phẩm có tồn tại không
            const checkProduct = await Product.findOne({
                _id: id
            });

            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                });
                return;
            }

            // Kiểm tra xem thể loại có tồn tại không nếu có categoryId trong dữ liệu
            if (data.category) {
                const checkCategory = await Category.findOne({
                    _id: data.category
                });

                if (checkCategory === null) {
                    resolve({
                        status: 'ERR',
                        message: 'The category is not defined'
                    });
                    return;
                }

                // Gán tên thể loại từ bảng Category vào data
                data.name = checkCategory.name;  // Cập nhật tên thể loại từ Category
            }

            // Cập nhật sản phẩm với dữ liệu mới (bao gồm cả thể loại nếu có)
            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });

            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedProduct
            });
        } catch (e) {
            reject(e);
        }
    });
}


const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            await Product.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete product success',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
           .populate({
            path: 'category', 
            select: 'name'  
           });

            if (product === null) {
                resolve({
                    status: 'ERR',
                    message: 'The product is not defined'
                })
            }

            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}


const getAllProduct = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProduct = await Product.countDocuments(); // Đếm tổng sản phẩm
            let allProduct = [];

            // Nếu có filter
            if (filter) {
                const label = filter[0];
                const allObjectFilter = await Product.find({ [label]: { '$regex': filter[1] } })
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 })
                    .populate('category', 'name');

                return resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allObjectFilter,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }

            // Nếu có sắp xếp (sort)
            if (sort) {
                const objectSort = {};
                objectSort[sort[1]] = sort[0];

                const allProductSort = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort(objectSort)
                    .sort({ createdAt: -1, updatedAt: -1 })
                    .populate('category', 'name'); // Populate category

                return resolve({
                    status: 'OK',
                    message: 'Success',
                    data: allProductSort,
                    total: totalProduct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProduct / limit)
                });
            }

            // Nếu không có filter hoặc sort, lấy toàn bộ sản phẩm
            if (!limit) {
                allProduct = await Product.find()
                    .sort({ createdAt: -1, updatedAt: -1 })
                    .populate('category', 'name'); // Populate category
            } else {
                allProduct = await Product.find()
                    .limit(limit)
                    .skip(page * limit)
                    .sort({ createdAt: -1, updatedAt: -1 })
                    .populate('category', 'name'); // Populate category
            }

            // Trả về dữ liệu
            return resolve({
                status: 'OK',
                message: 'Success',
                data: allProduct,
                total: totalProduct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProduct / limit)
            });
        } catch (e) {
            return reject(e);
        }
    });
};


// const getProductsByCategory = async (categoryId) => {
//     return await Product.find({ categoryId });
// };

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProduct,
    // getProductsByCategory
}