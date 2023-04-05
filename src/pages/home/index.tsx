import { useEffect, useRef, useState } from 'react';
import { ReactComponent as Logo } from '@/assets/text_logo.svg';
import { ReactComponent as DiscordLogo } from '@/assets/discord_logo.svg';
import { ReactComponent as TwitterLogo } from '@/assets/twitter_logo.svg';
import { ReactComponent as GithubLogo } from '@/assets/github_logo.svg';
import ModalWithPortal from '@/components/Modal/ModalWithPortal';
import Bideo from '@/utils/bideo';
import styles from './index.less';
import ExternalLink from '@/components/ExternalLink/ExternalLink';
import { Link } from 'umi';

export default function Page() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [comingSoonVisible, setComingSoonVisible] = useState(false);

  useEffect(() => {
    if (comingSoonVisible) {
      setTimeout(() => setComingSoonVisible(false), 3000);
    }
  }, [comingSoonVisible]);

  useEffect(() => {
    if (!videoRef?.current || !contentRef?.current) {
      return;
    }
    var bv = new (Bideo as any)();
    bv.init({
      videoEl: videoRef.current,
      container: document.querySelector('body'),
      resize: true,
      // autoplay: false,
      isMobile: window.matchMedia('(max-width: 768px)').matches,
      src: [
        {
          src: 'http://wsjsq.oss-cn-shenzhen.aliyuncs.com/img/ConchHomeBG_x264.mp4',
          type: 'video/mp4',
        },
      ],
      onLoad: function () {
        setTimeout(() => {
          if (contentRef.current) {
            // contentRef.current.style.backgroundImage = 'url()';
          }
        });
      },
    });
  }, [videoRef, contentRef]);

  return (
    <div className={styles['page-wrap']}>
      <div className={styles['video-wrap']}>
        <video ref={videoRef} loop muted className={styles['video-bg']}></video>
      </div>
      <div className={styles.page} ref={contentRef}>
        <div className={styles.header}>
          <div
            className={styles['menu-btn']}
            onClick={() => setComingSoonVisible(true)}
          ></div>
          <Logo className={styles.logo} />
          <Link to="/trade">
            <div className={styles['launch-btn']}>Launch DApp</div>
          </Link>
        </div>
        <div className={styles['content-wrap']}>
          <div className={styles.content}>
            <div className={styles.title}>
              Search For Treasure
              <br />
              In The Deep Ocean
            </div>
            <div className={styles['coming-soon-text']}>
              <span>Coming soon on the sui devnet.</span>
            </div>
            <div className={styles['btn-group']}>
              <Link to="/trade">
                <div className={styles['main-btn']}>Launch DApp</div>
              </Link>
              <ExternalLink
                href="https://explorer.sui.io/"
                className={styles['second-btn']}
              >
                Explore
              </ExternalLink>
            </div>
            <div className={styles['platform-group']}>
              <ExternalLink href="https://discord.com/">
                <DiscordLogo />
              </ExternalLink>
              <ExternalLink href="https://twitter.com/">
                <TwitterLogo />
              </ExternalLink>
              <ExternalLink href="https://github.com/">
                <GithubLogo />
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
      <ModalWithPortal
        className={styles['coming-soon-popup']}
        isVisible={comingSoonVisible}
        setIsVisible={setComingSoonVisible}
        label={''}
      >
        <div className={styles['coming-soon']}>
          <span>Coming Soon On The Sui Devnet.</span>
        </div>
      </ModalWithPortal>
    </div>
  );
}
