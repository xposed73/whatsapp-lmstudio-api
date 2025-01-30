const base_url = "http://127.0.0.1:1234/v1";
const api_key = "not-needed"; // Not needed for the local mock server

const postCompletion = async (messages) => {
  try {
    const response = await fetch(`${base_url}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${api_key}`
      },
      body: JSON.stringify({
        model: "local-model", // This field is currently unused
        messages: messages,
        temperature: 0.7,
        stream: false
      })
    });

    if (!response.ok) throw new Error('Failed to fetch');

    const completion = await response.json();
    const answer = completion.choices[0].message.content
    return answer;
  } catch (error) {
    console.error('ErrorGS:', error);
  }
};

module.exports = { postCompletion };
