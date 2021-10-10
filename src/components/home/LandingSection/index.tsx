import QuestionHelper from '../../QuestionHelper'

const LandingSection = () => {
  return (
    <section id="buy" className="heroSection">
      <div className="mx-auto text-center">
        <img src="/images/viral/hero.png" className="heroImage" alt="" />
        <div className="heroContent">
          <h5 className="heroGo">{`Let's go`}</h5>
          <h3 className="heroViralTogether">Viral together</h3>
          <p className="heroGo">Refer People To Buy The Most ViralCoin Ever.</p>
        </div>
        <div className="align-center">
          <div>
            <p className="heroAvailable">Available On:</p>
          </div>
          <div className="flex justify-center">
            <div className="heroAvailableDiv">
              <QuestionHelper text={'i18n._(`Ethereum (ETH)`)'}>
                <button
                //   onClick={toggleWalletModal}
                >
                  <img src="/images/viral/eth.png" alt="" />
                </button>
              </QuestionHelper>
            </div>
            <div className="heroAvailableDiv">
              <QuestionHelper text={'i18n._(`Polygon (Matic)`)'}>
                <button
                //   onClick={toggleWalletModal}
                >
                  <img src="/images/viral/matic.png" alt="" />
                </button>
              </QuestionHelper>
            </div>
            <div className="heroAvailableDiv">
              <QuestionHelper text={'i18n._(`Binance Smart Chain (BNB)`)'}>
                <button
                //   onClick={toggleWalletModal}
                >
                  <img src="/images/viral/binance.png" alt="" />
                </button>
              </QuestionHelper>
            </div>
          </div>
        </div>
        <div className="row">
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
                  // setChartGuideShow(true)
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

export default LandingSection
