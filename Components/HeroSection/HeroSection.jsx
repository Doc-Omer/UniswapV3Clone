import React, {useState, useContext } from 'react'
import Image from 'next/image';

//internal import
import Style from './HeroSection.module.css';
import images from '../../assets'
import {Token, SearchToken} from '../index';

const HeroSection = ({accounts, tokenData}) => {
  //useStates
  const [openSetting, setOpenSetting] = useState(false);
  const [openToken, setOpenToken] = useState(false);
  const [openTokensTwo, setOpenTokensTwo] = useState(false)

  const [tokenOne, setTokenOne] = useState ({
    name: 'ETH',
    image: '',
  })

  const [tokenTwo, setTokenTwo] = useState ({
    name: 'ETH',
    image: '',
  }) 


  return(
    <div className={Style.HeroSection}> 
    <div className={Style.HeroSection_box}>
      <div className={Style.HeroSection_box_heading}>
        <p>Swap</p>
        <div className={Style.HeroSection_box_heading_img}>
          <Image src={images.close} alt="image" width={50} height="50" onClick={() => setOpenSetting(true)} />
        </div>

      </div>
      <div className={Style.HeroSection_box_input}>
        <input type="text" placeholder='0'/>
        <button onClick={() => setOpenToken(true) }>
          <Image src={images.image || images.etherlogo} width={20} height={20} alt="ether"/>
          {<small className={Style.symbolClr}>{tokenTwo.name}</small> }
          <small className={Style.nmbrClr}>9474</small>
        </button>
      </div>

      <div className={Style.HeroSection_box_input}>
        <input type="text" placeholder='0'/>
        <button onClick={() => setOpenTokensTwo(true) }>
          <Image src={tokenTwo.image || images.etherlogo} width={20} height={20} alt="ether"/>
          {<small className={Style.symbolClr}>{tokenTwo.name}</small>}
          <small className={Style.nmbrClr}>9474</small>
        </button>
      </div>
      {accounts ? (
        <button style={{color: "white"}} className={Style.HeroSection_box_btn}>Connect</button>
      ):(
        <button className={Style.HeroSection_box_btn} onClick={() => {}}>Swap</button>
      )} 
    </div>
    {openSetting && <Token setOpenSetting={setOpenSetting}/>}

    {openToken && (
      <SearchToken openToken={setOpenToken} tokens = {setTokenOne} tokenData={tokenData}/>
    )}

    {openTokensTwo && (
      <SearchToken openToken={setOpenTokensTwo} tokens = {setTokenOne} tokenData={tokenData}/>
    )}

    </div>
  )
}

export default HeroSection