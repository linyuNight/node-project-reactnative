// const ispro = import.meta.env.MODE === 'pro'
const ispro = false

export const isPro = ispro

export const baseUrl = ispro ? 'https://bibibi.website:3333' : 'http://127.0.0.1:3333'