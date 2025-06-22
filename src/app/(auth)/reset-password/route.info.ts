import createRoute, { EmptyRouteParams } from "../../../../route.config"

const ResetPasswordPageRoute = createRoute({
  name: "/reset-password",
  paramsSchema: EmptyRouteParams,
  fn: () => "/reset-password",
})

export default ResetPasswordPageRoute
