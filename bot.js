// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, CardFactory, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (turncontext, next) => {
            // const card = CardFactory.heroCard(
            //     '',
            //     '',
            //     ['https://probonoaustralia.com.au/wp-content/uploads/2019/03/MS-Logo-2-300x253.jpg'],
            //     [
            //         {
            //             type: "openUrl",
            //             title: 'Get an overview',
            //             value: 'https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0'
            //         },
            //         {
            //             type: "openUrl",
            //             title: 'Ask a question',
            //             value: 'https://stackoverflow.com/questions/tagged/botframework'
            //         },
            //         {
            //             type: "openUrl",
            //             title: 'Learn how to deploy',
            //             value: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-deploy-azure?view=azure-bot-service-4.0'
            //         },
            //         {
            //             type: "postBack",
            //             title: '火辣菠蘿油',
            //             value: '40'
            //         },
            //         {
            //             type: "imBack",
            //             title: '椰香菠蘿油',
            //             value: '41'
            //         }
            //     ],
            //     {
            //         title: "冰火菠蘿油",
            //         text: "好吃的冰火菠蘿油喔\n簡直好吃到幹你老師喔",
            //         subtitle: "原價NT$150, 現在只要NT$75喔"
            //     },
            // );

            const card = CardFactory.heroCard(
                '',
                '',
                ['https://img.ieatcandy.tw/uploads/20190222135245_68.jpg'],
                [],
            );
            const imgcard = MessageFactory.carousel([card, card, card, card, card])
            const card1 = CardFactory.heroCard(
                '冰火菠蘿油',
                '好吃的冰火菠蘿油喔\n簡直好吃到幹你老師喔',
                [],
                [],
                {subtitle: "原價NT$150, 現在只要NT$75喔",color: "Warning",}
            );
            const card2 = CardFactory.heroCard(
                '',
                '',
                [],
                [
                    {
                        type: "openUrl",
                        title: 'Get an overview',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/?view=azure-bot-service-4.0'
                    },
                    {
                        type: "openUrl",
                        title: 'Ask a question',
                        value: 'https://stackoverflow.com/questions/tagged/botframework'
                    },
                    {
                        type: "openUrl",
                        title: 'Learn how to deploy',
                        value: 'https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-howto-deploy-azure?view=azure-bot-service-4.0'
                    },
                    {
                        type: "postBack",
                        title: '火辣菠蘿油',
                        value: '40'
                    },
                    {
                        type: "imBack",
                        title: '椰香菠蘿油',
                        value: '41'
                    }
                ],
            );

            const adcard = CardFactory.adaptiveCard(
                {
                    "type": "AdaptiveCard",
                    "body": [
                        {
                            "type": "Container",
                            "items": [
                                {
                                    "type": "TextBlock",
                                    "horizontalAlignment": "Center",
                                    "size": "Large",
                                    "weight": "Bolder",
                                    "color": "Good",
                                    "text": "冰火菠蘿油",
                                    "isSubtle": true
                                },
                                {
                                    "type": "TextBlock",
                                    "horizontalAlignment": "Center",
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "color": "Warning",
                                    "text": "原價NT$150，現在只要NT$75"
                                },
                                {
                                    "type": "TextBlock",
                                    "horizontalAlignment": "Left",
                                    "size": "Medium",
                                    "weight": "Bolder",
                                    "text": "好吃的菠蘿油喔"
                                },
                                {
                                    "type": "TextBlock",
                                    "horizontalAlignment": "Left",
                                    "weight": "Bolder",
                                    "text": "簡直好吃到幹你老師喔簡直好吃到幹你老師喔\n簡直好吃到幹你老師喔\n簡直好吃到幹你老師喔\n簡直好吃到幹你老師喔簡直好吃到幹你老師喔\n",
                                    "wrap": true
                                }
                            ]
                        }
                    ],
                    "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
                    "version": "1.0"
                }
            )
            // const card = CardFactory.heroCard( 'White T-Shirt', ['https://example.com/whiteShirt.jpg'], ['buy'] );
            await turncontext.sendActivity(`You said '${turncontext.activity.text}'`);

            await turncontext.sendActivity(imgcard);
            await turncontext.sendActivity({ attachments: [card1] });
            await turncontext.sendActivity(imgcard);
            await turncontext.sendActivity({ attachments: [adcard] });
            // await turncontext.sendActivity(card);

            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (turncontext, next) => {
            const membersAdded = turncontext.activity.membersAdded;
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== turncontext.activity.recipient.id) {
                    await turncontext.sendActivity('Hello and welcome!');
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
