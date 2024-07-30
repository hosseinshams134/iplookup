import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import styled from 'styled-components';
import logoimage from "./image/image.png";
import beforeimage from "./image/before.png";
import Toast from './action/Toast';

const VerifyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const Card = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 42px 24px;
  gap: 32px;
  position: absolute;
  width: 375px;
  height: 470px;
  left: calc(50% - 375px/2 + 0.5px);
  top: calc(50% - 423px/2 - 0.5px);
  background: #FFFFFF;
  border: 1px solid #EAECF0;
  box-shadow: -85px 141px 66px rgba(207, 207, 207, 0.01), -48px 79px 56px rgba(207, 207, 207, 0.05), -21px 35px 41px rgba(207, 207, 207, 0.09), -5px 9px 23px rgba(207, 207, 207, 0.08);
  border-radius: 16px;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  margin-bottom: 10px;
  color: white;
  justify-content: center;
  align-items: center;
  padding: 0px 20px;
  gap: 8px;
  width: 343px;
  height: 48px;
  background: linear-gradient(255.96deg, #1043A6 0%, #0C317C 100%);
  border-radius: 8px;
  flex: none;
  order: 0;
  align-self: stretch;
  flex-grow: 0;
`;

function VerifyCode() {
  const [code, setCode] = useState(['', '', '', '']);
  const [toast, settoast] = useState(false);
  const [verifytopage, setverifytopage] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone } = location.state || {};

  useEffect(() => {
    if (!phone) {
      navigate('/');
    }
  }, [phone, navigate]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown > 0 ? prevCountdown - 1 : 0);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e, index) => {
    const newCode = [...code];
    newCode[index] = e.target.value;
    setCode(newCode);
    if (e.target.value && index < 3) {
      document.getElementById(`code-${index + 1}`).focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (verificationCode === '1111') { // password
      setverifytopage(true)
      navigate('/search');
      sessionStorage.setItem('datatoOpenpage', JSON.stringify(true))
    } else {
      settoast(true);
      setTimeout(() => settoast(false), 6000);
    }
  };

  const handleChangePhoneNumber = () => {
    navigate('/', { state: { phone } });
  };

  return (
    <VerifyContainer>
      {toast && <Toast message={"کد اشتباه است"} />}
      <Card>
        <Link className='bef'>
          <img src={beforeimage} alt="" className='befimg' />
        </Link>
        <img src={logoimage} alt="" className='imagelogoverify' />
        <div className='pbox'>
          <p className='p1'>کد تایید را وارد کنید</p>
          <p className='p2'>کد تایید برای شماره {phone} پیامک شد</p>
          <button className='bu1' asChild onClick={handleChangePhoneNumber}>
            <Link className='butext'>تغییر شماره همراه</Link>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='inputsStyle'>
            {code.map((num, index) => (
              <input
                className='input'
                key={index}
                id={`code-${index}`}
                type="text"
                maxLength="1"
                value={code[index]}
                onChange={(e) => handleChange(e, index)}
              />
            ))}
          </div>
          <div className="sendcode">
            <span>کد را دریافت نکردید؟</span>
            {countdown === 0 ? (
              <button className='linksend2' onClick={() => setCountdown(60)}>ارسال مجدد</button>
            ) : (
              <p>ارسال مجدد کد تا {countdown} ثانیه</p>
            )}
          </div>
          <Button type="submit">تایید</Button>
        </form>
      </Card>
    </VerifyContainer>
  );
}

export default VerifyCode;