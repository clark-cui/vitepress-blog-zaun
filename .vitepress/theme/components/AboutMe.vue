<template>
  <div class="about-page">
    <div class="about-content">
      <div class="about-avatar">
        <img src="/avator.png" alt="Clark Cui" />
      </div>
      <h1 class="about-name">Clark Cui</h1>
      <p class="about-bio">
        FrontEnd Developer / Web3 Developer
      </p>
      <div class="about-desc">
        <p>
          I'm a Senior <span class="highlight">Frontend Engineer</span> with over 10 years of programming experience. I graduated from the <a class="highlight-link" href="https://www.uestc.edu.cn/" target="_blank" rel="noopener">UESTC</a>, majoring in Automation.
        </p>
        <p>
          Over the past 4+ years, I've worked on the front lines of engineering for <a class="highlight-link" href="https://web3.okx.com/" target="_blank" rel="noopener">OKX Web3</a>, gaining extensive hands-on experience across a broad range of Web3 products and infrastructure. My work has covered public blockchains such as <span class="highlight">OKTC</span> and <a class="highlight-link" href="https://web3.okx.com/xlayer" target="_blank" rel="noopener">X Layer</a>, as well as <a class="highlight-link" href="https://web3.okx.com/earn" target="_blank" rel="noopener">Earn</a>, <a class="highlight-link" href="https://chromewebstore.google.com/detail/okx-wallet/mcohilncbfahbmgdjkbpemcciiolgcge" target="_blank" rel="noopener">Extension Wallet</a>, and <a class="highlight-link" href="https://web3.okx.com/dex-swap" target="_blank" rel="noopener">DEX</a> businesses. I have also building dapps in <span class="highlight">EVM</span>, <span class="highlight">Solana</span>, and <span class="highlight">Bitcoin</span> ecosystem, which has given me a deep understanding of both the technical architecture and product logic behind modern Web3 systems.
        </p>
        <p>
          In addition to being a hands-on engineer, I also have 2 years of engineering management experience. I enjoy solving complex frontend problems, building scalable systems, and working closely with teams to turn ambitious ideas into reliable products.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - var(--vp-nav-height, 64px) - 80px);
  padding: 40px 24px;
}

.about-content {
  max-width: 580px;
  width: 100%;
  text-align: center;
}

.about-avatar {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.about-avatar img {
  width: 135px;
  height: 135px;
  border-radius: 50%;
  border: 5px solid var(--vp-avator-border);
}

@keyframes avator-transform {
  from { transform: rotate(0); }
  to { transform: rotate(360deg); }
}
.about-avatar img:hover {
  animation: 5s linear 0s infinite avator-transform;
}

.about-name {
  font-size: 2.2em;
  font-weight: 700;
  letter-spacing: -0.02em;
  color: var(--vp-c-text-1);
  margin: 0 0 8px;
  line-height: 1.2;
}

.about-bio {
  font-size: 1.1em;
  color: var(--vp-c-text-2);
  margin: 0 0 28px;
  font-weight: 500;
}

.about-desc {
  text-align: left;
  font-size: 0.95em;
  color: var(--vp-c-text-2);
  line-height: 1.9;
}

.about-desc p {
  margin: 0 0 16px;
}

.about-desc p:last-child {
  margin-bottom: 0;
}

.highlight {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
}

.highlight-link {
  color: var(--vp-c-text-1);
  font-weight: 600;
  text-decoration: underline;
  text-decoration-color: var(--vp-c-brand);
  text-decoration-thickness: 2px;
  text-underline-offset: 3px;
  transition: color 0.2s;
}

.highlight-link:hover {
  color: var(--vp-c-brand);
}

@media (max-width: 640px) {
  .about-name {
    font-size: 1.8em;
  }
  .about-page {
    padding: 32px 20px;
    padding-bottom:80px;
  }
}
</style>
