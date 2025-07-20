import createRoute, { EmptyRouteParams } from "../../../../route.config"

const DashboardPageRoute = createRoute({
  name: "/dashboard",
  paramsSchema: EmptyRouteParams,
  fn: () => "/dashboard",
})

export default DashboardPageRoute
