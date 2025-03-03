import React from 'react'
import Button from './ui/Button';

function Logout() {
    const logout = async () => {
        try {
          const response = await axios.post('https://backend-url/api/auth/logout', {}, {
            headers: { Authorization: `Bearer ${token}` },
          });
          localStorage.removeItem('token');
          setMessage(response.data.message);
        } catch (error) {
          setMessage(error.response?.data?.message || 'Logout failed');
        }
      };
  return (
    <div className="text-center">
        <Button onClick={logout} className="bg-red-500">Logout</Button>
    </div>
    
  )
}

export default Logout