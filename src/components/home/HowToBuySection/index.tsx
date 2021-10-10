import { useState } from 'react'
import { isIOS, isMobile } from 'react-device-detect'
import { domainURL, domainDAppURL } from '../../../constants'
import base64 from 'base-64'
import { useActiveWeb3React } from '../../../hooks'
import { ChainId } from '@sushiswap/sdk'

const HowToBuySection = () => {
  const { account, chainId, library } = useActiveWeb3React()

  const [showHBV_Ethereum, setShowHBVEthereum] = useState<boolean>(true)
  const [showHBV_Bsc, setShowHBVBsc] = useState<boolean>(false)
  const [showHBV_Matic, setShowHBVMatic] = useState<boolean>(false)

  const [fullEthGasPrice, setFullEthGasPrice] = useState<number>(0)
  const [fullBnbGasPrice, setFullBnbGasPrice] = useState<number>(0)
  const [fullMaticGasPrice, setFullMaticGasPrice] = useState<number>(2)

  const onShowHBV_Ethereum = () => {
    setShowHBVEthereum(true)
    setShowHBVBsc(false)
    setShowHBVMatic(false)
  }
  const onShowHBV_Bsc = () => {
    setShowHBVEthereum(false)
    setShowHBVBsc(true)
    setShowHBVMatic(false)
  }
  const onShowHBV_Matic = () => {
    setShowHBVEthereum(false)
    setShowHBVBsc(false)
    setShowHBVMatic(true)
  }
  return (
    <section id="hbuy" className="buyViralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>How to Buy Viral</h2>
        <div className="row">
          <div className="text-center col-lg-12">
            <nav className="justify-center">
              <button
                style={{
                  background: showHBV_Ethereum ? '#13BFC6' : 'none',
                  borderColor: '#13BFC6',
                  padding: '1rem 2rem',
                  borderRadius: '2rem',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  marginLeft: '1rem',
                  color: '#fff',
                }}
                onClick={() => onShowHBV_Ethereum()}
              >
                Ethereum (ETH)
              </button>
              <button
                style={{
                  background: showHBV_Matic ? '#13BFC6' : 'none',
                  borderColor: '#13BFC6',
                  padding: '1rem 2rem',
                  borderRadius: '2rem',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  marginLeft: '1rem',
                  color: '#fff',
                }}
                onClick={() => onShowHBV_Matic()}
              >
                Polygon (Matic)
              </button>
              <button
                style={{
                  background: showHBV_Bsc ? '#13BFC6' : 'none',
                  borderColor: '#13BFC6',
                  padding: '1rem 2rem',
                  borderRadius: '2rem',
                  display: 'inline-block',
                  marginBottom: '1rem',
                  color: '#fff',
                }}
                onClick={() => onShowHBV_Bsc()}
              >
                Binance Smart Chain (BNB)
              </button>
            </nav>
          </div>
        </div>
        <div className={isMobile ? 'buyViralMobileDiv1' : 'buyViralDiv1'}>
          <h3
            style={{
              fontSize: '1rem',
              fontWeight: 500,
              color: '#fff',
              padding: '0.5rem 0',
              marginBottom: '4px',
              textAlign: 'left',
              display: showHBV_Bsc ? 'block' : 'none',
            }}
          >
            {isMobile
              ? isIOS
                ? `Cheaper and Fast Method using Binance Smart Chain (BNB) to swap for Viral.`
                : `Cheaper and Fast Method using Binance Smart Chain (BNB) to swap for Viral`
              : `Cheaper and Fast Method using Binance Smart Chain (BNB) to swap for Viral`}
          </h3>
          <ol
            style={{
              display: showHBV_Bsc ? 'block' : 'none',
              backgroundColor: 'rgba(72, 64, 142, 0.5)',
              padding: '1rem 3rem',
              borderRadius: '2rem',
              listStyleType: 'none',
              listStylePosition: 'outside',
              textAlign: 'left',
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              paddingInlineStart: '40px',
              marginBottom: '2rem',
            }}
          >
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://apps.apple.com/us/app/metamask/id1438144202">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                ) : (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://play.google.com/store/apps/details?id=io.metamask">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                )
              ) : (
                <>
                  1.{' '}
                  <a
                    className="buyViralA"
                    href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  >
                    Install Metamask
                  </a>{' '}
                  and setup your wallet.
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                2.{' '}
                <a className="buyViralA" aria-current="page" href="#buy">
                  Click Here
                </a>{' '}
                to switch to the Binance Smart Chain Network in MetaMask.
              </>
            </li>
            <li className="buyViralLi">
              <>
                3. Click the 0x… address in the top right of the webpage, which is your wallet address, and it will copy
                to your clipboard.
              </>
            </li>
            <li className="buyViralLi">
              <>
                4. If you do not own BNB, you can{' '}
                <a className="buyViralA" href="https://buy.moonpay.io/?defaultCurrencyCode=BNB">
                  Buy BNB here
                </a>{' '}
                and paste your address when asked, to proceed with the purchase. Regardless of how much ViralCoin you
                buy, you need to budget for a gas fee. Add ${Math.round(fullBnbGasPrice * 100) / 100} to whatever amount
                you purchase so that you can pay the gas when you buy and when you sell in the future. Example: If you
                wanted $500 ViralCoin your total BNB needs to be approximately $
                {500 + Math.round(fullBnbGasPrice * 100) / 100}
              </>
            </li>
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    5.{' '}
                    <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                ) : (
                  <>
                    5.{' '}
                    <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                )
              ) : (
                <>
                  5.{' '}
                  <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                    Re-Visit ViralCoin.com
                  </a>
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                6. If you are Connected in MetaMask, you will see the BUY form to swap BNB for Viral. Enter the amount
                you prefer and press ‘Unlock’. This will charge a few cents to give you permanent access to the
                ViralSwap exchange on the BSC Network.
              </>
            </li>
            <li className="buyViralLi">
              <>7. When the ‘Unlock’ button says ‘Swap’, press it, and complete your acquisition.</>
            </li>
            <li className="buyViralLi">
              <>
                8. Your purchase will be complete in a few seconds. To see Viral within MetaMask,{' '}
                <a
                  className="buyViralA"
                  onClick={() => {
                    let address: string | undefined
                    switch (chainId) {
                      case ChainId.MAINNET:
                        address = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'
                        break
                      case ChainId.BSC:
                        address = '0x947950BcC74888a40Ffa2593C5798F11Fc9124C4'
                        break
                      case ChainId.MATIC:
                        address = '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a'
                        break
                    }
                    const params: any = {
                      type: 'ERC20',
                      options: {
                        address: address,
                        symbol: 'ViralCoin',
                        decimals: 18,
                        image: 'http://54.196.255.82/logo.png',
                      },
                    }

                    if (library && library.provider.isMetaMask && library.provider.request) {
                      library.provider
                        .request({
                          method: 'wallet_watchAsset',
                          params,
                        })
                        .then((success) => {
                          if (success) {
                            console.log('Successfully added ViralCoin to MetaMask')
                          } else {
                            throw new Error('Something went wrong.')
                          }
                        })
                        .catch(console.error)
                    }
                  }}
                >
                  Click Here
                </a>
                . If you are on android or have issues, you may need to manually add Viral to MetaMask.{' '}
                <a style={{ color: '#13BFC6', fontSize: '1rem', fontWeight: 400 }} href="#">
                  Click Here
                </a>{' '}
                for instructions.
              </>
            </li>
          </ol>
          <h3
            style={{
              display: showHBV_Ethereum ? 'block' : 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#fff',
              padding: '0.5rem 0',
              marginBottom: '4px',
              textAlign: 'left',
            }}
          >
            {isMobile
              ? isIOS
                ? `Fastest Method, slightly more expensive method (until further notice) using Ethereum (ETH) to swap for Viral.`
                : `Fastest Method, slightly more expensive method (until further notice) using Ethereum (ETH) to swap for Viral.`
              : `Fastest Method, slightly more expensive method (until further notice) using Ethereum (ETH) to swap for Viral.`}
          </h3>
          <ol
            style={{
              display: showHBV_Ethereum ? 'block' : 'none',
              backgroundColor: 'rgba(72, 64, 142, 0.5)',
              padding: '1rem 3rem',
              borderRadius: '2rem',
              listStyleType: 'none',
              listStylePosition: 'outside',
              textAlign: 'left',
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              paddingInlineStart: '40px',
              marginBottom: '2rem',
            }}
          >
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://apps.apple.com/us/app/metamask/id1438144202">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                ) : (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://play.google.com/store/apps/details?id=io.metamask">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                )
              ) : (
                <>
                  1.{' '}
                  <a
                    className="buyViralA"
                    href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  >
                    Install Metamask
                  </a>{' '}
                  and setup your wallet.
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                2. Make sure it says “Ethereum Main Network” within your MetaMask. If it doesn’t, click the top center
                of MetaMask and select “Ethereum Main Network”.
              </>
            </li>
            <li className="buyViralLi">
              3. Click the 0x… address in the top right of the webpage, which is your wallet address, and it will copy
              to your clipboard.
            </li>
            <li className="buyViralLi">
              4. If you do not own ETH, you can{' '}
              <a className="buyViralA" href="https://buy.moonpay.io/?defaultCurrencyCode=ETH">
                Buy ETH here
              </a>{' '}
              and paste your address when asked, to proceed with the purchase. Regardless of how much ViralCoin you buy,
              you need to budget for a gas fee. Add ${Math.round(fullEthGasPrice * 100) / 100} to whatever amount you
              purchase so that you can pay the gas when you buy and when you sell in the future. Example: If you wanted
              $500 ViralCoin your total ETH needs to be approximately ${500 + Math.round(fullEthGasPrice * 100) / 100}
            </li>
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    5.{' '}
                    <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                ) : (
                  <>
                    5.{' '}
                    <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                )
              ) : (
                <>
                  5.{' '}
                  <a className="buyViralA" href={`${domainDAppURL}?ref=${base64.encode(account)}`}>
                    Re-Visit ViralCoin.com
                  </a>
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                6. If you are Connected in MetaMask, you will see the BUY form to swap ETH for Viral. Enter the amount
                you prefer and press ‘Unlock’. This will charge a few cents to give you permanent access to the
                ViralSwap exchange on the Ethereum Network.
              </>
            </li>
            <li className="buyViralLi">
              7. When the ‘Unlock’ button says ‘Swap’, press it, and complete your acquisition.
            </li>
            <li className="buyViralLi">
              <>
                8. Your purchase will be complete in a few seconds. To see Viral within MetaMask,{' '}
                <a
                  className="buyViralA"
                  onClick={() => {
                    let address: string | undefined
                    switch (chainId) {
                      case ChainId.MAINNET:
                        address = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'
                        break
                      case ChainId.BSC:
                        address = '0x947950BcC74888a40Ffa2593C5798F11Fc9124C4'
                        break
                      case ChainId.MATIC:
                        address = '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a'
                        break
                    }
                    const params: any = {
                      type: 'ERC20',
                      options: {
                        address: address,
                        symbol: 'ViralCoin',
                        decimals: 18,
                        image: 'http://54.196.255.82/logo.png',
                      },
                    }

                    if (library && library.provider.isMetaMask && library.provider.request) {
                      library.provider
                        .request({
                          method: 'wallet_watchAsset',
                          params,
                        })
                        .then((success) => {
                          if (success) {
                            console.log('Successfully added ViralCoin to MetaMask')
                          } else {
                            throw new Error('Something went wrong.')
                          }
                        })
                        .catch(console.error)
                    }
                  }}
                >
                  Click Here
                </a>
                . If you are on android or have issues, you may need to manually add Viral to MetaMask.{' '}
                <a className="buyViralA" href="#">
                  Click Here
                </a>{' '}
                for instructions.
              </>
            </li>
          </ol>
          <h3
            style={{
              display: showHBV_Matic ? 'block' : 'none',
              fontSize: '1rem',
              fontWeight: 500,
              color: '#fff',
              padding: '0.5rem 0',
              marginBottom: '4px',
              textAlign: 'left',
            }}
          >
            Cheapest and Fast Method using Polygon (MATIC) to swap for Viral.
          </h3>
          <ol
            style={{
              display: showHBV_Matic ? 'block' : 'none',
              backgroundColor: 'rgba(72, 64, 142, 0.5)',
              padding: '1rem 3rem',
              borderRadius: '2rem',
              listStyleType: 'none',
              listStylePosition: 'outside',
              textAlign: 'left',
              marginBlockStart: '1em',
              marginBlockEnd: '1em',
              marginInlineStart: '0px',
              marginInlineEnd: '0px',
              paddingInlineStart: '40px',
              marginBottom: '2rem',
            }}
          >
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://apps.apple.com/us/app/metamask/id1438144202">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                ) : (
                  <>
                    1.{' '}
                    <a className="buyViralA" href="https://play.google.com/store/apps/details?id=io.metamask">
                      Install Metamask
                    </a>{' '}
                    and setup your wallet.
                  </>
                )
              ) : (
                <>
                  1.{' '}
                  <a
                    className="buyViralA"
                    href="https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn"
                  >
                    Install Metamask
                  </a>{' '}
                  and setup your wallet.
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                2.{' '}
                <a className="buyViralA" href="#buy">
                  Click Here
                </a>{' '}
                to switch to the Poloygon (Matic) Network in MetaMask.
              </>
            </li>
            <li className="buyViralLi">
              <>
                3. Click the 0x… address in the top right of the webpage, which is your wallet address, and it will copy
                to your clipboard.
              </>
            </li>
            <li className="buyViralLi">
              <>
                4. If you do not own MATIC, you can{' '}
                <a className="buyViralA" href="https://buy.moonpay.io/?defaultCurrencyCode=matic_polygon">
                  Buy MATIC here
                </a>{' '}
                and paste your address when asked, to proceed with the purchase. Regardless of how much ViralCoin you
                buy, you need to budget for a gas fee. Add ${Math.round(fullMaticGasPrice * 100) / 100} to whatever
                amount you purchase so that you can pay the gas when you buy and when you sell in the future. Example:
                If you wanted $500 ViralCoin your total MATIC needs to be approximately $
                {500 + Math.round(fullMaticGasPrice * 100) / 100}
              </>
            </li>
            <li className="buyViralLi">
              {isMobile ? (
                isIOS ? (
                  <>
                    5.{' '}
                    <a
                      className="buyViralA"
                      href={`${domainDAppURL}?ref=${base64.encode(localStorage.getItem('user_address'))}`}
                    >
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                ) : (
                  <>
                    5.{' '}
                    <a
                      className="buyViralA"
                      href={`${domainDAppURL}?ref=${base64.encode(localStorage.getItem('user_address'))}`}
                    >
                      Load ViralCoin.com in MetaMask Automatically
                    </a>
                  </>
                )
              ) : (
                <>
                  5.{' '}
                  <a
                    className="buyViralA"
                    href={`${domainDAppURL}?ref=${base64.encode(localStorage.getItem('user_address'))}`}
                  >
                    Re-Visit ViralCoin.com
                  </a>
                </>
              )}
            </li>
            <li className="buyViralLi">
              <>
                6. If you are Connected in MetaMask, you will see the BUY form to swap MATIC for Viral. Enter the amount
                you prefer and press ‘Unlock’. This will charge a few cents to give you permanent access to the
                ViralSwap exchange on the Matic Network.
              </>
            </li>
            <li className="buyViralLi">
              <>7. When the ‘Unlock’ button says ‘Swap’, press it, and complete your acquisition.</>
            </li>
            <li className="buyViralLi">
              <>
                8. Your purchase will be complete in a few seconds. To see Viral within MetaMask,{' '}
                <a
                  className="buyViralA"
                  onClick={() => {
                    let address: string | undefined
                    switch (chainId) {
                      case ChainId.MAINNET:
                        address = '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2'
                        break
                      case ChainId.BSC:
                        address = '0x947950BcC74888a40Ffa2593C5798F11Fc9124C4'
                        break
                      case ChainId.MATIC:
                        address = '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a'
                        break
                    }
                    const params: any = {
                      type: 'ERC20',
                      options: {
                        address: address,
                        symbol: 'ViralCoin',
                        decimals: 18,
                        image: 'http://54.196.255.82/logo.png',
                      },
                    }

                    if (library && library.provider.isMetaMask && library.provider.request) {
                      library.provider
                        .request({
                          method: 'wallet_watchAsset',
                          params,
                        })
                        .then((success) => {
                          if (success) {
                            console.log('Successfully added ViralCoin to MetaMask')
                          } else {
                            throw new Error('Something went wrong.')
                          }
                        })
                        .catch(console.error)
                    }
                  }}
                >
                  Click Here
                </a>
                . If you are on android or have issues, you may need to manually add Viral to MetaMask.{' '}
                <a className="buyViralA" href="#">
                  Click Here
                </a>{' '}
                for instructions.
              </>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}

export default HowToBuySection
