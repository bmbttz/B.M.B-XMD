/**const { adams } = require('../Ibrahim/adams');
const traduire = require("../Ibrahim/traduction");
const { default: axios } = require('axios');

// Set your OpenAI API key
const openaiApiKey = "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";

adams({ nomCom: "bot", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, ms, arg } = commandeOptions;

  if (!arg || !arg[0]) {
    return repondre("Yes, I'm listening to you.");
  }

  try {
    const message = await traduire(arg.join(' '), { to: 'en' });

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const botResponse = response.data.choices[0].text.trim();

    const translatedResponse = await traduire(botResponse, { to: 'fr' });
    repondre(translatedResponse);

  } catch (error) {
    // Enhanced error logging for debugging
    console.error('Error occurred:', error.response ? error.response.data : error.message);
    repondre("Oops, an error occurred while processing your request.");
  }
});

adams({ nomCom: "gpt", reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  if (!arg || arg.length === 0) {
    return repondre("Please ask a question.");
  }

  try {
    const question = arg.join(' ');

    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 150,
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${openaiApiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    const answer = response.data.choices[0].text.trim();
    repondre(answer);

  } catch (error) {
    // Enhanced error logging for debugging
    console.error('Error:', error.response ? error.response.data : error.message);
    repondre("Oops, an error occurred while processing your request.");
  }
});
**/
// Repeat similar adjustments for "ai" and "gpt" commands.


const { adams } = require('../Ibrahim/adams');
const traduire = require("../Ibrahim/traduction") ;
const { default: axios } = require('axios');
//const conf = require('../set');




adams({nomCom:"bot",reaction:"📡",categorie:"IA"},async(dest,zk,commandeOptions)=>{

  const {repondre,ms,arg}=commandeOptions;
  
    if(!arg || !arg[0])
    {return repondre("yes I'm listening to you.")}
    //var quest = arg.join(' ');
  try{
    
    
const message = await traduire(arg.join(' '),{ to : 'en'});
 console.log(message)
fetch(`http://api.brainshop.ai/get?bid=177607&key=NwzhALqeO1kubFVD&uid=[uid]&msg=${message}`)
.then(response => response.json())
.then(data => {
  const botResponse = data.cnt;
  console.log(botResponse);

  traduire(botResponse, { to: 'en' })
    .then(translatedResponse => {
      repondre(translatedResponse);
    })
    .catch(error => {
      console.error('Error when translating into French :', error);
      repondre('Error when translating into French');
    });
})
.catch(error => {
  console.error('Error requesting BrainShop :', error);
  repondre('Error requesting BrainShop');
});

  }catch(e){ repondre("oops an error : "+e)}
    
  
  });  



  adams({ nomCom: "ai", reaction: "📡", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please enter the necessary information to generate the image.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const image = arg.join(' ');
      const response = await axios.get(`https://photooxy.com/effect/create-image?q=${image}`);
      
      const data = response.data;
      let caption = '*powered by B.M.B-XMD*';
      
      if (data.status == 200) {
        // Utiliser les données retournées par le service
        const imageUrl = data.result;
        zk.sendMessage(dest, { image: { url: imageUrl }, caption: caption }, { quoted: ms });
      } else {
        repondre("Error during image generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request");
    }
  });
  


adams({ nomCom: "gpt", reaction: "🤔", categorie: "IA" }, async (dest, zk, commandeOptions) => {
    const { repondre, arg, ms } = commandeOptions;
  
    try {
      if (!arg || arg.length === 0) {
        return repondre(`Please ask a question.`);
      }
  
      // Regrouper les arguments en une seule chaîne séparée par "-"
      const question = arg.join(' ');
      const response = await axios.get(`https://api.ibrahimadams.us.kg/api/ai/gpt4?q=${question}&apikey=abutech`);
      
      const data = response.data;
      if (data) {
        repondre(data.result);
      } else {
        repondre("Error during response generation.");
      }
    } catch (error) {
      console.error('Erreur:', error.message || 'Une erreur s\'est produite');
      repondre("Oops, an error occurred while processing your request.");
    }
  });*/
