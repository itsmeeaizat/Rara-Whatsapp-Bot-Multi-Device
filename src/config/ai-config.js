// RARA WHATSAPP MULTIDEVICE, AIZAT, MADE IN INDONESIA
//
// AI CONFIG FILE — Khusus untuk semua fitur AI multimodal
// Set API key di sini, semua plugin AI akan otomatis baca dari config ini
//
// Cara pakai di plugin:
//   import { aiConfig } from "../../src/config/ai-config.js"
//   const apiKey = aiConfig.openai.key

export const aiConfig = {
  // GOOGLE GEMINI (Gratis — https://aistudio.google.com/apikey)
  gemini: {
    key: "",
    visionModel: "gemini-2.0-flash",
    textModel: "gemini-2.0-flash",
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
  },

  // OPENAI (Berbayar — https://platform.openai.com/api-keys)
  openai: {
    key: "",
    textModel: "gpt-4o-mini",
    imageModel: "dall-e-3",
    visionModel: "gpt-4o",
    ttsModel: "tts-1",
    sttModel: "whisper-1",
    baseURL: "https://api.openai.com/v1",
  },

  // GROQ (Gratis — https://console.groq.com/keys)
  groq: {
    key: "",
    model: "llama-3.3-70b-versatile",
    baseURL: "https://api.groq.com/openai/v1",
  },

  // HUGGING FACE (Gratis — https://huggingface.co/settings/tokens)
  huggingface: {
    key: "",
    baseURL: "https://api-inference.huggingface.co/models",
  },

  // STABILITY AI (Berbayar — https://platform.stability.ai)
  stability: {
    key: "",
    baseURL: "https://api.stability.ai/v1",
  },

  // REPLICATE (Berbayar — https://replicate.com/account/api-tokens)
  replicate: {
    key: "",
    baseURL: "https://api.replicate.com/v1",
  },

  // POLLINATIONS.AI (Gratis, no key needed!)
  pollinations: {
    baseURL: "https://image.pollinations.ai/prompt",
  },

  // CLIPDROP (Gratis tier — https://clipdrop.co/apis)
  clipdrop: {
    key: "",
    baseURL: "https://clipdrop-api.co/v1",
  },

  // DEEPSEEK (Gratis — https://platform.deepseek.com/api_keys)
  deepseek: {
    key: "",
    model: "deepseek-chat",
    baseURL: "https://api.deepseek.com/v1",
  },

  // TOGETHER AI (Gratis tier — https://api.together.xyz)
  together: {
    key: "",
    model: "meta-llama/Llama-Vision-Free",
    baseURL: "https://api.together.xyz/v1",
  },

  // ELEVENLABS TTS (Gratis — https://elevenlabs.io/api-settings)
  elevenlabs: {
    key: "",
    voice: "Rachel",
    baseURL: "https://api.elevenlabs.io/v1",
  },

  // DEFAULT SETTINGS
  default: {
    imageWidth: 1024,
    imageHeight: 1024,
    imageSteps: 30,
    imageCfgScale: 7,
    maxTokens: 2048,
    temperature: 0.7,
    language: "id",
  },

  // HELPER: Cek apakah key tersedia
  hasKey(provider) {
    return !!(this[provider] && this[provider].key && this[provider].key.length > 0)
  },

  // HELPER: Get key atau throw error
  getKey(provider) {
    if (!this.hasKey(provider)) {
      throw new Error("API key untuk " + provider + " belum di-set di src/config/ai-config.js")
    }
    return this[provider].key
  },
}

export default aiConfig
