import { useAuth0 } from "@auth0/auth0-react";

export function Header() {
  const { user, isAuthenticated, isLoading, loginWithPopup, logout } =
    useAuth0();
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      {isAuthenticated && (
        <div>
          <p style={{ color: 'black' }}>Welcome, {user.email}</p>
          <button style={{ color: 'black' }} onClick={() => logout()}>Logout</button>
        </div>
      )}

      {!isAuthenticated && (
        <div style={{ textAlign: 'center', marginTop : '40px' }}>
          <p>You're not logged in.</p>
          <button onClick={() => loginWithPopup()}>Log in</button>
        </div>
      )}
    </>
  );
}
