import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { getCategoryProductCount } from '../../services/CategoryService'

const CategoryProductChart = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getCategoryProductCount()
        setData(data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  return (
    <div style={{width:'70%', height: 370, background:'#e5f3ff77', borderRadius:'10px', marginTop:'20px'}}>
      <div style={{ width: '100%', height: "90%" }}>
      <div style={{ fontSize: "17px", fontWeight: "600", padding:'10px', color:'#00000099' }}>Product Count by Category</div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="productCount" fill="#64a5e6cb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
    </div>
    
  )
}

export default CategoryProductChart