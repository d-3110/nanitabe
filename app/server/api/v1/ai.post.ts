export default eventHandler(async (event) => {
  const { prompt } = await readBody(event);

  const payload = {
    model: 'text-davinci-003',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 300,
    n: 1,
  }
  const response = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ''}`,
    },
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const json = await response.json()
  return json
})