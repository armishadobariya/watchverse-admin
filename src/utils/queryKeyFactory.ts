const generateQueryKey =
  <TKey extends string>(key: TKey) =>
  <TVars>(...args: NoInfer<TVars>[]) =>
    [key, ...args] as const

const queryKeyFactory = {
  brandList: (search?: string) => ["brands", search || ""],
  categoryList: generateQueryKey("category"),
}

export default queryKeyFactory
