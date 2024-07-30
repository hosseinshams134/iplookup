// Login.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logoimage from "./image/image.png";
import Toast from './action/Toast';
import csspublic from "./styles.css"

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Card = styled.div`
  background: white;
  padding: 93px 90px;
  border-radius: 23px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;
const CardSign = styled.div`
  position: relative;  
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 700px;
  max-height: 700px;
  flex-direction: row;
  gap: -40px;
  top: 40px;
`;

const Button = styled.button`
  height: 45px;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 150%;
  background: linear-gradient(255.96deg, #1043A6 0%, #0C317C 100%);
  border-radius: 8px;
`;

const Input = styled.input`
  color: black;
  padding: 10px 20px;
  border-radius: 4px;
  width: 150%;
  height: 43px;
`;


function Login() {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.phone) {
      setPhone(location.state.phone);
    }
    if (location.state && location.state.showToast) {
      setShowToast(true);
    }
  }, [location.state]);

  const validatePhone = (phone) => {
    const phoneRegex = /^0\d{10}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validatePhone(phone)) {
      setError('شماره باید با صفر شروع شود، 11 رقم باشد و تنها شامل ارقام باشد.');
      return;
    }
    navigate('/verify', { state: { phone } });
  };

  return (
    <LoginContainer>
      {error && <Toast message={error} />}
      <Card>
        <img src={logoimage} alt="" className='imagelogologin' />
        <div className='pbox'>
          <p className='p1'>به پنل مدیریت تسک پادرو خوش آمدید</p>
          <p className='p2'>برای ورود شماره همراه خود را وارد کنید</p>
        </div>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="شماره همراه"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <Button type="submit">ارسال کد</Button>
        </form>
        <CardSign>
          <span>حساب کاربری ندارید؟</span>
          <Link className='linksend'>ثبت‌نام</Link>
        </CardSign>
      </Card>
    </LoginContainer>
  );
}

export default Login;