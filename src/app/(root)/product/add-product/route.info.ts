import createRoute, { EmptyRouteParams } from "../../../../../route.config"

const AddProductPageRoute = createRoute({
  name: "/product/add-product",
  paramsSchema: EmptyRouteParams,
  fn: () => "/product/add-product",
})

export default AddProductPageRoute
