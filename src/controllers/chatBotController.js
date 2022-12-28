require("dotenv").config();
import request from "request";
import moment from "moment";
import chatBotService from "../services/chatBotService";
import homepageService from "../services/homepageService";

const MY_VERIFY_TOKEN = process.env.MY_VERIFY_TOKEN;
const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

let user = {
    name: "",
    phoneNumber: "",
    time: "",
    quantity: "",
    createdAt: ""
};

let postWebhook = (req, res) => {
    // Parse the request body from the POST
    let body = req.body;

    // Check the webhook event is from a Page subscription
    if (body.object === 'page') {

        // Iterate over each entry - there may be multiple if batched
        body.entry.forEach(function (entry) {

            // Gets the body of the webhook event
            let webhook_event = entry.messaging[0];
            console.log(webhook_event);


            // Get the sender PSID
            let sender_psid = webhook_event.sender.id;
            console.log('Sender PSID: ' + sender_psid);

            // Check if the event is a message or postback and
            // pass the event to the appropriate handler function
            if (webhook_event.message) {
                handleMessage(sender_psid, webhook_event.message);
            } else if (webhook_event.postback) {
                handlePostback(sender_psid, webhook_event.postback);
            }

        });

        // Return a '200 OK' response to all events
        res.status(200).send('EVENT_RECEIVED');

    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
    }
};

let getWebhook = (req, res) => {
    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = MY_VERIFY_TOKEN;

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    }
};

// Handles messages events
let handleMessage = async (sender_psid, message) => {
    //checking quick reply
    if (message && message.quick_reply && message.quick_reply.payload) {
        if (message.quick_reply.payload === "SMALL" || message.quick_reply.payload === "MEDIUM" || message.quick_reply.payload === "LARGE") {
            //asking about phone number
            if (message.quick_reply.payload === "SMALL") user.quantity = "1-2 people";
            if (message.quick_reply.payload === "MEDIUM") user.quantity = "2-5 people";
            if (message.quick_reply.payload === "LARGE") user.quantity = "More than 5 people";
            await chatBotService.markMessageSeen(sender_psid);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessageAskingPhoneNumber(sender_psid);
            return;
        }
        // pay load is a phone number
        if (message.quick_reply.payload !== " ") {
            //done a reservation
            // npm install --save moment to use moment
            user.phoneNumber = message.quick_reply.payload;
            user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
            //send a notification to Telegram Group chat by Telegram bot.
            await chatBotService.sendNotificationToTelegram(user);

            // send messages to the user
            await chatBotService.markMessageSeen(sender_psid);
            await chatBotService.sendTypingOn(sender_psid);
            await chatBotService.sendMessageDoneReserveTable(sender_psid);
        }
        return;
    }

    //handle text message
    let entity = handleMessageWithEntities(message);
    let locale = entity.locale;

    await chatBotService.sendTypingOn(sender_psid);
    await chatBotService.markMessageSeen(sender_psid);

    if (entity.name === "wit$datetime:datetime") {
        //handle quick reply message: asking about the party size , how many people
        user.time = moment(entity.value).zone("+07:00").format('MM/DD/YYYY h:mm A');

        await chatBotService.sendMessageAskingQuality(sender_psid);
    } else if (entity.name === "wit$phone_number:phone_number") {
        //handle quick reply message: done reserve table

        user.phoneNumber = entity.value;
        user.createdAt = moment(Date.now()).zone("+07:00").format('MM/DD/YYYY h:mm A');
        //send a notification to Telegram Group chat by Telegram bot.
        await chatBotService.sendNotificationToTelegram(user);

        // send messages to the user
        await chatBotService.sendMessageDoneReserveTable(sender_psid);

    } else if (entity.name === "wit$greetings") {
        await homepageService.sendResponseGreetings(sender_psid, locale);
    } else if (entity.name === "wit$thanks") {
        await homepageService.sendResponseThanks(sender_psid, locale);
    } else if (entity.name === "wit$bye") {
        await homepageService.sendResponseBye(sender_psid, locale);
    } else {
        //default reply
        await chatBotService.sendMessageDefaultForTheBot(sender_psid);
    }

    //handle attachment message
};

let handleMessageWithEntities = (message) => {
    let entitiesArr = ["wit$datetime:datetime", "wit$phone_number:phone_number", "wit$greetings", "wit$thanks", "wit$bye"];
    let entityChosen = "";
    let data = {}; // data is an object saving value and name of the entity.
    entitiesArr.forEach((name) => {
        let entity = firstTrait(message.nlp, name.trim());
        if (entity && entity.confidence > 0.8) {
            entityChosen = name;
            data.value = entity.value;
        }
    });

    data.name = entityChosen;

    // checking language
    if (message && message.nlp && message.nlp.detected_locales) {
        if (message.nlp.detected_locales[0]) {
            let locale = message.nlp.detected_locales[0].locale;
            data.locale = locale.substring(0, 2)
        }

    }
    return data;
};

// function firstEntity(nlp, name) {
//     return nlp && nlp.entities && nlp.entities[name] && nlp.entities[name][0];
// }

function firstTrait(nlp, name) {
    return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

// Handles messaging_postbacks events
let handlePostback = async (sender_psid, received_postback) => {
    let response;
    // Get the payload for the postback
    let payload = received_postback.payload;
    // Set the response based on the postback payload

    await chatBotService.markMessageSeen(sender_psid);    // thêm async await để đẩy function sử lý sang file khác( chia nhỏ file)
    switch (payload) {
        case "GET_STARTED":
        case "RESTART_CONVERSATION":
            //get facebook username
            let username = await chatBotService.getFacebookUsername(sender_psid);
            //send welcome response to users
            await chatBotService.sendResponseWelcomeNewCustomer(username, sender_psid);
            break;
        case "SENDDRINK":
            //send main menu to users
            await chatBotService.SENDDRINK(sender_psid);
            break;
        case "LOCATION":
            await chatBotService.sendDetailLocation(sender_psid);
            break;
        case "SENDCAKE":
            await chatBotService.sendCake(sender_psid);
            break;
        case "DETAIL_BACXIU":
            await chatBotService.sendBacxiu(sender_psid);
            break;
        case "DETAIL_CAFEMUOI":
            await chatBotService.sendcafeMuoi(sender_psid);
            break;
        case "DETAIL_CAFECOTDUA":
            await chatBotService.sendCafeCotdua(sender_psid);
            break;
        case "DETAIL_TRAXOAI":
            await chatBotService.sendTraxoai(sender_psid);
            break;
        case "DETAIL_TRADAO":
            await chatBotService.sendTradao(sender_psid);
            break;
        case "DETAIL_LUCTRA":
            await chatBotService.sendLuctra(sender_psid);
            break;
        case "DETAIL_TRADAU":
            await chatBotService.sendTradau(sender_psid);
            break;
        case "DETAIL_TRACHANH":
            await chatBotService.sendTrachanh(sender_psid);
            break;
        case "DETAIL_PANNA":
            await chatBotService.sendPanna(sender_psid);
            break;
        case "DETAIL_BANHHANH":
            await chatBotService.sendBanhhanh(sender_psid);
            break;
        case "DETAIL_BANHGA":
            await chatBotService.sendBanhga(sender_psid);
            break;
        case "DETAIL_BONGLAN":
            await chatBotService.sendBonglan(sender_psid);
            break;
        case "DETAIL_REDV":
            await chatBotService.sendRedv(sender_psid);
            break;
        case "DETAIL_PHOMAIXOAI":
            await chatBotService.sendPhomaixoai(sender_psid);
            break;
        case "DETAIL_PHOMAIHATDE":
            await chatBotService.sendPhomaihatde(sender_psid);
            break;
        case "DETAIL_SUKEM":
            await chatBotService.sendXukem(sender_psid);
            break;
        case "DETAIL_CREPESAU":
            await chatBotService.sendCrep(sender_psid);
            break;
        case "DETAIL_CONTINUE":
            await chatBotService.Continue(sender_psid);
            break;
        case "DETAIL_TARTTRUNG":
            await chatBotService.sendTarttrung(sender_psid);
            break;
        case "DETAIL_COOKIES":
            await chatBotService.sendCookies(sender_psid);
            break;
        case "DETAIL_MEDENHANQUOC":
            await chatBotService.sendMedenhan(sender_psid);
            break;
        case "DETAIL_LONKHO":
            await chatBotService.sendLonkho(sender_psid);
            break;
        case "BIRTHDAYCAKE":
            await chatBotService.sendBirthday(sender_psid);
            break;
        case "DETAIL_WHIPPINGXOAI":
            await chatBotService.sendWippingxoai(sender_psid);
            break;
        case "DETAIL_WHIPPINGDAU":
            await chatBotService.sendWippingdau(sender_psid);
            break;
        case "DETAIL_WHIPPINGPHUCBON":
            await chatBotService.sendWippingphucbon(sender_psid);
            break;
        case "DETAIL_WHIPPINGPNHIETDOI":
            await chatBotService.sendWippingnhietdoi(sender_psid);
            break;
        case "DETAIL_PISTACHIOS":
            await chatBotService.sendPistachios(sender_psid);
            break;
        case "DETAIL_RED":
            await chatBotService.sendRED(sender_psid);
            break;
        case "DETAIL_ENTREMET":
            await chatBotService.sendEntremet(sender_psid);
            break;
        case "PHONENUMBER":
            await chatBotService.sendPhone(sender_psid);
            break;
        case "yes":
            response = { text: "Thank you!" };
            callSendAPI(sender_psid, response);
            break;
        case "no":
            response = { text: "Please try another image." };
            callSendAPI(sender_psid, response);
            break;
        default:
            console.log("Something wrong with switch case payload");
    }
    // Send the message to acknowledge the postback
    // callSendAPI(sender_psid, response);
};

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
        "uri": "https://graph.facebook.com/v6.0/me/messages",
        "qs": { "access_token": PAGE_ACCESS_TOKEN },
        "method": "POST",
        "json": request_body
    }, (err, res, body) => {
        if (!err) {
            console.log('message sent!')
        } else {
            console.error("Unable to send message:" + err);
        }
    });
}

module.exports = {
    postWebhook: postWebhook,
    getWebhook: getWebhook
};
