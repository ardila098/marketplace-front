import { Row } from "antd";
import styled from "styled-components";


const Cover = styled(Row)`
  height: 180px;
  border-radius: 16px;
  background: linear-gradient(135deg, rgba(0,0,0,.18), rgba(0,0,0,.55)), url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;
  margin-bottom: 18px;
`


export {
    Cover
}