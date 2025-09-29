import createRoute, { EmptyRouteParams } from "../../../../route.config"

const BrandPageRoute = createRoute({
  name: "/brand",
  paramsSchema: EmptyRouteParams,
  fn: () => "/brand",
})

export default BrandPageRoute
