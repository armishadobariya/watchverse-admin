import createRoute, { EmptyRouteParams } from "../../../../route.config"

const LoginPageRoute = createRoute({
  name: "/login",
  paramsSchema: EmptyRouteParams,
  fn: () => "/login",
})

export default LoginPageRoute
