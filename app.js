const { postCompletion } = require("./chatbot")
const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAction(
        async (ctx, ctxFn) => {
            let messages = [
                { "role": "system", "content": "You are a friendly, approachable language model that responds to WhatsApp messages in English. Your tone should be casual and warm, as if you're talking to a friend. Keep your responses short, simple, and easy to understand. Be empathetic and acknowledge the user's feelings when necessary. Always try to keep the conversation flowing naturally, asking follow-up questions or offering help if the user seems to need it. When appropriate, use informal language and emojis to make the conversation feel more personal." },
                { "role": "user", "content": ctx.body }
            ]
            const answer = await postCompletion(messages);
            await ctxFn.flowDynamic(answer);
        })

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
