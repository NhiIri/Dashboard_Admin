import { useMutation } from "@tanstack/react-query" //Hook quản lý các thao tác bất đồng bộ (các thao tác thay đổi dữ liệu GET, POST, DELETE, PUT)

export const useMutationHooks = (fnCallback) => {
  //Custom Hook useMutationHooks nhận vào hàm fnCallback
  const mutation = useMutation({
    mutationFn: fnCallback,
  })
  return mutation;
}
