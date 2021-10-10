import Collapsible from 'react-collapsible'
import { isMobile } from 'react-device-detect'
import { AnimateKeyframes } from 'react-simple-animate'

const FaqSection = () => {
  return (
    <section id="faq" className="faqViralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>Faq And Audit</h2>
        <div className={isMobile ? 'faqViralMobileDiv1' : 'faqViralDiv1'}>
          <AnimateKeyframes
            play
            iterationCount="infinite"
            duration={2}
            direction="alternate"
            easeType="cubic-bezier(0.65, 0.05, 0.36, 1)"
            keyframes={[
              'transform: rotate(-30deg);',
              'transform: scale(.95);',
              'transform: rotate(30deg)',
              'transform: scale(.95)',
            ]}
          >
            <img
              src="/images/viral/vcoin_gold.png"
              alt="SweetLandia"
              id="sweetlandia"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </AnimateKeyframes>
          <div className={isMobile ? 'faqViralMobileDiv2' : 'faqViralDiv2'}>
            <Collapsible
              triggerStyle={{
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                borderColor: '#fff',
                borderWidth: '1px',
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
              trigger="Were the Viral Smart Contracts Audited?"
            >
              <div className="faqViralDiv3">Yes, a link can be found here: https://www.google.com/</div>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                borderColor: '#fff',
                borderWidth: '1px',
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
              trigger="Who are the Team Members?"
            >
              <div className="faqViralDiv3">
                ViralCoin is a Decentralized Autonomous Organization that was built for the People, by the People. The
                founding team does not seek notoriety for their participation, therefore once Governance is established,
                ViralCoin will thrive on its own. The ViralSwap Liquidity Pool will be controlled by ViralTrustees,
                nominated here: HTTP://twitter and will keep the Liquidity Pools safe. Governance on Snapshot.org will
                be launched to vote on changes to the contract.
              </div>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                borderColor: '#fff',
                borderWidth: '1px',
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
              trigger="What is the ViralVault?"
            >
              <div className="faqViralDiv3">
                The ViralVault creates ViralCoins on every purchase from ViralSwap to pair and add tokens to the
                liquidity pool. This is to keep the price from exceeding $0.00001 until all Viral are minted. When there
                is an unbalanced amount of USDC during minting, the ViralVault holds the excess and it is spent at the
                discretion of the ViralTeam. When we launch on additional networks, such as Polkadot, Cardano, or xDai,
                tokens from the ViralVault will be created until the Total Maximum Supply across all available networks
                is reached.
              </div>
            </Collapsible>
            <Collapsible
              triggerStyle={{
                borderColor: '#fff',
                borderWidth: '1px',
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
              trigger="Is ViralCoin a token or a coin?"
            >
              <div className="faqViralDiv3">
                It is a token on any given network, however ViralCoin is blockchain agnostic, and will run on many
                networks until the max total supply has been reached, therefore as an overarching theme, it can be
                considered a hybrid coin as well.
              </div>
            </Collapsible>
          </div>
        </div>
        <div className="faqViralDiv4" />
      </div>
    </section>
  )
}

export default FaqSection
