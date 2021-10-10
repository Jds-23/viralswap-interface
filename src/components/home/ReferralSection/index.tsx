import { ChainId } from '@sushiswap/sdk'
import { useActiveWeb3React } from '../../../hooks'
import { isMobile, isIOS } from 'react-device-detect'
import { useState } from 'react'
import { useLingui } from '@lingui/react'
import useCopyClipboard from '../../../hooks/useCopyClipboard'
import Tooltip from '../../Tooltip'
import { domainURL, domainDAppURL } from '../../../constants'
import base64 from 'base-64'
const ReferralSection = () => {
  const { i18n } = useLingui()
  const { account, chainId, library } = useActiveWeb3React()

  const [halfEthGasPrice, setHalfEthGasPrice] = useState<number>(0)
  const [halfBnbGasPrice, setHalfBnbGasPrice] = useState<number>(0)
  const [halfMaticGasPrice, setHalfMaticGasPrice] = useState<number>(1)

  const [referralLink, setReferralLink] = useState<string>(``)
  const [isCopied, setCopied] = useCopyClipboard()

  const [chartGuideShow, setChartGuideShow] = useState<boolean>(false)
  const [networkGuideShow, setNetworkGuideShow] = useState<boolean>(false)
  const [qrcodeShow, setQRCodeShow] = useState<boolean>(false)

  const handleShareWithFriends = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'ViralCoin.com',
          text: `Let's Go Viral Together`,
          url: `${referralLink}`,
        })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error))
    }
  }

  return (
    <section id="refer" className="referViralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>Refer a Friend</h2>
        <h3 className="referViralH3">
          Referral Rewards: <span className="referViralSpan">5555555555 VIRAL</span>
        </h3>
        {chainId && chainId == ChainId.BSC ? (
          <h4 className="referViralH4">
            You can earn 1% of all purchases when your Friends buy ViralCoin (Viral) if you send them your Referral
            link. When you decide to sell ViralCoin (Viral), you will need at least $
            {Math.round(halfBnbGasPrice * 100) / 100} worth of BNB in your wallet to pay for gas fees. Spread the word!
          </h4>
        ) : chainId && chainId == ChainId.MAINNET ? (
          <h4 className="referViralH4">
            You can earn 1% of all purchases when your Friends buy ViralCoin (Viral) if you send them your Referral
            link. When you decide to sell ViralCoin (Viral), you will need at least $
            {Math.round(halfEthGasPrice * 100) / 100} worth of ETH in your wallet to pay for gas fees. Spread the word!
          </h4>
        ) : (
          <h4 className="referViralH4">
            You can earn 1% of all purchases when your Friends buy ViralCoin (Viral) if you send them your Referral
            link. When you decide to sell ViralCoin (Viral), you will need at least $
            {Math.round(halfMaticGasPrice * 100) / 100} worth of MATIC in your wallet to pay for gas fees. Spread the
            word!
          </h4>
        )}
        <div className="referViralDiv1">
          <div className="referViralDiv2">
            <div className="referViralDiv3">
              <label className="referViralLabel">Referral Link: </label>
              {isMobile && (
                <img
                  src="https://img.icons8.com/fluent/24/000000/share-3.png"
                  onClick={() => handleShareWithFriends()}
                />
              )}
            </div>
            <div className="referViralDiv4">
              {account && referralLink === '' && setReferralLink(`${domainURL}/?r=${base64.encode(account)}`)}
              <input
                type="text"
                id="disabledTextInput"
                placeholder={account ? `${domainURL}/?r=${base64.encode(account)}` : ``}
                onChange={(e) => setReferralLink(e.target.value)}
                value={referralLink}
                aria-label="Amount (to the nearest dollar)"
                onFocus={(e) => {
                  e.target.select()
                  console.log('focus')
                }}
                className="referViralInput"
              />
              <Tooltip text={i18n._(`Copied to Clipboard!`)} show={isCopied}>
                <span
                  onClick={() => {
                    setCopied(referralLink)
                    if (referralLink.length > 0) {
                      let linkIndex = referralLink.indexOf(`${domainURL}/?r=`)
                      if (linkIndex > 0) {
                        let newAccount = referralLink.replace(`${domainURL}/?r=`, '')
                        localStorage.setItem('user_address', base64.decode(newAccount))
                      } else {
                        localStorage.setItem('user_address', '')
                      }
                    }
                  }}
                  className="referViralSpan1"
                >
                  <img src="/images/viral/copy-black.svg" className="referViralIcon" />
                </span>
              </Tooltip>
            </div>
          </div>
          <div className="referViralDiv5">
            <img src="/images/viral/qr_code.png" alt="" onClick={() => setQRCodeShow(true)} />
          </div>
        </div>
        <div className="mt-12 row">
          <div className="text-center col-lg-12">
            <nav className="justify-center">
              <a className="heroAvailableSelectButton" aria-current="page" href="#viral">
                Viral Mission
              </a>
              <a className="heroAvailableNoSelectButton" aria-current="page" href="#hworks">
                How it Works
              </a>
              <a className="heroAvailableNoSelectButton" aria-current="page" href="#vm">
                Viral Map
              </a>
              <a className="heroAvailableNoSelectButton" aria-current="page" href="#faq">{`FAQ & Audit`}</a>
              <button
                className="heroAvailableNoSelectButton"
                onClick={() => {
                  setChartGuideShow(true)
                }}
              >
                Charts
              </button>
              <a className="heroAvailableNoSelectButton" aria-current="page" href="#hbuy">
                How to Buy Viral
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReferralSection
