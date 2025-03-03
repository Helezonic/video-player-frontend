import React from 'react'

function Registration() {
    const [email, setEmail] = useState('');
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState('');
    const [username, setusername] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [coverImage, setCoverImage] = useState(null);
    const [token, setToken] = useState(null);
    const [message, setMessage] = useState('');
    const [statusCode, setStatusCode] = useState(0);
    
  return (
    <div>Registration</div>
  )
}

export default Registration