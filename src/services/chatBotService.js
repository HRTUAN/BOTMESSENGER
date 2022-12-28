import request from "request";

require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const URL_SHOW_ROOM_GIF = "https://media3.giphy.com/media/TGcD6N8uzJ9FXuDV3a/giphy.gif?cid=ecf05e47afe5be971d1fe6c017ada8e15c29a76fc524ac20&rid=giphy.gif";


let getFacebookUsername = (sender_psid) => {
    return new Promise((resolve, reject) => {
        // Send the HTTP request to the Messenger Platform
        let uri = `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`;
        request({
            "uri": uri,
            "method": "GET",
        }, (err, res, body) => {
            if (!err) {
                //convert string to json object , facebook
                body = JSON.parse(body);
                let username = `${body.last_name} ${body.first_name}`;


                resolve(username);
                console.log(username)
            } else {
                reject("Unable to send message:" + err);
            }
        });
    });
};

let sendResponseWelcomeNewCustomer = (username, sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response_first = { "text": `Chào mừng quý khách đến với La - Bánh và Trà\nRất vui vì có thể giúp bạn\nMình là phần mềm trả lời tự động\nTrong lúc chưa có ai hỗ trợ bạn\nMình có thể giúp bạn xem qua Menu` };
            let response_second = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "La - Bánh và trà",
                                "subtitle": " ",
                                "image_url": "https://i.postimg.cc/wxtBhscD/318186105-194298633127884-7427338723877398292-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐỒ UỐNG",
                                        "payload": "SENDDRINK",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "BÁNH ĂN VẶT",
                                        "payload": "SENDCAKE",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "BÁNH SINH NHẬT",
                                        "payload": "BIRTHDAYCAKE",
                                    }

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
                                "title": "Bạc xỉu",
                                "subtitle": "PRICE: 30K/CỐC",
                                "image_url": "https://i.postimg.cc/CLZ4vrqN/bac-xiu-da.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_BACXIU",
                                    }
                                ],
                            },
                            {
                                "title": "Cafe muối",
                                "subtitle": "PRICE: 30K/CỐC",
                                "image_url": "https://i.postimg.cc/rFCYGPXP/ca-phe-muoi.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_CAFEMUOI",
                                    }
                                ],
                            },
                            {
                                "title": "Cafe Cốt dừa",
                                "subtitle": "PRICE: 40K/CỐC",
                                "image_url": "https://i.postimg.cc/SKXrPZ3q/ca-phe-cot-dua.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_CAFECOTDUA",
                                    }
                                ],
                            },
                            {
                                "title": "Trà xoài nha đam",
                                "subtitle": "PRICE: 45K/CỐC",
                                "image_url": " https://i.postimg.cc/vZKjD6dY/cach-lam-tra-xoai-3.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_TRAXOAI",
                                    }
                                ],
                            },
                            {
                                "title": "Trà đào cam xả",
                                "subtitle": "PRICE: 45K/CỐC",
                                "image_url": " https://cdn.dealtoday.vn/1b720191a9c543999ed82e6fe2b71f5f.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_TRADAO",
                                    }
                                ],
                            },
                            {
                                "title": "Lục trà vải chanh",
                                "subtitle": "PRICE: 45K/CỐC",
                                "image_url": "https://i.postimg.cc/14hX9z5J/tra-vai-cam-sa.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_LUCTRA",
                                    }
                                ],
                            },
                            {
                                "title": "Trà dâu Hana",
                                "subtitle": "PRICE: 45K/CỐC",
                                "image_url": "https://i.postimg.cc/854xpXp3/foody-upload-api-foody-mobile-tr-8afca038-210529163258.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_TRADAU",
                                    }
                                ],
                            },
                            {
                                "title": "Trà tắc, Trà chanh",
                                "subtitle": "PRICE: 20K/CỐC",
                                "image_url": "https://i.postimg.cc/L400x1nz/W1-A57n-EO14-CX-tra-chanh-sa-web.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐẶT HÀNG",
                                        "payload": "DETAIL_TRACHANH",
                                    }
                                ],
                            },
                            {
                                "title": "Topping các loại",
                                "subtitle": "PRICE: 10k/cốc Topping",
                                "image_url": "https://i.postimg.cc/C5VC2wpp/ghe-tra-sua-fu-tea-thuong-thuc-do-uong-ngon-bo-re-noi-tieng-5-1662698860.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "Topping Machiato ",
                                        "payload": "DETAIL_MACHIATO",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Topping Nha đam",
                                        "payload": "DETAIL_NHADAM",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "Topping Chân trâu",
                                        "payload": "DETAIL_CHANTRAU",
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
                                "image_url": "https://i.postimg.cc/Gh7QP18p/322474598-561429468781806-8510852521872175949-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PANNA",
                                    }
                                ],
                            },
                            {
                                "title": "Bánh hành kéo sợi",
                                "image_url": "https://i.postimg.cc/Hk6f7KH0/320668160-481334250792831-6271783850233790750-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_BANHHANH",
                                    }
                                ],
                            },

                            {
                                "title": "Bánh cuộn ruốc gà",
                                "image_url": "https://i.postimg.cc/KzNyYY9f/320346876-712111986906073-3657762382295760032-n.jpg",
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
                                "image_url": "https://i.postimg.cc/CKw0pD75/319626523-194557019768712-6203730865110329701-n.jpg",
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
                                "image_url": "https://i.postimg.cc/zvbYLTG8/z3994407841780-988b93fb769c987de127492a15535849.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_REDV",
                                    }
                                ],
                            },
                            {
                                "title": "Phomai xoài miếng",
                                "image_url": "https://i.postimg.cc/253799Wx/321512767-884181089588668-6575553954568128040-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PHOMAIXOAI",
                                    }
                                ],
                            },
                            {
                                "title": "Phomai dẻ cười miếng",
                                "image_url": "https://i.postimg.cc/QMbZStp7/321660964-545204400858066-6505721763871901878-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PHOMAIHATDE",
                                    }
                                ],
                            },
                            {
                                "title": "Su kem sing",
                                "image_url": "https://i.postimg.cc/c4FSQ6B8/320245704-680578116862159-7384754460312516384-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_SUKEM",
                                    }
                                ],
                            },
                            {
                                "title": "Crepe sầu",
                                "image_url": "https://i.postimg.cc/4dytxYPb/321690149-867592840982419-8055730569751224248-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_CREPESAU",
                                    }
                                ],
                            },
                            {
                                "title": "Vẫn còn nhiều sản phẩm ở trang sau",
                                "image_url": "https://i.postimg.cc/kgkYPdy5/cach-lam-bento-cake-banh-kem-mini-han-quoc-cuc-de-thuong-gay-avt-1200x676.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM THÊM",
                                        "payload": "DETAIL_CONTINUE",
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

let Continue = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Bánh tart trứng",
                                "image_url": "https://i.postimg.cc/nzTXBpRV/321354437-1254209878466152-3596494190344801006-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_TARTTRUNG",
                                    }
                                ],
                            },
                            {
                                "title": "Bánh cookies",
                                "image_url": "https://i.postimg.cc/TYQKprN8/319641579-611737404090321-7159056322602899857-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_COOKIES",
                                    }
                                ],
                            },

                            {
                                "title": "Bánh mì mè đen hàn quốc",
                                "image_url": "https://i.postimg.cc/44W5Thvd/320431941-5575852612512149-4195241782591619984-n.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_MEDENHANQUOC",
                                    }
                                ],
                            },

                            {
                                "title": "Thịt lợn khô homemade 100gr",
                                "image_url": "https://i.postimg.cc/Kjt3jwkx/z3994463160208-9bf1a690e738827d883dc35543ba0391-1.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_LONKHO",
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

let sendBirthday = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Whipping trà xoài dừa",
                                "image_url": "https://i.postimg.cc/7YFLwZYp/z3994494406887-ca6d8bda3cc2f8640dba830c3bdc3e27.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_WHIPPINGXOAI",
                                    }
                                ],
                            },
                            {
                                "title": "Whipping vị dâu panna cotta",
                                "image_url": "https://i.postimg.cc/zGhFGvwW/z3994493199626-7f83419be1e684545dae0ebd6a053f05.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_WHIPPINGDAU",
                                    }
                                ],
                            },

                            {
                                "title": "Whipping vị vải thiều hoa hồng phúc bồn tử",
                                "image_url": "https://i.postimg.cc/ZRvwpHp7/z3994488975569-1f66a6145486e7281629a6ec7481ac38.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_WHIPPINGPHUCBON",
                                    }
                                ],
                            },

                            {
                                "title": "Whipping vị thiên đường nhiệt đới",
                                "image_url": "https://i.postimg.cc/Zqp9Ny0P/z3994487580375-98b8fd5591880ecbfdb662489cdd6c75.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_WHIPPINGPNHIETDOI",
                                    }
                                ],
                            },
                            {
                                "title": "Pistachios hạt dẻ cười",
                                "image_url": "https://i.postimg.cc/tT6LppS4/z3994635115779-19e1bc311c48ec02b0d0fd7aadf6bf7f.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PISTACHIOS",
                                    }
                                ],
                            },
                            {
                                "title": "Red velvet",
                                "image_url": "https://i.postimg.cc/zvbYLTG8/z3994407841780-988b93fb769c987de127492a15535849.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_RED",
                                    }
                                ],
                            },
                            {
                                "title": "Entremet",
                                "image_url": "https://i.postimg.cc/02j0wcvp/z3994504644239-27e6ba18af9836355f4b0c2f896dc1e0.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_ENTREMET",
                                    }
                                ],
                            },
                            {
                                "title": "XEM THÊM CÁC MENU",
                                "subtitle": "Full menu bánh và nước",
                                "image_url": "https://i.postimg.cc/3wcT6ZrT/mo-hinh-ca-phe-banh-ngot-phat-trien-manh.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "BÁNH ĂN VẶT",
                                        "payload": "SENDCAKE",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "MENU NƯỚC",
                                        "payload": "SENDDRINK",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "BÁNH SINH NHẬT",
                                        "payload": "BIRTHDAYCAKE",
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

let sendBacxiu = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bạc xỉu đậm chất\n30.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendDetailLocation = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Địa chỉ của La quán tại 29 phố thương mại Hạ long\nGần trường THCS VĂN LANG"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/66G474QP/Capture.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `XEM ĐƯỜNG ĐI`,
                        "buttons": [
                            {
                                "type": "web_url",
                                "url": "https://goo.gl/maps/JuWxkYpM6hEYCa8t8",
                                "title": "GOOGLE MAP"
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
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendCafeCotdua = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Cafe cốt dừa thơm ngon\n 40.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendcafeMuoi = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Cafe Muối thơm béo\n 30.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
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
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTraxoai = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà xoài nha đam thanh nhiệt\n 45.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            }
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTradao = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà đào cam xả\n 45.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendLuctra = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Lục trà vải chanh\n 45.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTradau = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà dâu Hana\n 45.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTrachanh = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà tắc, trà chanh mát lạnh\n 20.000 đồng/cốc"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Bạn muốn xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                        ]
                    }
                }
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPanna = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Panna cotta chanh leo, dâu tây\n 20.000 đồng/1 hộp"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendBanhhanh = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh hành kéo sợi\n 50.000 đồng/1 hộp"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendBanhga = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh cuộn ruốc gà\n 50.000 đồng/1 túi 6 cái"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendBonglan = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bông lan trứng muối\n 50.000 đồng/1 hộp"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendRedv = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Red velvet miếng\n 40.000 đồng/1 Miếng"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPhomaixoai = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Phomai xoài miếng\n 40.000 đồng/1 Miếng"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPhomaihatde = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Phomai dẻ cười miếng\n 40.000 đồng/1 Miếng"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendXukem = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh Su kem sing\n 50.000 đồng/1 Túi 5 Bánh"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendCrep = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh Crepe sầu\n 60.000 đồng/1 Hộp 4 Bánh"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendTarttrung = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh tart trứng\n 15.000 đồng/1 Bánh"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendCookies = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh Cookies\n 25.000 đồng/ Túi 5 cái"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendMedenhan = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Bánh mì mè đen hàn quốc\n 15.000 đồng/ Cái"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendLonkho = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Thịt lợn khô homemade\n 65.000 đồng/ 1 Túi(100 gram)"
            };
            let response2 = {
                "text": "Thực đơn ăn vặt chúng mình thay đổi theo ngày.\nBạn chờ 1 lát để chúng mình xác nhận xem còn hàng không nha."
            };
            let response4 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem thêm các Menu khác?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "BÁNH SINH NHẬT",
                                "payload": "BIRTHDAYCAKE"
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
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendWippingxoai = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 450k đến 550k\nCho các size từ 14 đến 16"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendWippingdau = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 450k đến 550k\nCho các size từ 14 đến 16"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendWippingphucbon = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 480k đến 550k\nCho các size từ 14 đến 16"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendWippingnhietdoi = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 500k đến 600k\nCho các size từ 14 đến 16"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPistachios = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 150k đến 700k\nCho các size từ 10 đến 24"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendRED = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 180k đến 750k\nCho các size từ 10 đến 24"
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendEntremet = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 180k đến 750k\nCho các size từ 10 đến 24"
            };
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "Mẫu entremet 1",
                                "image_url": "https://i.postimg.cc/02j0wcvp/z3994504644239-27e6ba18af9836355f4b0c2f896dc1e0.jpg",
                            },
                            {
                                "title": "Mẫu entremet 2",
                                "image_url": "https://i.postimg.cc/BbY5z1TL/z3994504644270-6a707c1554346bfe15c07d7e44269ee0.jpg",
                            },
                            {
                                "title": "Mẫu entremet 3",
                                "image_url": "https://i.postimg.cc/MZdYHgC6/z3994504644276-6d50dc3b079272a026236644e261af1a.jpg",
                            },

                        ]
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "BÁNH ĂN VẶT ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "postback",
                                "title": "MENU BIRTHDAY CAKE ",
                                "payload": "BIRTHDAYCAKE"
                            },
                        ]
                    }
                }
            };
            let response4 = {
                "text": "Để đảm bảo chất lượng bánh tốt nhất, bên mình chỉ làm khi có khách đặt.\nBạn chờ một lát để chúng mình vào xác nhận nhé."
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response2);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response3);

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response4);
            resolve("done");
        } catch (e) {
            reject(e);
        }
    });
};

let sendPhone = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Mọi người đặt bánh vui lòng liên hệ:\n096 911 99 17"
            };

            await sendTypingOn(sender_psid);
            await sendMessage(sender_psid, response1);
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

let sendMessageDefaultForTheBot = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Xin chào, Mình là phần mềm trả lời tự động\n Trong thời gian chờ đợi, mình sẽ giúp bạn.\n\nBạn có thể xem Menu của quán mình nhé😉"
            };
            //send a media template
            let response2 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "media",
                        "template_type": "generic",
                        "elements": [
                            {
                                "title": "La - Bánh và trà",
                                "subtitle": " ",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "ĐỒ UỐNG",
                                        "payload": "SENDDRINK",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "BÁNH ĂN VẶT",
                                        "payload": "SENDCAKE",
                                    },
                                    {
                                        "type": "postback",
                                        "title": "BÁNH SINH NHẬT",
                                        "payload": "BIRTHDAYCAKE",
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

module.exports = {
    getFacebookUsername: getFacebookUsername,
    sendResponseWelcomeNewCustomer: sendResponseWelcomeNewCustomer,
    SENDDRINK: SENDDRINK,
    sendCake: sendCake,
    sendDetailLocation: sendDetailLocation,
    sendBacxiu: sendBacxiu,
    sendcafeMuoi: sendcafeMuoi,
    sendCafeCotdua: sendCafeCotdua,
    sendTraxoai: sendTraxoai,
    sendTrachanh: sendTrachanh,
    sendPanna: sendPanna,
    sendBanhhanh: sendBanhhanh,
    sendBanhga: sendBanhga,
    sendTradao: sendTradao,
    sendLuctra: sendLuctra,
    sendTradau: sendTradau,
    markMessageSeen: markMessageSeen,
    sendTypingOn: sendTypingOn,
    sendMessage: sendMessage,
    sendBirthday: sendBirthday,
    sendWippingxoai: sendWippingxoai,
    sendWippingdau: sendWippingdau,
    sendWippingphucbon: sendWippingphucbon,
    sendWippingnhietdoi: sendWippingnhietdoi,
    sendPistachios: sendPistachios,
    sendRED: sendRED,
    sendEntremet: sendEntremet,
    sendBonglan: sendBonglan,
    sendRedv: sendRedv,
    sendPhomaixoai: sendPhomaixoai,
    sendPhomaihatde: sendPhomaihatde,
    sendXukem: sendXukem,
    sendCrep: sendCrep,
    Continue: Continue,
    sendTarttrung: sendTarttrung,
    sendCookies: sendCookies,
    sendMedenhan: sendMedenhan,
    sendLonkho: sendLonkho,
    sendPhone: sendPhone,
    sendMessageDefaultForTheBot: sendMessageDefaultForTheBot

};