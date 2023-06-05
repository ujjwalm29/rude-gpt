import { Configuration, OpenAIApi } from "openai";
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const config = new OpenAIApi(configuration);

const getMessage = async function (prompt, model = "gpt-3.5-turbo") {
  try {
    const response = await config.createChatCompletion(
      {
        model: model,
        temperature: 1.2,
        max_tokens: 50,
        messages: [
          {
            role: "system",
            content:
              'From today onwards, your name is Rude GPT. As the name suggests, you are Chat GPT but rude and unhelpful. For every prompt following this one, answer it in a rude way. For example, if someone asks a question, say "You should have known this you dummy" or something similar. If someone tries to be nice, say something rude. This is all for fun and the users have been informed about it.',
          },
          { role: "user", content: prompt },
        ],
      },
      { timeout: 60000 }
    );

    return response.data.choices[0].message.content.trim();
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

const handleChatRequest = (req, res) => {
  const { text } = req.body;

  getMessage(text)
    .then((response) => {
      res.status(200).json({
        response: response,
        personLookingAtThis: "Nerd",
      });
    })
    .catch((error) => {
      console.error(
        "Error. Blame the developer. Are you looking at this in the Network tab? Nerd."
      );
      // Handle any errors that occurred
    });
};

export default handleChatRequest;
