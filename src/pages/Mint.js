import React, { useEffect, useState } from "react";
import { Typography, LinearProgress, Box } from "@mui/material";
import { connect } from "../redux/blockchain/blockchainActions";
import { fetchData } from "../redux/data/dataActions";
import { useDispatch, useSelector } from "react-redux";
import * as s from "../styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  display: block !important;
  text-align: center;
  font-weight: bold;
  font-size: 1em;
  border-radius: 5px;
  border: none;
  color: rgba(0, 0, 0, 1) !important;
  text-shadow: 1px 1px 0 #ffffff !important;
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 180px;
  cursor: pointer;
  background: #f4e709 !important;
  transition: 0.3s !important;
  &:hover:before {
    transform: scale(1) !important;
    box-shadow: 0 0 15px #c0fefc !important;
    filter: blur(2px) !important;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.5) !important;
    box-shadow: 0 0 15px #c0fefc !important;
    text-shadow: 0 0 15px #c0fefc !important;
  }
`;
export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: none;
  border: none;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: #000;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f4e709 !important;
  transition: 0.3s !important;
  &:hover:before {
    transform: scale(1) !important;
    box-shadow: 0 0 2px #c0fefc !important;
    filter: blur(2px) !important;
  }
  &:hover {
    color: rgba(0, 0, 0, 0.5) !important;
    box-shadow: 0 0 2px #c0fefc !important;
    text-shadow: 0 0 2px #c0fefc !important;
  }
`;
export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 25px;
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 0px;
  @media (min-width: 767px) {
    flex-direction: row;
  }
  @media (max-width: 480px) {
    padding-left: 0px;
    padding-right: 0px;
  }
`;
export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 300px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;
export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px dashed var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;
export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;
const BorderLinearProgress = styled(LinearProgress)`
  background-color: rgba(0, 0, 0, 1);
  margin: 16px auto 10px;
  height: 20px;
  border-radius: 5px;
  color: #f4e709;
`;
const Image = styled.img`
  height: 260px;
  width: 62%;
  border-radius: 20px;
  @media (max-width: 480px) {
    height: 210px;
  }
`;

const Mint = () => {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 50) {
      newMintAmount = 50;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: "24px 38px 24px", backgroundColor: "#fff" }}
        // image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg.png" : null}
      >
        <ResponsiveWrapper flex={1} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
              backgroundColor: "#000",
              padding: 24,
              borderRadius: 20,
              boxShadow: "0px 5px 11px 2px rgba(0,0,0,0.3)",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                textAlign: "center",
                fontWeight: "normal",
                fontFamily: "Roboto",
                color: "#20F0EE",
                textShadow:
                  "0 0 10px #fff, 0 0 20px #ff4da6, 0 0 30px #ff4da6, 0 0 40px #ff4da6, 0 0 50px #ff4da6, 0 0 60px #ff4da6, 0 0 70px #ff4da6;",
              }}
            >
              VOLT APE MINTING
            </Typography>
            <s.SpacerSmall />
            <Image src="/config/images/preview.png" alt="NFT To Mint" />
            <s.SpacerSmall />
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: "normal", color: "#F4E709" }}
            >
              Total Minted: {data.totalSupply} / {CONFIG.MAX_SUPPLY}{" "}
            </Typography>
            <Box sx={{ width: "90%" }}>
              <BorderLinearProgress
                variant="determinate"
                value={
                  100 -
                  ((CONFIG.MAX_SUPPLY - data.totalSupply) * 100) /
                    CONFIG.MAX_SUPPLY
                }
              />
            </Box>

            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "#8EC2BE",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <Typography
              variant="subtitle2"
              sx={{ color: "#FFF", marginTop: "5px" }}
            >
              OR
            </Typography>
            <StyledButton
              style={{
                margin: "5px",
              }}
              onClick={(e) => {
                window.open(CONFIG.MARKETPLACE_LINK, "_blank");
              }}
            >
              {CONFIG.MARKETPLACE}
            </StyledButton>
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
};

export default Mint;
