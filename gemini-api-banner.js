export function maybeShowApiKeyBanner(
  key,
  action = `enter it at the top of
<code>main.js</code>`
) {
  if (key === "TODO") {
    let banner = document.createElement("div");
    banner.className = "api-key-banner";
    banner.innerHTML = `
      <div class="banner-content">
        To get started with the Gemini API,
        <a href="https://g.co/ai/idxGetGeminiKey" target="_blank">
        get an API key</a> (Ctrl+Click) and ${action}
      </div>`;
    document.body.prepend(banner);

    // Add banner styles
    const style = document.createElement("style");
    style.textContent = `
      .api-key-banner {
        background-color: #ffd43b;
        color: #2d3436;
        padding: 1rem;
        text-align: center;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 1000;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      }
      .api-key-banner a {
        color: #2d3436;
        font-weight: 600;
        text-decoration: underline;
      }
      .banner-content {
        max-width: 1200px;
        margin: 0 auto;
      }
    `;
    document.head.appendChild(style);
  }
}
