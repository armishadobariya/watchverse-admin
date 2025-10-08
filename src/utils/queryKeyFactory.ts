const generateQueryKey =
  <TKey extends string>(key: TKey) =>
  <TVars>(...args: NoInfer<TVars>[]) =>
    [key, ...args] as const

const queryKeyFactory = {
  brandList: (search?: string) => ["brand", search || ""],
  categoryList: generateQueryKey("category"),
  productList: generateQueryKey("product"),
}

export default queryKeyFactory
