import Loading from './(main)/loading';

export default function RootPage() {
  // The AuthProvider will handle redirecting the user to the appropriate page.
  // This page just shows a loader as a fallback.
  return <Loading />;
}
