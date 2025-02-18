import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import Base64 from "base64-js";
import MarkdownIt from "markdown-it";
import { maybeShowApiKeyBanner } from "./gemini-api-banner";
import "./style.css";

// Get your Gemini API key by:
// - Selecting "Add Gemini API" in the "Project IDX" panel in the sidebar
// - Or by visiting https://g.co/ai/idxGetGeminiKey
let API_KEY = "AIzaSyBdcBFODMDOZOidyb6Kj01gaE-taaoEyhM";

let form = document.querySelector(".recipe-form");
let promptInput = document.querySelector('input[name="prompt"]');
let output = document.querySelector(".output");
let imageInput = document.querySelector("#image-input");
let previewImage = document.querySelector("#preview-image");

// Add image upload preview functionality
imageInput.addEventListener("change", function (e) {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImage.src = e.target.result;
      previewImage.classList.remove("hidden");
      document.querySelector(".upload-placeholder").classList.add("hidden");
    };
    reader.readAsDataURL(file);
  }
});

form.onsubmit = async (ev) => {
  ev.preventDefault();

  if (!imageInput.files[0]) {
    alert("Please select an image first");
    return;
  }

  output.textContent = "Generating your recipe...";
  output.classList.add("loading");

  try {
    // Load the image as base64
    const file = imageInput.files[0];
    const arrayBuffer = await file.arrayBuffer();
    const imageBase64 = Base64.fromByteArray(new Uint8Array(arrayBuffer));

    // Assemble the prompt
    let contents = [
      {
        role: "user",
        parts: [
          { inline_data: { mime_type: file.type, data: imageBase64 } },
          { text: promptInput.value },
        ],
      },
    ];

    // Call the multimodal model, and get a stream of results
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash", // or gemini-1.5-pro
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream({ contents });

    // Update the loading state handling
    output.classList.remove("loading");

    // Read from the stream and interpret the output as markdown
    let buffer = [];
    let md = new MarkdownIt();
    for await (let response of result.stream) {
      buffer.push(response.text());
      output.innerHTML = md.render(buffer.join(""));
    }
  } catch (e) {
    output.classList.remove("loading");
    output.innerHTML = `<div class="error">Error: ${e.message}</div>`;
  }
};

// Update the API key banner styling
maybeShowApiKeyBanner(API_KEY);
