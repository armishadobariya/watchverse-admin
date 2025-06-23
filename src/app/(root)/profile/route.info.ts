import createRoute, { EmptyRouteParams } from "../../../../route.config"

const ProfilePageRoute = createRoute({
  name: "/profile",
  paramsSchema: EmptyRouteParams,
  fn: () => "/profile",
})

export default ProfilePageRoute
