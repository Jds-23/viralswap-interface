import { isMobile } from 'react-device-detect'

const VmViralSection = () => {
  return (
    <section id="vm" className="vmViralSection">
      <div className="relative flex-col items-center justify-center md:flex">
        <h2 className={isMobile ? 'viralMobileSectionH2' : 'viralSectionH2'}>Viral Map</h2>
        <div className={isMobile ? 'vmViralMobileDiv1' : 'vmViralDiv1'}>
          <div className="vmViralDiv2">
            <img src="/images/viral/check-green-icon.svg" />
            <div className="vmViralDiv3">First Audit</div>
          </div>
          <div className={isMobile ? 'vmViralMobileDiv2' : 'vmViralDiv2'}>
            <img src="/images/viral/check-green-icon.svg" />
            <div className="vmViralDiv3">ViralSwap Launches</div>
          </div>
        </div>
        <div className={isMobile ? 'vmViralMobileDiv1' : 'vmViralDiv1'}>
          <div className="vmViralDiv2">
            <img src="/images/viral/check-green-icon.svg" />
            <div className="vmViralDiv3">Begin Viral Marketing Campaign</div>
          </div>
          <div className={isMobile ? 'vmViralMobileDiv2' : 'vmViralDiv2'}>
            <img src="/images/viral/check-green-icon.svg" />
            <div className="vmViralDiv3">Connect With Popular Listing Services</div>
          </div>
        </div>
        <div className={isMobile ? 'vmViralMobileDiv1' : 'vmViralDiv1'}>
          <div className={isMobile ? 'vmViralMobileDiv4' : 'vmViralDiv4'}>
            <div className="vmViralDiv5">
              <li className="vmViralLi">Appoint ViralTrustees</li>
              <li className="vmViralLi">Continuously integrate additional EVM compliant networks</li>
              <li className="vmViralLi">Release Governance Protocol</li>
            </div>
            <div className="vmViralDiv5">
              <li className="vmViralLi">Release ViralWallet including Subscription Support</li>
              <li className="vmViralLi">Integrate Commerce Merchants</li>
              <li className="vmViralLi">Release Smart Contract Bridge</li>
              <li className="vmViralLi">Launch Stablecoin</li>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VmViralSection
