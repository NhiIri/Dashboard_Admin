import React, { useState } from "react"
import * as ProductService from "../../services/ProductService"
import * as UserService from "../../services/UserService"
import * as CategoryService from "../../services/CategoryService"
import CustomizedContent from "./components/CustomizedContent"
import { useSelector } from "react-redux"
import { useQueries } from "@tanstack/react-query"
import { useMemo } from "react"
import { WrapperHeader } from "./style"

const AdminDashboardPage = () => {
  const user = useSelector((state) => state?.user)

  const [keySelected, setKeySelected] = useState("")

  const getAllProducts = async () => {
    const res = await ProductService.getAllProduct()
    console.log("res", res)
    return { data: res?.data, key: "products" }
  }

  const getAllUsers = async () => {
    const res = await UserService.getAllUser(user?.access_token)
    console.log("res1", res)
    return { data: res?.data, key: "users" }
  }

  const getAllCategories = async () => {
    const res = await CategoryService.getAllCategory()
    console.log("res2", res)
    return { data: res?.data, key: "categories" }
  }

  const queries = useQueries({
    queries: [
      { queryKey: ["users"], queryFn: getAllUsers, staleTime: 1000 * 60 },
      {
        queryKey: ["categories"],
        queryFn: getAllCategories,
        staleTime: 1000 * 60,
      },
      { queryKey: ["products"], queryFn: getAllProducts, staleTime: 1000 * 60 },
    ],
  })
  const memoCount = useMemo(() => {
    const result = {}
    try {
      if (queries) {
        queries.forEach((query) => {
          result[query?.data?.key] = query?.data?.data?.length
        })
      }
      return result
    } catch (error) {
      return result
    }
  }, [queries])
  const COLORS = {
    users: ["#64a5e690", "#91bfe577"],
    products: ["#64a5e690", "#91bfe577"],
    categories: ["#64a5e690", "#91bfe577"],
  }

  console.log("memoCount", memoCount)
  return (
    <>
      <div>
        <div
          style={{ display: "flex", overflowX: "hidden" }}
        >
          <div
            style={{ flex: 1, padding: "15px 0 15px 15px", marginTop: "80px" }}
          >
            {!keySelected && (
              <CustomizedContent
                data={memoCount}
                colors={COLORS}
                setKeySelected={setKeySelected}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboardPage
