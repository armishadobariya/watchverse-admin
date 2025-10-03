import createRoute, { EmptyRouteParams } from "../../../../route.config"

const ProductPageRoute = createRoute({
  name: "/product",
  paramsSchema: EmptyRouteParams,
  fn: () => "/product",
})

export default ProductPageRoute
