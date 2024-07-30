import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import iconsSearch from "./image/iconsSearch.png";
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';
import csspublic from "./styles.css"
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

L.Icon.Default.mergeOptions({
  iconUrl,
  iconRetinaUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 55px;
  background: #FFFFFF;
  border: 1px solid rgba(234, 236, 240, 0.4);
  box-shadow: -85px 141px 66px rgba(207, 207, 207, 0.01), -48px 79px 56px rgba(207, 207, 207, 0.05), -21px 35px 41px rgba(207, 207, 207, 0.09), -5px 9px 23px rgba(207, 207, 207, 0.08);
  border-radius: 16px;
  width: 150%;
  max-width: 960px;
  margin: 0 auto;

  @media only screen and (max-width: 600px) {
    padding: 30px;
    width: 90%;
  }
  @media only screen and (max-width: 1000px) {
    padding: 30px;
    width: 93%;
  }
`;

const Title = styled.h2`
  font-size: 1.5em;
  text-align: center;
  margin-bottom: 10px;

  @media only screen and (max-width: 600px) {
    font-size: 1.2em;
  }

  @media only screen and (min-width: 601px) {
    font-size: 1.5em;
  }
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 20px;
  font-size: 1em;

  @media only screen and (max-width: 600px) {
    font-size: 0.9em;
  }

  @media only screen and (min-width: 601px) {
    font-size: 1em;
  }
`;

const Icon = styled.img`
  height: 30px;
  width: 30px;
  filter: ${(props) => props.white ? 'brightness(0) invert(1)' : 'none'};
`;

const SearchBox = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 800px;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  padding-right: 30px;
  border: solid black 0.5px;
`;

const Input = styled.input`
  padding: 10px 10px;
  padding-top: 10px;
  font-size: 20px;
  border: none;
  outline: none;
  flex-grow: 1;
`;

const Button = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0px 24px;
  gap: 8px;
  width: 72px;
  height: 56px;
  background: linear-gradient(255.96deg, #1043A6 0%, #0C317C 100%);
  border-radius: 8px 0px 0px 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  opacity: ${(props) => props.disabled ? 0.5 : 1};
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};

  @media only screen and (max-width: 600px) {
    padding: 10px 20px;
    height: 50px;
  }

  @media only screen and (min-width: 601px) {
    padding: 10px 30px;
    height: 60px;
  }
`;

const ResultsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row-reverse;
  gap: 30px;
  margin-top: 20px;
  width: 100%;
  max-width: 800px;
  background: #F6F7F9;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media only screen and (max-width: 600px) {
    padding: 15px;
  }

  @media only screen and (min-width: 601px) {
    padding: 20px;
  }
`;

const ResultItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  flex-direction: row-reverse;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ResultText = styled.p`
  margin: 0;
`;

const Message = styled.p`
  text-align: center;
  font-size: 1em;
  color: ${props => props.error ? 'red' : 'black'};
`;

const SearchIP = () => {
  const [ip, setIp] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const { verifytopage } = location.state || {};
  const navigate = useNavigate();
  const pagesecurte = JSON.parse(sessionStorage.getItem('datatoOpenpage'))

  useEffect(() => {
    if (!pagesecurte) {
      navigate('/verify');
    }
  }, [pagesecurte, navigate]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    setData(null);
    try {
      const response = await axios.get('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_E1l3lAu96l3WGs1dvPSHtmshTNxPR&ipAddress=8.8.8.8', {
        params: {
          apiKey: 'at_yDnM3RttiRcJkSYjgKetYYu4ZSHmq',
          ipAddress: ip,
        },
      });
      if (response.data) {
        setData(response.data);
      } else {
        setError('هیچ اطلاعاتی برای این آدرس IP یافت نشد.');
      }
    } catch (error) {
      setError('هیچ اطلاعاتی برای این آدرس IP یافت نشد.');
    }
    setLoading(false);
  };

  return (
    <section className='searchipbody'>
      <div className="background">
        <Container>
          <Title>آی پی مد نظر خود را پیدا کنید</Title>
          <Description>
            اگر بتوانید آدرس IPv4 یا IPv6 یک کاربر اینترنت را بیابید، می توانید با استفاده از ابزار جستجوی IP ما، ایده ای از آن کشور یا جهان پیدا کنید. چه باید کرد: آدرس IP مورد نظر خود را در کادر زیر وارد کنید، سپس روی "دریافت جزئیات IP" کلیک کنید.
          </Description>
          <SearchBox>
            <Input
              type="text"
              placeholder="جستجو"
              value={ip}
              onChange={(e) => setIp(e.target.value)}
            />
            <Icon src={iconsSearch} alt="" className='icon1' />
            <Button onClick={fetchData} disabled={loading || ip === ''}>
              <Icon src={iconsSearch} alt="" white />
            </Button>
          </SearchBox>
          {loading && <Message>Loading...</Message>}
          {error && <Message error>{error}</Message>}
          {data && !loading && !error && (
            <ResultsContainer className='result'>
              <div className="boxresult">
                <ResultItem>
                  <ResultText>   :IP Address</ResultText>
                  <ResultText>{data.ip}</ResultText>
                </ResultItem>
                <ResultItem>
                  <ResultText> :Country</ResultText>
                  <ResultText>{data.location.country}</ResultText>
                </ResultItem>
                <ResultItem>
                  <ResultText> :Region</ResultText>
                  <ResultText>{data.location.region}</ResultText>
                </ResultItem>
                <ResultItem>
                  <ResultText> :City</ResultText>
                  <ResultText>{data.location.city}</ResultText>
                </ResultItem>
                <ResultItem>
                  <ResultText> :Latitude</ResultText>
                  <ResultText>{data.location.lat}</ResultText>
                </ResultItem>
                <ResultItem>
                  <ResultText> :Longitude</ResultText>
                  <ResultText>{data.location.lng}</ResultText>
                </ResultItem>
              </div>

              <MapContainer
                center={[data.location.lat, data.location.lng]}
                zoom={13}
                style={{ height: "200px", width: "200px" }}
                className='mapstyle'
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
                />
                <Marker position={[data.location.lat, data.location.lng]}>
                  <Popup>
                    {data.location.city}, {data.location.region}, {data.location.country}
                  </Popup>
                </Marker>
              </MapContainer>
            </ResultsContainer>
          )}
        </Container>
      </div>
    </section>
  );
};

export default SearchIP;