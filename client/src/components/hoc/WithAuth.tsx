import { Navigate } from "@tanstack/react-router";

const WithAuth = (WrappedComponent: React.ComponentType) => {
  const AuthWrapper = (props: any) => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      // Redirect to login or show an error
      return <Navigate to="/" />  ;
    }
    return <WrappedComponent {...props} />;
  };
  return AuthWrapper;
};
export default WithAuth;