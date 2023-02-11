export default defineNuxtRouteMiddleware(async (to, _from) => {
  const user = useSupabaseUser()
  const { auth } = useSupabaseClient()
  const session = await auth.getSession()
  if (!session.data.session) {
    return navigateTo('/')
  }
})