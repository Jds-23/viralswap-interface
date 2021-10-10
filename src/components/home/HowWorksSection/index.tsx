import { isMobile } from 'react-device-detect'
import Collapsible from 'react-collapsible'

const HowWorksSection = () => {
  return (
    <section id="hworks" className="worksViralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>How It Works</h2>
        <div className={isMobile ? 'worksViralMobileDiv1' : 'worksViralDiv1'}>
          <div className={isMobile ? 'worksViralMobileDiv2' : 'worksViralDiv2'}>
            <Collapsible
              triggerStyle={{
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
              }}
              transitionTime={400}
              trigger="There are 2 Ways to Get ViralCoins:"
              open={true}
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  Connect Your Wallet to Purchase tokens directly from ViralCoin. You are required to pay the fractional
                  gas fee to participate, and it is paid directly to the blockchain.
                </li>
                <li className="worksViralLi">
                  Refer Buyers and receive 1% anytime they buy ViralCoin, at no cost to you. You can connect your wallet
                  and be issued your referral link and begin immediately.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Total Max Supply: 1,000,000,000,000,000 ViralCoin:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  The reason that we mint tokens, instead of pre-mint, is this allows ViralCoin to continuously launch
                  on multiple networks until we reach our predefined maximum token supply. It is challenging for a smart
                  contract like ETH to know the current total supply of tokens on another network like BSC. Our solution
                  is to integrate with Chainlink to monitor when the total max supply is almost reached on each network
                  and stop minting on the smart contracts. If any challenges arise, ViralTrustees will manually turn off
                  minting at the optimal time.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Tokenomics - On Every Buy / Sell / Transfer:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  Price starts and is balanced at $0.00001 until the ViralVault is empty then the price will change.
                </li>
                <li className="worksViralLi">
                  Anyone can buy or sell Viral with most popular available tokens. To get the best rate with the least
                  amount of gas and slippage, use USDC.
                </li>
                <li className="worksViralLi">
                  Global Holder Re-distributed: 3% is sent to all pre-existing holders weighted by the % of the total
                  circulation they hold, excluding the Team Wallet.
                </li>
                <li className="worksViralLi">
                  ViralTeam Wallet: Receives 1% on every Buy / Sell / Transfer, and is blocked from receiving any
                  re-distributions, however is excluded from taxes during transfers.
                </li>
                <li className="worksViralLi">
                  Referrer: 1% is sent to the referrer of every buy. If you someone does not have a referrer, or if
                  someone tries to refer themself, the 1% will be given to the ViralCoin team wallet.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Commerce Enhancement:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  We can exclude certain wallets per transaction type from paying the ViralCoin tax when transferring
                  tokens to an approved commerce partner. Governance will announce and open a vote to accept these
                  merchants prior to to delegating these privileges, which allows us to gauge the community’s
                  preference. This will potentially allow users to send Viral to pay a bill, without fees.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Governance:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  At this moment, the ViralTeam controls the LP. We are actively seeking reputable Multi-Sig guardians
                  (ViralTrustees) to protect the ViralCoin mission and oversee the fulfillment of all future milestones.
                  If you have a recommendation, comment here: Once Governance is enabled, votes will occur on
                  Snapshot.org.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Centralized Exchanges:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  Often times an exchange integrates a defi token in which buyers and sellers do not receive the
                  auto-redistribution rewards and other tokenomic benefits. It could also be speculated that if the
                  trading volume and other token metrics from those type of exchanges were included in market analysis
                  websites, then it could misrepresent how the tokens actually circulated over a given period of time.
                  It has been decided that it would not be beneficial for ViralCoin to participate in these types of
                  exchanges. If we are approached with a positive tokenomic plan that benefits the ViralCoin community,
                  Governance will vote on the implementation.
                </li>
              </ul>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                backgroundColor: 'rgba(68, 33, 138, 0.9)',
                color: '#fff',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '1rem 1.25rem',
                fontSize: '1rem',
                textAlign: 'left',
                overflowAnchor: 'none',
                marginTop: '2px',
              }}
              transitionTime={400}
              trigger="Block From Re-Distribution:"
            >
              <ul className="worksViralUl">
                <li className="worksViralLi">
                  If an exchange or liquidity pool begins harvesting re-distribution tokens in a way that is negligent
                  towards our community, Governance will open a vote to block them from receiving any further
                  re-distributions.
                </li>
              </ul>
            </Collapsible>
          </div>
          <div className="worksViralDiv3">
            <img src="/images/viral/hiwImage.png" alt="" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowWorksSection
