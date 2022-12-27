import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const URL_SHOW_ROOM_GIF = "https://media3.giphy.com/media/TGcD6N8uzJ9FXuDV3a/giphy.gif?cid=ecf05e47afe5be971d1fe6c017ada8e15c29a76fc524ac20&rid=giphy.gif";
const URL_SALAD_GIF = "https://media0.giphy.com/media/9Vk8qP9EmWB8FePccb/giphy.gif?cid=ecf05e478d0c93d69e72264c8ebbf58a9a1d7ae294754131&rid=giphy.gif";
const URL_SHOW_FISH = "https://i-giadinh.vnecdn.net/2022/08/27/Thanh-pham-2-2-7762-1661595348.jpg";
const URL_SHOW_CLASSIC = "https://ardo.com/files/attachments/.10202/w1440h700q85_AZ1.jpg";


let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object , facebook nó 
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;
                resolve(username);
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Chào mừng ${username} đến với La - Bánh và Trà` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "La - Bánh và trà",
                                "subtitle": "Rât vui vì có thể giúp bạn",
                                "image_url": "https://www.facebook.com/101510912406657/photos/a.101511675739914/194298636461217",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐỒ UỐNG",
                                        "payload": "SENDDRINK",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "ĐỒ ĂN - BÁNH",
                                        "payload": "SENDCAKE",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "ĐỊA CHỈ QUÁN",
                                        "payload": "LOCATION",
                                    },
                                ],
                            }]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_first);

            //send a image with button view main menu
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response_second);

            resolve("done!")
        } catch (e) {
            reject(e);
        }

    });
};

let SENDDRINK = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Thực Đơn đồ uống",
                                "subtitle": "Vuốt qua để xem chi tiết",
                                "image_url": "https://nguyenlieuphachemientay.com/wp-content/uploads/2020/09/Diem-danh-15-loai-do-uong-hot-nhat-nam-co-vy.jpg",

                            },

                            {
                                "title": "Cafe truyền thống",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://cafesach.com.vn/wp-content/uploads/2018/07/bi-quyet-pha-che-cafe-truyen-thong-thom-ngon-dam-dac-chuan-vi-1-e1532876313993.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_CAFE1",
                                    }
                                ],
                            },

                            {
                                "title": "Cafe ngoại nhập",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://nof.com.vn/wp-content/uploads/2021/01/top-6-do-uong-duoc-ua-chuong-nhat-trong-quan-cafe-phong-cach-thuong-thuc-ca-phe-3-1.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_CAFE2",
                                    }
                                ],
                            },
                            {
                                "title": "Sinh tố, nước ép hoa quả",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://vinmec-prod.s3.amazonaws.com/images/20200616_025929_602920_duong-co-gay-ra-ben.max-1800x1800.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_SINHTO",
                                    }
                                ],
                            },
                            {
                                "title": "Đá xay siro",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://yt.cdnxbvn.com/medias/uploads/197/197460-siro-dau.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_SIRO",
                                    }
                                ],
                            },
                            {
                                "title": "Trà đào cam xả",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://cdn.dealtoday.vn/1b720191a9c543999ed82e6fe2b71f5f.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_TRADAO",
                                    }
                                ],
                            },
                            {
                                "title": "Cacao nóng",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://vietblend.vn/wp-content/uploads/2016/10/0a99b4cc1da4fbfaa2b5.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_CACAO",
                                    }
                                ],
                            },
                            {
                                "title": "Việt quất đá xay",
                                "subtitle": "PRICE: 40 - 50K/CỐC",
                                "image_url": " https://smoothiedays.com/wp-content/uploads/2020/08/cach-lam-sinh-to-viet-quat.png",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_VIETQUAT",
                                    }
                                ],
                            },



                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });

};

let sendCake = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Panna cotta chanh leo, dâu tây",
                                "image_url": "https://matonghungyen.com/wp-content/uploads/2013/06/pannacotta.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_Panna ",
                                    }
                                ],
                            },
                            {
                                "title": "Bánh hành kéo sợi",
                                "image_url": "https://media1.nguoiduatin.vn/thumb_x1280x857/media/ngac-kim-giang/2022/01/15/tet-nay-tro-tai-lam-banh-hanh-pho-mai-keo-soi-dai-khach.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_BANHHANH",
                                    }
                                ],
                            },

                            {
                                "title": "Bánh ống ruốc gà",
                                "image_url": "https://i.ytimg.com/vi/Ra0-XzAyv8w/maxresdefault.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_BANHGA",
                                    }
                                ],
                            },

                            {
                                "title": "Bông lan trứng muối",
                                "image_url": "https://cdn.cet.edu.vn/wp-content/uploads/2019/11/banh-bong-lan-trung-muoi.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_BONGLAN",
                                    }
                                ],
                            },
                            {
                                "title": "Red velvet",
                                "image_url": "https://cafedelites.com/wp-content/uploads/2018/05/Red-Velvet-Cake-IMAGE-43.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_RED",
                                    }
                                ],
                            },
                            {
                                "title": "Phomai xoài",
                                "image_url": "https://cdn.mediamart.vn/images/news/tr-tai-kheo-tay-lam-banh-phomai-xoai-khong-cn-dung-lo-nung_2f55e910.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PHOMAI",
                                    }
                                ],
                            },
                            {
                                "title": "Hạt dẻ cười",
                                "image_url": "https://keyassets-p2.timeincuk.net/wp/prod/wp-content/uploads/sites/53/2015/02/Cherry-and-pistachio-Biscotti-recipe.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PHOMAI",
                                    }
                                ],
                            },

                            {
                                "title": "XEM TOÀN BỘ MENU",
                                "subtitle": "Full menu bánh và nước",
                                "image_url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                                        "title": "ẤN VÀO NHÉ",
                                    }
                                ],
                            },
                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendLocation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Địa chỉ của La quán tại 29 phố thương mại Hạ long\n Gần trường THCS VĂN LANG"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://postimg.cc/14s32tw0"
                    }
                }
            };

            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": 'Bạn muốn xem đường đi đến La quán',
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://www.google.com/maps/dir/20.9659108,107.0893801/20.9513611,107.0783905/@20.9515035,107.0780997,18.25z/data=!4m4!4m3!1m1!4e1!1m0",
                                "title": "GOOGLE MAP",
                            }
                        ],
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPubMenu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Rượu vang Pháp\n 500.000 đồng"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://www.topruouvang.com/wp-content/uploads/2017/08/Ruou-vang-phap-ngon-duoc-ua-chuong-nhat-5.jpg"
                    }
                }
            };

            let response3 = {
                "text": "Rượu sake nhật\n 500.000 đồng"
            };
            let response4 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://duhoc.thanhgiang.com.vn/sites/default/files/ruou-sake.jpg"
                    }
                }
            };

            let response5 = {
                "text": "Rượu chuối hột VIP\n 700.000 đồng"
            };
            let response6 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://ruouviet.com.vn/wp-content/uploads/2022/02/V_1952-1-scaled.jpg"
                    }
                }
            };

            let response7 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Quay lại menu chính hoặc đặt bàn trước?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "HIỂN THỊ MENU CHÍNH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "web_url",
                                "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //fall: open new tab
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response5);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response6);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response7);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendAppetizer = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Tôm chiên xù",
                                "subtitle": "1 ĐĨA - 100.000 Đồng",
                                "image_url": "https://sgeviet.vn/wp-content/uploads/2022/01/thuc-don-khai-vi-Tom-chien-xu.jpg",
                            },

                            {
                                "title": "Mực hấp rim mắm tỏi",
                                "subtitle": "0,5 Cân - 120.000 đồng | 1 cân - 220.000 đồng",
                                "image_url": "https://sgeviet.vn/wp-content/uploads/2022/01/thuc-don-khai-vi-Muc-hap-rim-mam-toi.jpg",
                            },

                            {
                                "title": "Salad hải sản chua cay",
                                "subtitle": "Gồm tôm, mực, cua cùng rau củ trộn lẫn",
                                "image_url": "https://sgeviet.vn/wp-content/uploads/2022/01/thuc-don-khai-vi-Salad-hai-san-chua-cay.jpg",
                            },

                            {
                                "title": "Trở lại",
                                "image_url": " https://bit.ly/imageToSend",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM MENU TRƯA",
                                        "payload": "BACK_TO_LUNCH_MENU",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI MENU CHÍNH",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "web_url",
                                        "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                        "title": "ĐẶT BÀN",
                                        "webview_height_ratio": "tall",
                                        "messenger_extensions": true //fall: open new tab
                                    }
                                ],
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let goBackToMainMenu = (sender_psid) => {
    sendMainMenu(sender_psid);
};

let goBackToLunchMenu = (sender_psid) => {
    sendLunchMenu(sender_psid);
};

let handleReserveTable = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let username = await getFacebookUsername(sender_psid);
            let response = { text: `Hi ${username}, What time and date you would like to reserve a table ?` };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let handleShowRooms = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Phòng tiệc gia đình",
                                "subtitle": "Phù hợp cho các gia đình nhỏ từ 5 đến 8 người",
                                "image_url": "https://conbuom.vn/wp-content/uploads/2021/06/thiet-ke-phong-vip-nha-hang1-700x394.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT PHÒNG",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Phòng tiệc cỡ lón",
                                "subtitle": "Tổ chức sinh nhật, party, sức chứa lên tới 20 người",
                                "image_url": "https://1.bp.blogspot.com/-D_JuTYRnDTo/XykXMIE-3YI/AAAAAAAAAYk/yNe4rqaowJoTSa4tHInMUOBBg-0mcwlEACPcBGAYYCw/w1200-h630-p-k-no-nu/phong-vip-tiep-khach-sang-trong-moi-la-anh11.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT PHÒNG",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Phòng tiệc công ty",
                                "subtitle": "Sức chưa lên đến 45 người, dành cho những dịp liên hoan công ty",
                                "image_url": "http://hoaanvien.com.vn/images/VipRoom/Vip5.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT PHÒNG",
                                        "payload": "SHOW_ROOM_DETAIL",
                                    }
                                ],
                            },

                            {
                                "title": "Trở lại",
                                "image_url": " https://bit.ly/imageToSend",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "QUAY LẠI MENU CHÍNH",
                                        "payload": "BACK_TO_MAIN_MENU",
                                    },
                                    {
                                        "type": "web_url",
                                        "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                        "title": "ĐẶT BÀN",
                                        "webview_height_ratio": "tall",
                                        "messenger_extensions": true //fall: open new tab
                                    }
                                ],
                            }
                        ]
                    }
                }
            };

            //send a welcome message
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response);
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessageAskingQuality = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Bữa tiệc của bạn gồm bao nhiêu người?",
            "quick_replies": [
                {
                    "content_type": "text",
                    "title": "1-2",
                    "payload": "SMALL",
                }, {
                    "content_type": "text",
                    "title": "2-5",
                    "payload": "MEDIUM",
                },
                {
                    "content_type": "text",
                    "title": "more than 5",
                    "payload": "LARGE",
                }
            ]
        }
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
};

let sendMessageAskingPhoneNumber = (sender_id) => {
    let request_body = {
        "recipient": {
            "id": sender_id
        },
        "messaging_type": "RESPONSE",
        "message": {
            "text": "Cám ơn! Xin vui lòng cung cấp số điện thoại của bạn để chúng tôi có thể liên lạc ?",
            "quick_replies": [
                {
                    "content_type": "user_phone_number",
                }
            ]
        }
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
};

let sendMessageDoneReserveTable = async (sender_id) => {
    try {
        let response = {
            "attachment": {
                "type": "image",
                "payload": {
                    "url": "https://bit.ly/giftDonalTrump"
                }
            }
        };
        await sendTypingOn(sender_id);
        await sendMessage(sender_id, response);

        //get facebook username
        let username = await getFacebookUsername(sender_id);

        //send another message
        let response2 = {
            "attachment": {
                "type": "template",
                "payload": {
                    "template_type": "button",
                    "text": `Done! \nOur reservation team will contact you as soon as possible ${username}.\n \nWould you like to check our Main Menu?`,
                    "buttons": [
                        {
                            "type": "postback",
                            "title": "SHOW MAIN MENU",
                            "payload": "MAIN_MENU"
                        },
                        {
                            "type": "phone_number",
                            "title": "☎ HOT LINE",
                            "payload": "+911911"
                        },
                        {
                            "type": "postback",
                            "title": "START OVER",
                            "payload": "RESTART_CONVERSATION"
                        }
                    ]
                }
            }
        };
        await sendTypingOn(sender_id);
        await sendMessage(sender_id, response2);
    } catch (e) {
        console.log(e);
    }
};

let sendNotificationToTelegram = (user) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                chat_id: process.env.TELEGRAM_GROUP_ID,
                parse_mode: "HTML",
                text: `
| --- <b>A new reservation</b> --- |
| ------------------------------------------------|
| 1. Username: <b>${user.name}</b>   |
| 2. Phone number: <b>${user.phoneNumber}</b> |
| 3. Time: <b>${user.time}</b> |
| 4. Quantity: <b>${user.quantity}</b> |
| 5. Created at: ${user.createdAt} |
| ------------------------------------------------ |                           
      `
            };

            // Send the HTTP request to the Telegram
            request({
                "uri": `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Xin cám ơn, Chúng tôi sẽ liên lại với bạn sớm nhất \n Bạn có thể thử chat lại vơi tôi hoặc đặt bàn lại.\n\nVideo này có thể sẽ giúp bạn 😉"
            };
            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "media",
                        "elements": [
                            {
                                "media_type": "video",
                                "url": "https://www.youtube.com/watch?v=AkNyiaP8C9k",
                                "buttons": [
                                    {
                                        "type": "web_url",
                                        "url": "https://www.youtube.com/",
                                        "title": "Xem thêm!"
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Bắt đầu lại cuộc trò chuyện",
                                        "payload": "RESTART_CONVERSATION"
                                    }
                                ]
                            }
                        ]
                    }
                }
            };
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let showRoomDetail = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": URL_SHOW_ROOM_GIF
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Các phòng tiệc Vip phù hợp cho bạn tổ chức tiệc, sinh nhật, liên hoan, sức chứa từ 8 đến 40 người`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "HIỂN THỊ MENU CHÍNH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "web_url",
                                "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //fall: open new tab
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            resolve("done!");
        } catch (e) {
            reject(e);
        }
    })
};

let sendSalad = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://cdn.tgdd.vn/Files/2017/01/12/936951/giai-ngan-ngay-tet-voi-mon-salad-hoa-qua-kieu-han-quoc-202205241325570525.jpg"
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Salad trộn trái cây \n 80.000 đồng`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "HIỂN THỊ MENU CHÍNH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "web_url",
                                "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //fall: open new tab
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendFish = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i-giadinh.vnecdn.net/2022/08/27/Thanh-pham-2-2-7762-1661595348.jpg"
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Cá nướng tẩm ớt \n 300.000 đồng/ 1 đĩa`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI MENU CHÍNH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "web_url",
                                "url": `${process.env.URl_WEB_VIEW_ORDER}`,
                                "title": "ĐẶT BÀN",
                                "webview_height_ratio": "tall",
                                "messenger_extensions": true //fall: open new tab
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendClassic = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://vfs.vn/wp-content/uploads/2021/03/thit-lon-quay-mot-phan-van-hoa-cua-nhung-nguoi-con-xu-lang-gio-heo-quay-la-mac-mat.png"
                    }
                }
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Heo nướng Lạng Sơn \n 150.000 đồng/ 1 cân`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "QUAY LẠI MENU CHÍNH",
                                "payload": "MAIN_MENU"
                            },
                            {
                                "type": "postback",
                                "title": "ĐẶT BÀN",
                                "payload": "RESERVE_TABLE",
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMessage = (sender_psid, response) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "message": response,
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                console.log(res)
                console.log(body)
                if (!err) {
                    console.log("message sent!");
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let sendTypingOn = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "typing_on"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

let markMessageSeen = (sender_psid) => {
    return new Promise((resolve, reject) => {
        try {
            let request_body = {
                "recipient": {
                    "id": sender_psid
                },
                "sender_action": "mark_seen"
            };

            // Send the HTTP request to the Messenger Platform
            request({
                "uri": "https://graph.facebook.com/v6.0/me/messages",
                "qs": { "access_token": PAGE_ACCESS_TOKEN },
                "method": "POST",
                "json": request_body
            }, (err, res, body) => {
                if (!err) {
                    resolve('done!')
                } else {
                    reject("Unable to send message:" + err);
                }
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    SENDDRINK: SENDDRINK,
    sendCake: sendCake,
    sendLocation: sendLocation,
    sendPubMenu: sendPubMenu,
    sendAppetizer: sendAppetizer,
    goBackToMainMenu: goBackToMainMenu,
    goBackToLunchMenu: goBackToLunchMenu,
    handleReserveTable: handleReserveTable,
    handleShowRooms: handleShowRooms,
    sendMessageAskingQuality: sendMessageAskingQuality,
    sendMessageAskingPhoneNumber: sendMessageAskingPhoneNumber,
    sendMessageDoneReserveTable: sendMessageDoneReserveTable,
    sendNotificationToTelegram: sendNotificationToTelegram,
    sendMessageDefaultForTheBot: sendMessageDefaultForTheBot,
    showRoomDetail: showRoomDetail,
    sendSalad: sendSalad,
    sendFish: sendFish,
    sendClassic: sendClassic,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage
};