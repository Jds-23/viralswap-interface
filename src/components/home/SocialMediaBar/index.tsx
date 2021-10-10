import { FaTwitter, FaTelegramPlane, FaDiscord, FaRedditAlien } from 'react-icons/fa'

const SocialMediaBar = () => {
  return (
    <div className="social">
      <ul className="fsocial">
        <li className="social-twitter">
          <a href="https://twitter.com/viralcoindotcom" target="_blank" rel="noreferrer">
            <FaTwitter className="social-button" />
          </a>
        </li>
        <li className="social-telegram">
          <a href="https://t.me/joinchat/M5ubh4pVRENiNTFh" target="_blank" rel="noreferrer">
            <FaTelegramPlane />
          </a>
        </li>
        <li className="social-discord">
          <a href="https://discord.com/invite/5K33YC7x" target="_blank" rel="noreferrer">
            <FaDiscord />
          </a>
        </li>
        <li className="social-reddit">
          <a href="https://www.reddit.com/r/viralcoindotcom" target="_blank" rel="noreferrer">
            <FaRedditAlien />
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SocialMediaBar
