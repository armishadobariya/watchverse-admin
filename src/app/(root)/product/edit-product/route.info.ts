import createRoute, { EmptyRouteParams } from "../../../../../route.config"

const EditProductPageRoute = createRoute({
  name: "/product/edit-product",
  paramsSchema: EmptyRouteParams,
  fn: () => "/product/edit-product",
})

export default EditProductPageRoute
