import { BigNumber } from '@ethersproject/bignumber'
import { isMobile } from 'react-device-detect'
import CountUp from 'react-countup'
import commaNumber from 'comma-number'
import { useState } from 'react'

const AboutSection = () => {
  const [polymaticValue, setPolyMaticValue] = useState<string>('0')
  const [ethValue, setEthValue] = useState<string>('0')
  const [bscValue, setBscValue] = useState<string>('0')

  return (
    <section id="viral" className="viralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <div className={isMobile ? 'viralSectionMobileDiv' : 'viralSectionDiv'}>
          <div className="viralSectionDiv1">
            <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>Viral Mission</h2>
            <p className="viralSectionP1">
              {`Viralcoin's goal is to increase the mass adoption of cryptocurrency to every person on earth, whether it’s through sharing the knowledge and referring others to ViralCoin and earning tokens passively with no purchase required, or by purchasing themselves. Once the max total supply has been reached, there will be millions of holders, each of whom had an equal opportunity to participate, and the token will potentially flourish forever.`}
            </p>
            <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>
              Why is Viral the Supreme Fairness Token?
            </h2>
            <ul className="viralSectionUl">
              <li className="viralSectionLi">
                ViralCoin invented the first ever <span className="viralSectionLiSpan">Fair Balanced Launch (FBL)</span>
                . The FBL rebalances the liquidity pool on every buy/swap until all of ViralCoin has been minted.
                ViralCoin’s FBL keeps the price relatively consistent for every purchaser until the ViralVault is empty.
              </li>
              <li className="viralSectionLi">
                No tokens have been given in advance to anyone. This is the definition of Fair.
              </li>
              <li className="viralSectionLi">No need for Liquidity Providers.</li>
              <li className="viralSectionLi">
                Reputable ViralTrustees are in the process of being evaluated and will be given control of the liquidity
                pool. This resolves a common concern with many other DeFi tokens. You can learn more here:
              </li>
              <li className="viralSectionLi">
                We believe burning tokens at launch is a gimmick and adds no value unless it occurs over time, which we
                will consider at a later date through Governance.
              </li>
              <li className="viralSectionLi">
                The ViralTeam Wallet does not receive any auto-redistributed tokens, nor does the liquidity pool. The
                success is the hands of the community.
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="relative flex-col items-center justify-center mt-12 mb-12 md:flex">
        <div className={isMobile ? 'totalViralMobileDiv1' : 'totalViralDiv1'}>
          <div className="mx-auto">
            <div className="totalViralDiv2">
              <h5 className="totalViralH5">Total Viral Remaining To Be Minted</h5>
              <div className={isMobile ? 'totalViralMobileDiv3' : 'totalViralDiv3'}>
                <CountUp
                  start={0}
                  end={Math.round(
                    BigNumber.from(1000000000000000)
                      .sub(BigNumber.from(ethValue).div(BigNumber.from(10).pow(18)))
                      .sub(BigNumber.from(bscValue).div(BigNumber.from(10).pow(18)))
                      .sub(BigNumber.from(polymaticValue).div(BigNumber.from(10).pow(18)))
                      .toNumber()
                  )}
                  duration={5}
                  separator=","
                  useEasing={true}
                />
              </div>
            </div>
          </div>
        </div>
        <div className={isMobile ? 'totalViralMobileDiv4' : 'totalViralDiv4'}>
          <div className="relative flex-col items-center justify-center mx-auto md:flex">
            <ul className="viralSectionUl">
              <li className="totalViralLi">
                Total Viral Supply:{' '}
                <span className="totalViralSpan">
                  {commaNumber(
                    Math.round(
                      BigNumber.from(ethValue)
                        .div(BigNumber.from(10).pow(18))
                        .add(BigNumber.from(bscValue).div(BigNumber.from(10).pow(18)))
                        .add(BigNumber.from(polymaticValue).div(BigNumber.from(10).pow(18)))
                        .toNumber()
                    ).toString()
                  )}
                </span>{' '}
                of <span className="totalViralSpan">{commaNumber('1000000000000000')}</span>
              </li>
              <li className="totalViralLi">
                Total Viral Ethereum (ETH) Supply:{' '}
                <span className="totalViralSpan">
                  {commaNumber(
                    Math.round(BigNumber.from(ethValue).div(BigNumber.from(10).pow(18)).toNumber()).toString()
                  )}
                </span>
              </li>
              <li className="totalViralLi">
                Total Viral Binance Smart Contract (BNB) Supply:{' '}
                <span className="totalViralSpan">
                  {commaNumber(
                    Math.round(BigNumber.from(bscValue).div(BigNumber.from(10).pow(18)).toNumber()).toString()
                  )}
                </span>
              </li>
              <li className="totalViralLi">
                Viral Polygon (Matic) Supply:{' '}
                <span className="totalViralSpan">
                  {commaNumber(
                    Math.round(BigNumber.from(polymaticValue).div(BigNumber.from(10).pow(18)).toNumber()).toString()
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
