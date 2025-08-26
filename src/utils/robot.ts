export async function askBot(question: string) {
  const response = await fetch(
    "http://localhost:3001/api/v1/prediction/9366bae0-0269-4079-af51-9a5c724fb146",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to connect to Flowise");
  }

  const data = await response.json();
  return data;
}
