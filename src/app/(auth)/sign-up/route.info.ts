import createRoute, { EmptyRouteParams } from "../../../../route.config"

const SignUpPageRoute = createRoute({
  name: "/sign-up",
  paramsSchema: EmptyRouteParams,
  fn: () => "/sign-up",
})

export default SignUpPageRoute
