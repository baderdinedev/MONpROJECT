import React, { useState } from 'react';

const ChatGPTTranslator = () => {
  const [inputText, setInputText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('fr'); 
  const [translatedText, setTranslatedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const translateText = async () => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful assistant that translates text.' },
            { role: 'user', content: `Translate the following text to ${targetLanguage}: ${inputText}` },
          ],
        }),
      });

      const data = await response.json();
      const assistantReply = data.choices[0].message.content;
      setTranslatedText(assistantReply);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div>
      <div>
        <textarea value={inputText} onChange={handleInputChange} placeholder="Enter text to translate" />
      </div>
      <div>
        <label>Select target language:</label>
        <select value={targetLanguage} onChange={handleLanguageChange}>
          <option value="fr">French</option>

        </select>
      </div>
      <div>
        <button onClick={translateText}>Translate</button>
      </div>
      <div>
        <p>Translated text: {translatedText}</p>
      </div>
    </div>
  );
};

export default ChatGPTTranslator;
