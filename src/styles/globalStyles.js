import styled from "styled-components";

// Used for wrapping a page component
export const Screen = styled.div`
  background-color: var(--primary);
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

// Used for providing space between components
export const SpacerXSmall = styled.div`
  height: 8px;
  width: 8px;
`;

// Used for providing space between components
export const SpacerSmall = styled.div`
  height: 16px;
  width: 16px;
`;

// Used for providing space between components
export const SpacerMedium = styled.div`
  height: 24px;
  width: 24px;
`;

// Used for providing space between components
export const SpacerLarge = styled.div`
  display: flex;
  height: 650px;
  width: 650px;
  @media screen and (max-width: 1794px) {
    height: 550px;
    width: 550px;
  }
  @media screen and (max-width: 1678px) {
    height: 500px;
    width: 500px;
  }
  @media screen and (max-width: 1579px) {
    height: 450px;
    width: 450px;
  }
  @media screen and (max-width: 1469px) {
    height: 400px;
    width: 400px;
  }
  @media screen and (max-width: 1345px) {
    height: 360px;
    width: 360px;
  }
  @media screen and (max-width: 1213px) {
    height: 300px;
    width: 300px;
  }
  @media screen and (max-width: 1108px) {
    height: 260px;
    width: 260px;
  }
  @media screen and (max-width: 975px) {
    height: 220px;
    width: 220px;
  }
  @media screen and (max-width: 878px) {
    height: 150px;
    width: 150px;
  }
  @media screen and (max-width: 766px) {
    height: 350px;
    width: 350px;
  }
  @media screen and (max-width: 480px) {
    height: 250px;
    width: 250px;
  }
`;

// Used for providing a wrapper around a component
export const Container = styled.div`
  display: flex;
  flex: ${({ flex }) => (flex ? flex : 0)};
  flex-direction: ${({ fd }) => (fd ? fd : "column")};
  justify-content: ${({ jc }) => (jc ? jc : "flex-start")};
  align-items: ${({ ai }) => (ai ? ai : "flex-start")};
  background-color: ${({ test }) => (test ? "pink" : "none")};
  width: 100%;
  background-image: ${({ image }) => (image ? `url(${image})` : "none")};
  background-size: cover;
  background-position: center;

  @media screen and (max-width: 768px) {
    background-image: ${({ image }) =>
      image ? `url("/config/images/bg-mobile.png")` : "none"};
  }
  }
  @media screen and (max-width: 480px) {
    background-image: ${({ image }) =>
      image ? `url("/config/images/bg-mobile.png")` : "none"};
  }
`;

export const TextTitle = styled.p`
  color: var(--primary-text);
  font-size: 22px;
  font-weight: 500;
  line-height: 1.6;
`;

export const TextSubTitle = styled.p`
  color: var(--primary-text);
  font-size: 18px;
  line-height: 1.6;
`;

export const TextDescription = styled.p`
  color: var(--primary-text);
  font-size: 15px;
  line-height: 1.6;
`;

export const StyledClickable = styled.div`
  :active {
    opacity: 0.6;
  }
`;
