import createRoute, { EmptyRouteParams } from "../../../../route.config"

const ForgotPasswordPageRoute = createRoute({
  name: "/forgot-password",
  paramsSchema: EmptyRouteParams,
  fn: () => "/forgot-password",
})

export default ForgotPasswordPageRoute
