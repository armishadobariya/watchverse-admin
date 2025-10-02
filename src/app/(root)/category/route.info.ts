import createRoute, { EmptyRouteParams } from "../../../../route.config"

const CategoryPageRoute = createRoute({
  name: "/category",
  paramsSchema: EmptyRouteParams,
  fn: () => "/category",
})

export default CategoryPageRoute
