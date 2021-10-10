import AboutSection from '../../components/home/AboutSection'
import FaqSection from '../../components/home/FaqSection'
import HowToBuySection from '../../components/home/HowToBuySection'
import HowWorksSection from '../../components/home/HowWorksSection'
import LandingSection from '../../components/home/LandingSection'
import ReferralSection from '../../components/home/ReferralSection'
import SocialMediaBar from '../../components/home/SocialMediaBar'
import SwapSection from '../../components/home/SwapSection'
import VmViralSection from '../../components/home/VmViralSection'
import { useActiveWeb3React } from '../../hooks'

const Home = () => {
  const { account, chainId, library } = useActiveWeb3React()

  return (
    <>
      {account ? <SwapSection /> : <LandingSection />}
      {account && <ReferralSection />}
      <AboutSection />
      <HowToBuySection />
      <HowWorksSection />
      <VmViralSection />
      <FaqSection />
      <SocialMediaBar />
    </>
  )
}

export default Home
