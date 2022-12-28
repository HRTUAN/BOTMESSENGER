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
                                        "title": "ĐỒ ĂN - BÁNH",
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
                                "title": "Thực Đơn đồ uống",
                                "subtitle": "Vuốt qua để xem chi tiết",
                                "image_url": "https://nguyenlieuphachemientay.com/wp-content/uploads/2020/09/Diem-danh-15-loai-do-uong-hot-nhat-nam-co-vy.jpg",

                            },

                            {
                                "title": "Bạc xỉu",
                                "subtitle": "PRICE: 30K/CỐC",
                                "image_url": "https://i.postimg.cc/CLZ4vrqN/bac-xiu-da.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
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
                                        "title": "CHI TIẾT",
                                        "payload": "DETAIL_TRACHANH",
                                    }
                                ],
                            },
                            {
                                "title": "Topping các loại",
                                "subtitle": "PRICE: 10K/Topping",
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
                                "image_url": "https://matonghungyen.com/wp-content/uploads/2013/06/pannacotta.jpg",
                                "buttons": [
                                    {
                                        "type": "postback",
                                        "title": "XEM CHI TIẾT",
                                        "payload": "DETAIL_PANNA ",
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
                                        "payload": "DETAIL_WHIPPINGXOAI ",
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
                                "image_url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
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
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/Yqw132tp/5-cach-pha-bac-xiu-cuc-ngon-hap-dan-nhu-quan-ca-phe-tai-nha-202203171037441306.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendCafe2 = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Cafe Muối thơm béo\n 30.000 đồng/cốc"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/Gph0s14K/cach-pha-cafe-muoi-1.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/RVRXJJwr/tu-pha-che-ca-phe-cot-dua-cuc-thom-ngon-va-hap-dan-ngay-tai-nha-nd0.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/vZKjD6dY/cach-lam-tra-xoai-3.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendTradao = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà đào cam xả\n 45.000 đồng/cốc"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://horecavn.com/uploads/images/bai-viet/cong-thuc-tra-dao-cam-sa-chuan-vi-quan-2-.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendLuctra = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Lục trà vải chanh\n 45.000 đồng/cốc"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/Gp2ygHBy/travai2.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendTradau = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà dâu Hana\n 45.000 đồng/cốc"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/YS1JVqJt/tra-dau-1.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendTrachanh = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Trà tắc, trà chanh mát lạnh\n 20.000 đồng/cốc"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/YS1JVqJt/tra-dau-1.jpg"
                    }
                }
            };
            let response3 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu đồ uống?`,
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
                            // {
                            //     "type": "web_url",
                            //     "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                            //     "title": "XEM TOÀN BỘ MENU"
                            // }
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

let sendPanna = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Panna cotta chanh leo\n 40.000 đồng/miếng"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "http://cdn.tgdd.vn/Files/2021/07/26/1370853/bo-tui-cach-lam-panna-cotta-chanh-day-thom-lung-chua-chua-ngot-ngot-ai-cung-me-202112200928180251.jpg"
                    }
                }
            };

            let response3 = {
                "text": "Panna cotta dâu tây\n 50.000 đồng/miếng"
            };
            let response4 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://monngon.tv/wp-content/uploads/2020/09/41efa91ebc4c5c3e6a02d35a9879f0df-cach-lam-panna-cotta-dau-tay-nho.jpg"
                    }
                }
            };
            let response5 = {
                "attachment": {
                    "type": "template",
                    "payload": {
                        "template_type": "button",
                        "text": `Xem toàn bộ menu hoặc xem menu Bánh?`,
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "web_url",
                                "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                                "title": "XEM TOÀN BỘ MENU"
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
                "text": "Bánh hành kéo sợi\n 70.000 đồng/túi/10 miếng"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://cf.shopee.vn/file/7343063c62aedea24d5bb4fb233f2160"
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
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "web_url",
                                "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                                "title": "XEM TOÀN BỘ MENU"
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
                "text": "Bánh ống ruốc gà\n 10.000 đồng/ống\nMua 5 ống chỉ còn 45.000 đồng"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.ytimg.com/vi/Ra0-XzAyv8w/maxresdefault.jpg"
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
                                "title": "MENU BÁNH ",
                                "payload": "SENDCAKE"
                            },
                            {
                                "type": "postback",
                                "title": "MENU ĐỒ UỐNG ",
                                "payload": "SENDDRINK"
                            },
                            {
                                "type": "web_url",
                                "url": "https://thietkegiahuy.com/wp-content/uploads/2021/03/thiet-ke-menu-bang-7.jpg",
                                "title": "XEM TOÀN BỘ MENU"
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
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/7YFLwZYp/z3994494406887-ca6d8bda3cc2f8640dba830c3bdc3e27.jpg"
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

let sendWippingdau = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 450k đến 550k\nCho các size từ 14 đến 16"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/zGhFGvwW/z3994493199626-7f83419be1e684545dae0ebd6a053f05.jpg"
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

let sendWippingphucbon = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 480k đến 550k\nCho các size từ 14 đến 16"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/ZRvwpHp7/z3994488975569-1f66a6145486e7281629a6ec7481ac38.jpg"
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

let sendWippingnhietdoi = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 500k đến 600k\nCho các size từ 14 đến 16"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/Zqp9Ny0P/z3994487580375-98b8fd5591880ecbfdb662489cdd6c75.jpg"
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

let sendPistachios = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 150k đến 700k\nCho các size từ 10 đến 24"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/8cVxC99B/z3994635126328-e4e97e89d29b0ad56014db5d1926e4dd.jpg"
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

let sendRED = (sender_psid) => {
    return new Promise(async (resolve, reject) => {
        try {
            let response1 = {
                "text": "Từ 180k đến 750k\nCho các size từ 10 đến 24"
            };
            let response2 = {
                "attachment": {
                    "type": "image",
                    "payload": {
                        "url": "https://i.postimg.cc/zvbYLTG8/z3994407841780-988b93fb769c987de127492a15535849.jpg"
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
    sendDetailLocation: sendDetailLocation,
    sendBacxiu: sendBacxiu,
    sendCafe2: sendCafe2,
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
};